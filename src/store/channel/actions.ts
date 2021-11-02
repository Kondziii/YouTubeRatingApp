import { RootState } from './../types';
import { ActionTree } from 'vuex';
import { ChannelState } from './types';
import youtube from '@/data/yt-api';
import { ChannelMutations } from './mutations';
import { namespaces } from '../index';
import Exception from '@/others/exception';
import Channel_url from '@/enums/Channel_url';

export const ChannelActions = {
  fetchSimilarChannelsByTitle: 'fetchSimilarChannelsByTitle',
  fetchSimilarChannelsByUrl: 'fetchSimilarChannelsByUrl',
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useChannelActions = () => {
  const result = { ...ChannelActions };
  Object.keys(ChannelActions).forEach((key) => {
    result[key] = `${namespaces.channel}/${ChannelActions[key]}`;
  });
  return result;
};

//ACTIONS

export default {
  async [ChannelActions.fetchSimilarChannelsByTitle](
    { commit },
    payload: string
  ) {
    try {
      const channels = await youtube.getChannelsByTitle(payload);
      commit(ChannelMutations.SET_CHANNELS, channels);
    } catch (error) {
      if (error instanceof Exception) {
        console.log(error.getMessage());
      }
    }
  },

  async [ChannelActions.fetchSimilarChannelsByUrl](
    { commit },
    payload: string
  ) {
    const type: Channel_url = payload.includes('/channel/')
      ? Channel_url.STANDARD_URL
      : Channel_url.CUSTOM_URL;
    try {
      const channels = await youtube.getChannelsByUrl(payload, type);
      console.log(channels);
      commit(ChannelMutations.SET_CHANNELS, channels);
    } catch (error) {
      if (error instanceof Exception) {
        console.log(error.getMessage());
      }
    }
  },
} as ActionTree<ChannelState, RootState>;
