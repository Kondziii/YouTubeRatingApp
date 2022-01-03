import { VideoSentiment } from './../types/Sentiment';
import { VideoByChannel } from './../types/Video';
import { ChannelBySearch, ChannelById } from './../types/Channel';
import axios from 'axios';
import { KEY, URL_YOUTUBE_API } from '../config';
import { RequestHandler, Response } from 'express';
import { Video } from '../types/Video';
import { Channel } from '../types/Channel';
import { getChannelVideosFunction } from './helpers/videos';
import {
  getVideoSentimentFunction,
  stateChannelCompound,
} from './helpers/sentiment';

export const getChannelsByKeyWord: RequestHandler = async (req, res, next) => {
  const params = req.params as { keyWord: string };
  let response;

  try {
    response = await axios.get(`${URL_YOUTUBE_API}/search`, {
      params: {
        key: KEY,
        part: 'snippet',
        maxResults: 25,
        type: 'channel',
        q: params.keyWord,
      },
    });
  } catch (error) {
    next({ message: 'Server error', status: 500 });
  }

  if (!response || response.data.items.length === 0) {
    next({ message: 'Channel has not be found!', status: 404 });
  } else {
    res.json(
      response.data.items.map((item: ChannelBySearch) => {
        return {
          id: item.id.channelId,
          title: item.snippet.title,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          image: item.snippet.thumbnails.default.url,
          imageHigh: item.snippet.thumbnails.high.url,
        } as Channel;
      })
    );
  }
};

export const getChannelsById: RequestHandler = async (req, res, next) => {
  const params = req.params as { id: string };
  const query = req.query as { part: string };
  let response;

  try {
    response = await axios.get(`${URL_YOUTUBE_API}/channels`, {
      params: {
        key: KEY,
        part: query.part || 'snippet',
        id: params.id,
      },
    });
  } catch (error) {
    next({ message: 'Server error', status: 500 });
  }

  if (!response || response.data.items.length === 0) {
    next({ message: 'Channel has not be found!', status: 404 });
  } else {
    res.json(
      response.data.items.map((item: ChannelById) => {
        return {
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          image: item.snippet.thumbnails.default.url,
          imageHigh: item.snippet.thumbnails.high.url,
          statistics: query.part?.includes('statistics') && item.statistics,
          uploads:
            query.part?.includes('contentDetails') &&
            item.contentDetails?.relatedPlaylists.uploads,
        };
      })
    );
  }
};

export const getVideos: RequestHandler = async (req, res, next) => {
  const params = req.params as { playlistId: string };
  try {
    const videos = await getChannelVideosFunction(params.playlistId);
    res.json(videos);
  } catch (error: any) {
    next({ message: error.message, status: error.status });
  }
};

export const getChannelSentiment: RequestHandler = async (req, res, next) => {
  const params = req.params as { playlistId: string };
  const query = req.query as unknown as {
    channelId: string;
    minComments?: number;
    subcomments?: boolean;
    useTime?: boolean;
    beginDate?: string;
    endDate?: string;
  };

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

    res.json({
      vote,
      videosCount,
      videosVoteCount,
      videosAvg,
      evaluateParams,
      videosSentiment,
      date: new Date().toISOString(),
    });
  } catch (error: any) {
    next({ message: error.message, status: error.status });
  }
};
