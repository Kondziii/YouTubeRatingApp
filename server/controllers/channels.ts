import { VideoByChannel } from './../types/Video';
import { ChannelBySearch, ChannelById } from './../types/Channel';
import axios from 'axios';
import { KEY, URL_YOUTUBE_API } from '../config';
import { RequestHandler } from 'express';
import { Video } from '../types/Video';

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
        };
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
          statistics: query.part.includes('statistics') && item.statistics,
          uploads:
            query.part.includes('contentDetails') &&
            item.contentDetails?.relatedPlaylists.uploads,
        };
      })
    );
  }
};

export const getVideos: RequestHandler = async (req, res, next) => {
  const params = req.params as { playlistId: string };
  let response: any;
  const videos: Array<Video> = [];

  try {
    do {
      response = await axios.get(`${URL_YOUTUBE_API}/playlistItems`, {
        params: {
          key: KEY,
          part: 'id,snippet',
          maxResults: 50,
          playlistId: params.playlistId,
          pageToken: response?.data?.nextPageToken
            ? response.data.nextPageToken
            : '',
        },
      });

      videos.push(
        ...response.data.items.map((item: VideoByChannel) => {
          return {
            id: item.snippet.resourceId.videoId,
            channelId: item.snippet.channelId,
            channelTitle: item.snippet.channelTitle,
            title: item.snippet.title,
            publishedAt: item.snippet.publishedAt,
            image: item.snippet.thumbnails.default.url,
          } as Video;
        })
      );
    } while (response.data.nextPageToken);
  } catch (error) {
    next({ message: 'Server error', status: 500 });
  }

  if (videos.length === 0) {
    next({ message: "Channel hasn't got any videos.", status: 404 });
  } else {
    res.json(videos);
  }
};
