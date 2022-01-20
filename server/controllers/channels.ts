import { VideoSentiment } from './../types/Sentiment';
import { ChannelBySearch, ChannelById } from './../types/Channel';
import axios from 'axios';
import { KEY, URL_YOUTUBE_API } from '../config';
import { RequestHandler } from 'express';
import { Channel } from '../types/Channel';
import { getChannelVideosFunction } from './helpers/videos';
import {
  getVideoSentimentFunction,
  getChannelSentimentFunction,
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
    const result = await getChannelSentimentFunction(params, query);

    res.status(200).json(result);
  } catch (error: any) {
    next({ message: error.message, status: error.status });
  }
};
