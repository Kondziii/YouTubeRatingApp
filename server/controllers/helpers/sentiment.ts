import {
  CHANNEL_COUNT_VIDEOS_PRIVILEGE,
  CHANNEL_SENTIMENT_PRIVILEGE,
  CHANNEL_SENTIMENT_THRESHOLD,
  CHANNEL_PRIVILEGE_THRESHOLD,
  CHANNEL_BASIC_SENTIMENT_THRESHOLD,
} from './../../config';
import { VideoSentiment } from './../../types/Sentiment';
import { getChannelVideosFunction } from './videos';
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

export const getChannelSentimentFunction = async (
  params: { playlistId: string },
  query: {
    channelId: string;
    minComments?: number;
    subcomments?: boolean;
    useTime?: boolean;
    beginDate?: string;
    endDate?: string;
  }
) => {
  try {
    let channelVideos = await getChannelVideosFunction(params.playlistId);
    // filter videos according to passed dates as query params
    if (query.useTime === true && query.beginDate && query.endDate) {
      const begin = new Date(
        query.beginDate.split('/').reverse().join('/')
      ).getTime();
      const end = new Date(
        query.endDate.split('/').reverse().join('/')
      ).getTime();

      channelVideos = channelVideos.filter((video) => {
        const published = new Date(
          video.publishedAt.split('/').reverse().join('/')
        ).getTime();

        return published >= begin && published <= end;
      });
    }

    const videosSentiment = {
      processed: [] as VideoSentiment[],
      excluded: [] as VideoSentiment[],
    };

    const videosCount = {
      all: 0,
      processed: 0,
      excluded: 0,
    };

    type options = {
      [key: string]: number;
    };

    const videosVoteCount: options = {
      'very positive': 0,
      positive: 0,
      neutral: 0,
      negative: 0,
      'very negative': 0,
    };

    const videosAvg: options = {
      positive: 0,
      neutral: 0,
      negative: 0,
      compound: 0,
    };

    for (const video of channelVideos) {
      const videoSentiment = {
        ...(await getVideoSentimentFunction(
          { videoId: video.id },
          {
            channelId: query.channelId || '',
            subcomments:
              query.subcomments === undefined ? true : query.subcomments,
          }
        )),
        videoId: video.id,
        title: video.title,
        imageHigh: video.imageHigh,
        publishedAt: video.publishedAt,
      };

      if (
        query.minComments &&
        videoSentiment.commentCount.processed < query.minComments
      ) {
        videosCount.excluded++;
        videosSentiment.excluded.push(videoSentiment);
      } else {
        videosSentiment.processed.push(videoSentiment);

        videosVoteCount[videoSentiment.vote]++;

        videosAvg.compound += videoSentiment.avg.compound || 0;
        videosAvg.positive += videoSentiment.avg.positive;
        videosAvg.neutral += videoSentiment.avg.neutral;
        videosAvg.negative += videoSentiment.avg.negative;
      }
      videosCount.all++;
    }
    videosCount.processed = videosCount.all - videosCount.excluded;

    Object.keys(videosAvg).forEach((key) => {
      if (videosAvg[key] !== 0) {
        videosAvg[key] /= videosCount.processed;
      }
    });

    const vote =
      videosCount.processed === 0
        ? 'unknown'
        : stateChannelCompound(videosAvg.compound, videosCount.processed);

    const evaluateParams = {
      commentsLimit: query.minComments,
      useTime: query.useTime,
      beginDate: query.beginDate,
      endDate: query.endDate,
      useSubcomments: query.subcomments,
      useAuthorAnswers: query.channelId === null,
    };

    return {
      vote,
      videosCount,
      videosVoteCount,
      videosAvg,
      evaluateParams,
      videosSentiment,
      date: new Date().toISOString(),
    };
  } catch (error: any) {
    throw error;
  }
};
