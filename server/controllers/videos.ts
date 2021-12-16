import { Comment } from './../types/Comment';
import { Sentiment } from './../types/Sentiment';
import { getComments, stateCompound } from './helpers/getComments';
import { VideoBySearch, VideoById, Video } from './../types/Video';
import axios from 'axios';
import { KEY, URL_YOUTUBE_API } from '../config';
import { RequestHandler } from 'express';
import { BASIC_SENTIMENT_THRESHOLD } from '../config';
const vader = require('vader-sentiment');

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
    subtitles: boolean;
  };

  try {
    res
      .status(200)
      .json(
        await getComments(params.videoId, query.channelId, query.subtitles)
      );
  } catch (error: any) {
    next({ message: error.message, status: error.status });
  }
};

export const getVideoSentiment: RequestHandler = async (req, res, next) => {
  const params = req.params as { videoId: string };
  const query = req.query as unknown as {
    channelId: string;
    subtitles: boolean;
  };
  let comments: Array<Comment>;

  try {
    comments = await getComments(
      params.videoId,
      query.channelId,
      query.subtitles
    );

    const count = {
      positive: 0,
      neutral: 0,
      negative: 0,
    };
    const sum = {
      positive: 0,
      neutral: 0,
      negative: 0,
      compound: 0,
    };
    for (const comment of comments) {
      const sentiment: Sentiment =
        await vader.SentimentIntensityAnalyzer.polarity_scores(comment.text);

      sum.positive += sentiment.pos;
      sum.neutral += sentiment.neu;
      sum.negative += sentiment.neg;
      sum.compound += sentiment.compound;

      if (sentiment.compound >= BASIC_SENTIMENT_THRESHOLD) count.positive++;
      else if (sentiment.compound <= -BASIC_SENTIMENT_THRESHOLD)
        count.negative++;
      else count.neutral++;
    }

    sum.positive /= comments.length;
    sum.negative /= comments.length;
    sum.neutral /= comments.length;
    sum.compound /= comments.length;

    const vote = stateCompound(sum.compound, comments.length);

    res.status(200).json({
      vote: vote,
      comments: comments.length,
      count,
      sum,
    });
  } catch (error: any) {
    next({ message: error.message, status: error.status });
  }
};
