import { URL_YOUTUBE_API, KEY } from '../../config';
import { ChannelBasic, ChannelFullInfo } from '@/types/Channel';
import axios from 'axios';
import Exception from '@/others/exception';
import Channel_url from '@/enums/Channel_url';
import Video from '@/types/Video';
import CommentThread from '@/types/CommentThread';

const extractChannelIdFromUrl = (url: string) => {
  if (url.lastIndexOf('/') === -1) {
    return url;
  } else {
    return url.substring(url.lastIndexOf('/') + 1);
  }
};

const extractVideoIdFromUrl = (url: string) => {
  if (url.indexOf('v=') === -1) {
    return url;
  } else {
    return url.substring(url.indexOf('v=') + 2, url.indexOf('&'));
  }
};

export default {
  getChannelsByTitle: async (title: string): Promise<ChannelBasic[]> => {
    const response = await axios.get(`${URL_YOUTUBE_API}/search`, {
      params: {
        key: KEY,
        part: 'snippet',
        maxResults: 25,
        type: 'channel',
        q: title,
      },
    });

    if (!response || !response.data?.items) {
      throw new Exception('Channel has not be found!', 400);
    }

    return response.data.items;
  },

  getChannelInfoById: async (id: string): Promise<ChannelFullInfo> => {
    const response = await axios.get(`${URL_YOUTUBE_API}/channels`, {
      params: {
        key: KEY,
        part: 'snippet,statistics,contentDetails',
        id: id,
      },
    });

    if (!response || !response.data?.items) {
      throw new Exception('Channel has not be found!', 400);
    }

    return response.data.items;
  },

  getChannelsByUrl: async (
    url: string,
    type: Channel_url
  ): Promise<ChannelBasic | ChannelBasic[]> => {
    let response;

    switch (type) {
      case Channel_url.STANDARD_URL: {
        response = await axios.get(`${URL_YOUTUBE_API}/channels`, {
          params: {
            key: KEY,
            part: 'snippet',
            id: extractChannelIdFromUrl(url),
          },
        });
        break;
      }
      case Channel_url.CUSTOM_URL: {
        response = await axios.get(`${URL_YOUTUBE_API}/search`, {
          params: {
            key: KEY,
            part: 'snippet',
            maxResults: 25,
            type: 'channel',
            q: extractChannelIdFromUrl(url),
          },
        });
        break;
      }
    }
    if (!response || !response.data?.items) {
      throw new Exception('Channel has not be found!', 400);
    }
    return response.data.items;
  },

  getChannelVideos: async (playlistId: string): Promise<Video[]> => {
    let response;
    const videos: Array<Video> = [];

    do {
      response = await axios.get(`${URL_YOUTUBE_API}/playlistItems`, {
        params: {
          key: KEY,
          part: 'id,snippet',
          maxResults: 50,
          playlistId: playlistId,
          pageToken: response?.data?.nextPageToken
            ? response.data.nextPageToken
            : '',
        },
      });
      if (!response || !response.data?.items) {
        throw new Exception('Wrong id of channel playlist!', 403);
      }

      videos.push(...response.data.items);
    } while (response.data.nextPageToken);
    return videos;
  },

  getVideoComments: async (videoId: string): Promise<CommentThread[]> => {
    let response;
    const comments: Array<CommentThread> = [];

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
      if (!response || !response.data?.items) {
        throw new Exception('Wrong id of video!', 403);
      }
      comments.push(...response.data.items);
    } while (response.data.nextPageToken);
    return response.data.items;
  },

  getVideosByTitle: async (title: string): Promise<Video[]> => {
    const response = await axios.get(`${URL_YOUTUBE_API}/search`, {
      params: {
        key: KEY,
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        q: title,
      },
    });
    if (!response || !response.data?.items) {
      throw new Exception('The video has not be found!', 403);
    }
    return response.data.items;
  },

  getVideoByUrl: async (url: string): Promise<Video> => {
    const response = await axios.get(`${URL_YOUTUBE_API}/videos`, {
      params: {
        key: KEY,
        part: 'snippet',
        maxResults: 25,
        id: extractVideoIdFromUrl(url),
      },
    });
    if (!response || !response.data?.items) {
      throw new Exception('The video has not be found!', 403);
    }

    return response.data.items;
  },

  getVideoInfoById: async (videoId: string): Promise<Video> => {
    const response = await axios.get(`${URL_YOUTUBE_API}/videos`, {
      params: {
        key: KEY,
        part: 'snippet,statistics',
        id: videoId,
      },
    });

    if (!response || !response.data?.items) {
      throw new Exception('The video has not be found!', 403);
    }
    return response.data.items;
  },
};
