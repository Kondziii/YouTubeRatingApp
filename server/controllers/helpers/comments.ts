import axios from 'axios';
import { KEY, URL_YOUTUBE_API } from '../../config';
import { CommentThread, Comment, CommentThreadItem } from '../../types/Comment';

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

  // if (comments.length === 0) {
  //   throw { message: "Video hasn't got any comments.", status: 404 };
  // } else {
  return comments.flat(2).filter((comment) => comment.authorId !== channelId);
  // }
};
