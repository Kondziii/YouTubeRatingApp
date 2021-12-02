import { ChannelState } from './types';
import { Channel } from '@/types/Channel';
import { MutationTree } from 'vuex';

export enum ChannelMutations {
  SET_CHANNELS = 'SET_CHANNELS',
  SET_MODAL_STATE = 'SET_MODAL_STATE',
  SET_CONFIRMED_CHANNEL = 'SET_CONFIRMED_CHANNEL',
  SET_INFO_MODAL_STATE = 'SET_INFO_MODAL_STATE',
}

export default {
  [ChannelMutations.SET_CHANNELS](state, payload: Array<Channel>): void {
    state.channels = payload;
  },

  [ChannelMutations.SET_MODAL_STATE](state, payload: boolean): void {
    state.isModalVisible = payload;
  },

  [ChannelMutations.SET_CONFIRMED_CHANNEL](state, payload: Channel): void {
    state.confirmedChannel = payload;
  },

  [ChannelMutations.SET_INFO_MODAL_STATE](state, payload: boolean) {
    state.isInfoModalVisible = payload;
  },
} as MutationTree<ChannelState>;
