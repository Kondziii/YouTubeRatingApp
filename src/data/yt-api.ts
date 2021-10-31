import { URL_YOUTUBE_API, KEY } from '../../config';
import { ChannelBasic, ChannelWithStats } from '@/types/Channel';
import axios from 'axios';

enum channel_url {
  STANDARD_URL,
  CUSTOM_URL,
}

const extractUrl = (url: string) => {
  return url.substring(url.lastIndexOf('/') + 1);
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

    if (!response || response.data?.items) {
      throw new Error('Channel has not be found!');
    }

    return response.data.items;
  },

  getChannelsByUrl: async (
    url: string
  ): Promise<ChannelWithStats | unknown> => {
    const type: channel_url = url.includes('/channel/')
      ? channel_url.STANDARD_URL
      : channel_url.CUSTOM_URL;
    let response;

    switch (type) {
      case channel_url.STANDARD_URL: {
        response = await axios.get(`${URL_YOUTUBE_API}/channels`, {
          params: {
            key: KEY,
            part: 'snippet,statistics',
            id: extractUrl(url),
          },
        });

        if (!response) {
          throw new Error('Channel has not be found!');
        }
        return response.data?.items;
      }
      case channel_url.CUSTOM_URL:
        response = await axios.get(`${URL_YOUTUBE_API}/search`, {
          params: {
            key: KEY,
            part: 'snippet',
            maxResults: 25,
            type: 'channel',
            q: extractUrl(url),
          },
        });

        if (!response) {
          throw new Error('Channel has not be found!');
        }

        return response.data?.items;
    }
  },
};
