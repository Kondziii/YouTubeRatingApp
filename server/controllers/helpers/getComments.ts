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
import { Sentiment } from '../../types/Sentiment';
const vader = require('vader-sentiment');
const { Language } = require('node-nlp');
const LanguageDetector = new Language();

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
  } else if (compound <= -BASIC_SENTIMENT_THRESHOLD) {
    if (compound <= negativeThreshold) vote = 'very negative';
    else vote = 'negative';
  } else vote = 'neutral';

  return vote;
};

export const getVideoSentimentHelper = async (
  params: { videoId: string },
  query: { channelId: string; subcomments: boolean }
) => {
  try {
    let comments: Array<Comment>;

    comments = await getComments(
      params.videoId,
      query.channelId,
      query.subcomments
    );

    const commentCount = {
      all: 0,
      processed: 0,
      excluded: 0,
    };

    const commentVoteCount = {
      positive: 0,
      neutral: 0,
      negative: 0,
    };

    type avgOptions = {
      [key: string]: number;
    };

    const avg: avgOptions = {
      positive: 0,
      neutral: 0,
      negative: 0,
      compound: 0,
    };

    for (const comment of comments) {
      let language;
      try {
        language = LanguageDetector.guessBest(comment.text, [
          'en',
          'pl',
        ]).language;
      } catch (error) {
        console.log(
          `Language undetected. Comment ${comment.text} will be excluded.`
        );
      }

      if (language && language === 'English') {
        const sentiment: Sentiment =
          await vader.SentimentIntensityAnalyzer.polarity_scores(comment.text);

        if (sentiment.compound >= BASIC_SENTIMENT_THRESHOLD)
          commentVoteCount.positive++;
        else if (sentiment.compound <= -BASIC_SENTIMENT_THRESHOLD)
          commentVoteCount.negative++;
        else commentVoteCount.neutral++;

        avg.positive += sentiment.pos;
        avg.neutral += sentiment.neu;
        avg.negative += sentiment.neg;
        avg.compound += sentiment.compound;
      } else {
        commentCount.excluded++;
      }
      commentCount.all++;
    }
    commentCount.processed = commentCount.all - commentCount.excluded;

    Object.keys(avg).forEach((key) => {
      if (avg[key] !== 0) {
        avg[key] /= commentCount.processed;
      }
    });

    const vote =
      commentCount.processed === 0
        ? 'unknown'
        : stateCompound(avg.compound, commentCount.processed);

    return {
      vote,
      commentCount,
      commentVoteCount,
      avg,
      date: new Date().toISOString(),
    };
  } catch (error) {
    throw error;
  }
};
