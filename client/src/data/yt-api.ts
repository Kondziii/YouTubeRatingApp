import { Channel } from '@/types/Channel';
import axios from 'axios';
import Channel_url from '@/enums/Channel_url';
import { Video } from '@/types/Video';
import { Comment } from '@/types/CommentThread';
import { URL_API } from '../../config';

const extractChannelIdFromUrl = (url: string): string => {
  if (url.lastIndexOf('/') === -1) {
    return url;
  } else {
    return url.substring(url.lastIndexOf('/') + 1);
  }
};

const extractVideoIdFromUrl = (url: string): string => {
  if (url.indexOf('v=') === -1) {
    return url;
  } else {
    return url.indexOf('&') === -1
      ? url.substring(url.indexOf('v=') + 2)
      : url.substring(url.indexOf('v=') + 2, url.indexOf('&'));
  }
};

export default {
  getChannelsByTitle: async (title: string): Promise<Channel[]> => {
    return (await axios.get(`${URL_API}/channels/getByKeyWord/${title}`)).data;
  },

  getChannelInfoById: async (id: string): Promise<Channel> => {
    return (
      await axios.get(`${URL_API}/channels/getById/${id}`, {
        params: {
          part: 'snippet,statistics,contentDetails',
        },
      })
    ).data[0];
  },

  getChannelsByUrl: async (
    url: string,
    type: Channel_url
  ): Promise<Channel[]> => {
    let response: Array<Channel>;

    switch (type) {
      case Channel_url.STANDARD_URL: {
        response = (
          await axios.get(
            `${URL_API}/channels/getById/${extractChannelIdFromUrl(url)}`
          )
        ).data;
        break;
      }
      case Channel_url.CUSTOM_URL: {
        response = (
          await axios.get(
            `${URL_API}/channels/getByKeyWord/${extractChannelIdFromUrl(url)}`
          )
        ).data;
        break;
      }
    }
    return response;
  },

  getChannelVideos: async (playlistId: string): Promise<Video[]> => {
    return (await axios.get(`${URL_API}/channels/getVideos/${playlistId}`))
      .data;
  },

  getVideoComments: async (videoId: string): Promise<Comment[]> => {
    return (await axios.get(`${URL_API}/videos/getComments/${videoId}`)).data;
  },

  getVideosByTitle: async (title: string): Promise<Video[]> => {
    return (await axios.get(`${URL_API}/videos/getByKeyWord/${title}`)).data;
  },

  getVideosByUrl: async (url: string): Promise<Video[]> => {
    return (
      await axios.get(`${URL_API}/videos/getById/${extractVideoIdFromUrl(url)}`)
    ).data;
  },

  getVideoInfoById: async (videoId: string): Promise<Video> => {
    return (
      await axios.get(`${URL_API}/videos/getById/${videoId}`, {
        params: {
          part: 'snippet,statistics',
        },
      })
    ).data[0];
  },
};
