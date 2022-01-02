import {
  CHANNEL_COUNT_VIDEOS_PRIVILEGE,
  CHANNEL_SENTIMENT_PRIVILEGE,
  CHANNEL_SENTIMENT_THRESHOLD,
  CHANNEL_PRIVILEGE_THRESHOLD,
  CHANNEL_BASIC_SENTIMENT_THRESHOLD,
} from './../../config';
import { VideoSentiment } from './../../types/Sentiment';
import {
  SENTIMENT_THRESHOLD,
  COMMENT_COUNT_SENTIMENT_PRIVILEGE,
  SENTIMENT_PRIVILEGE,
  PRIVILEGE_THRESHOLD,
  BASIC_SENTIMENT_THRESHOLD,
} from '../../config';
import { Comment } from '../../types/Comment';
import { Sentiment } from '../../types/Sentiment';
import { getComments } from './comments';
const vader = require('vader-sentiment');
const { Language } = require('node-nlp');
const LanguageDetector = new Language();

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
  let negativeThreshold = -SENTIMENT_THRESHOLD + commentPrivilege;
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

export const stateChannelCompound = (
  compound: number,
  videosNumber: number
): string => {
  let vote = '';

  const videoPrivilege =
    (videosNumber / CHANNEL_COUNT_VIDEOS_PRIVILEGE) *
    CHANNEL_SENTIMENT_PRIVILEGE;

  let positiveThreshold = CHANNEL_SENTIMENT_THRESHOLD - videoPrivilege;

  positiveThreshold =
    positiveThreshold < CHANNEL_PRIVILEGE_THRESHOLD
      ? CHANNEL_PRIVILEGE_THRESHOLD
      : positiveThreshold;

  let negativeThreshold = -CHANNEL_PRIVILEGE_THRESHOLD + videoPrivilege;

  negativeThreshold =
    negativeThreshold > -CHANNEL_PRIVILEGE_THRESHOLD
      ? -CHANNEL_PRIVILEGE_THRESHOLD
      : negativeThreshold;

  if (compound >= CHANNEL_BASIC_SENTIMENT_THRESHOLD) {
    if (compound >= positiveThreshold) vote = 'very positive';
    else vote = 'positive';
  } else if (compound <= -CHANNEL_BASIC_SENTIMENT_THRESHOLD) {
    if (compound <= negativeThreshold) vote = 'very negative';
    else vote = 'negative';
  } else vote = 'neutral';

  return vote;
};

export const getVideoSentimentFunction = async (
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

    const evaluateParams = {
      useSubcomments: query.subcomments,
      useAuthorAnswers: query.channelId === null,
    };

    return {
      vote,
      commentCount,
      commentVoteCount,
      avg,
      evaluateParams,
      date: new Date().toISOString(),
    } as VideoSentiment;
  } catch (error) {
    throw error;
  }
};
