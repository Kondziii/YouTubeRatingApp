import axios from 'axios';
import {
  URL_YOUTUBE_API,
  KEY,
  SENTIMENT_THRESHOLD,
  COMMENT_COUNT_SENTIMENT_PRIVILEGE,
  SENTIMENT_PRIVILEGE,
  PRIVILEGE_THRESHOLD,
  BASIC_SENTIMENT_THRESHOLD,
} from '../../config';
import { CommentThread, CommentThreadItem, Comment } from '../../types/Comment';

export const getComments = async (
  videoId: string,
  channelId: string = '',
  subtitles: boolean = true
) => {
  let response: any;
  const comments = [];

  try {
    do {
      response = await axios.get(`${URL_YOUTUBE_API}/commentThreads`, {
        params: {
          key: KEY,
          part: 'snippet,replies',
          maxResults: 100,
          videoId: videoId,
          pageToken: response?.data?.nextPageToken
            ? response.data.nextPageToken
            : '',
        },
      });

      comments.push(
        ...response.data.items.map((item: CommentThread) => {
          if (subtitles === true && item.replies)
            return [
              {
                text: item.snippet.topLevelComment.snippet.textOriginal.replace(
                  '\n',
                  ' '
                ),
                authorId:
                  item.snippet.topLevelComment.snippet.authorChannelId.value,
              } as Comment,

              item.replies?.comments.map((comment: CommentThreadItem) => {
                return {
                  text: comment.snippet.textOriginal.replace('\n', ' '),
                  authorId: comment.snippet.authorChannelId.value,
                } as Comment;
              }),
            ];
          else
            return [
              {
                text: item.snippet.topLevelComment.snippet.textOriginal.replace(
                  '\n',
                  ' '
                ),
                authorId:
                  item.snippet.topLevelComment.snippet.authorChannelId.value,
              } as Comment,
            ];
        })
      );
    } while (response.data.nextPageToken);
  } catch (error) {
    throw { message: 'Server error', status: 500 };
  }

  if (comments.length === 0) {
    throw { message: "Video hasn't got any comments.", status: 404 };
  } else {
    return comments.flat(2).filter((comment) => comment.authorId !== channelId);
  }
};

export const stateCompound = (
  compound: number,
  commentsNumber: number
): string => {
  let vote = '';
  const commentPrivilege =
    (commentsNumber / COMMENT_COUNT_SENTIMENT_PRIVILEGE) * SENTIMENT_PRIVILEGE;
  let positiveThreshold = SENTIMENT_THRESHOLD - commentPrivilege;
  positiveThreshold =
    positiveThreshold < PRIVILEGE_THRESHOLD
      ? PRIVILEGE_THRESHOLD
      : positiveThreshold;
  let negativeThreshold = SENTIMENT_THRESHOLD + commentPrivilege;
  negativeThreshold =
    negativeThreshold > -PRIVILEGE_THRESHOLD
      ? -PRIVILEGE_THRESHOLD
      : negativeThreshold;

  if (compound >= BASIC_SENTIMENT_THRESHOLD) {
    if (compound >= positiveThreshold) vote = 'very positive';
    else vote = 'positive';
  } else if (compound <= BASIC_SENTIMENT_THRESHOLD) {
    if (compound <= negativeThreshold) vote = 'very negative';
    else vote = 'negative';
  } else vote = 'neutral';

  return vote;
};
