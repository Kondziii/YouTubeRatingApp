import { Comment } from './../types/Comment';
import { Sentiment } from './../types/Sentiment';
import { getComments, stateCompound } from './helpers/getComments';
import { VideoBySearch, VideoById, Video } from './../types/Video';
import axios from 'axios';
import { KEY, URL_YOUTUBE_API } from '../config';
import { RequestHandler } from 'express';
import { BASIC_SENTIMENT_THRESHOLD } from '../config';
const vader = require('vader-sentiment');
const { Language } = require('node-nlp');
const LanguageDetector = new Language();

export const getVideosByKeyWord: RequestHandler = async (req, res, next) => {
  const params = req.params as { keyWord: string };
  let response;

  try {
    response = await axios.get(`${URL_YOUTUBE_API}/search`, {
      params: {
        key: KEY,
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        q: params.keyWord,
      },
    });
  } catch (error) {
    next({ message: 'Server error', status: 500 });
  }

  if (!response || response.data.items.length === 0) {
    next({ message: 'Video has not be found!', status: 404 });
  } else {
    res.status(200).json(
      response.data.items.map((item: VideoBySearch) => {
        return {
          id: item.id.videoId,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt,
          image: item.snippet.thumbnails.default.url,
          imageHigh: item.snippet.thumbnails.high.url,
        } as Video;
      })
    );
  }
};

export const getVideoById: RequestHandler = async (req, res, next) => {
  const params = req.params as { id: string };
  const query = req.query as { part: string };
  let response;

  try {
    response = await axios.get(`${URL_YOUTUBE_API}/videos`, {
      params: {
        key: KEY,
        part: query.part || 'snippet',
        maxResults: 25,
        id: params.id,
      },
    });
  } catch (error) {
    next({ message: 'Server error', status: 500 });
  }

  if (!response || response.data.items.length === 0) {
    next({ message: 'Video has not be found!', status: 404 });
  } else {
    res.status(200).json(
      response.data.items.map((item: VideoById) => {
        return {
          id: item.id,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt,
          image: item.snippet.thumbnails.default.url,
          imageHigh: item.snippet.thumbnails.high.url,
          statistics: query.part?.includes('statistics') && item.statistics,
        } as Video;
      })
    );
  }
};

export const getVideoComments: RequestHandler = async (req, res, next) => {
  const params = req.params as { videoId: string };
  const query = req.query as unknown as {
    channelId: string;
    subcomments: boolean;
  };

  try {
    res
      .status(200)
      .json(
        await getComments(params.videoId, query.channelId, query.subcomments)
      );
  } catch (error: any) {
    next({ message: error.message, status: error.status });
  }
};

export const getVideoSentiment: RequestHandler = async (req, res, next) => {
  const params = req.params as { videoId: string };
  const query = req.query as unknown as {
    channelId: string;
    subcomments: boolean;
  };
  let comments: Array<Comment>;

  try {
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

    res.status(200).json({
      vote,
      commentCount,
      commentVoteCount,
      avg,
      date: new Date().toISOString(),
    });
  } catch (error: any) {
    next({ message: error.message, status: error.status });
  }
};
