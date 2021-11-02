import { URL_YOUTUBE_API, KEY } from '../../config';
import { ChannelBasic, ChannelWithStats } from '@/types/Channel';
import axios from 'axios';
import Exception from '@/others/exception';
import Channel_url from '@/enums/Channel_url';

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

    if (!response || !response.data?.items) {
      throw new Exception('Channel has not be found!', 400);
    }

    return response.data.items;
  },

  getChannelsByUrl: async (
    url: string,
    type: Channel_url
  ): Promise<ChannelWithStats | ChannelBasic[]> => {
    let response;

    switch (type) {
      case Channel_url.STANDARD_URL: {
        response = await axios.get(`${URL_YOUTUBE_API}/channels`, {
          params: {
            key: KEY,
            part: 'snippet,statistics',
            id: extractUrl(url),
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
            q: extractUrl(url),
          },
        });
        break;
      }
    }
    if (!response || !response.data?.items) {
      throw new Exception('Channel has not be found!', 400);
    }

    return response.data?.items;
  },
};
