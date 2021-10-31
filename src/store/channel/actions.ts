import { RootState } from './../types';
import { ActionTree } from 'vuex';
import { ChannelState } from './types';
import youtube from '@/data/yt-api';
import { ChannelMutations } from './mutations';
import { namespaces } from '../index';

export const ChannelActions = {
  fetchSimilarChannelsByTitle: 'fetchSimilarChannelsByTitle',
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useChannelActions = () => {
  const result = { ...ChannelActions };
  Object.keys(ChannelActions).forEach((key) => {
    result[key] = `${namespaces.channel}/${ChannelActions[key]}`;
  });
  return result;
};

export default {
  async [ChannelActions.fetchSimilarChannelsByTitle](
    { commit },
    payload: string
  ) {
    try {
      const channels = await youtube.getChannelsByTitle(payload);
      commit(ChannelMutations.SET_CHANNEL, channels);
      console.log(channels);
    } catch (error) {
      console.log('Channel has not be found!');
    }
  },
} as ActionTree<ChannelState, RootState>;
