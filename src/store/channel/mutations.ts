import { ChannelState } from './types';
import { ChannelBasic, ChannelFullInfo } from '@/types/Channel';
import { MutationTree } from 'vuex';

export enum ChannelMutations {
  SET_CHANNELS = 'SET_CHANNELS',
  SET_MODAL_STATE = 'SET_MODAL_STATE',
  SET_CONFIRMED_CHANNEL = 'SET_CONFIRMED_CHANNEL',
  SET_INFO_MODAL_STATE = 'SET_INFO_MODAL_STATE',
}

export default {
  [ChannelMutations.SET_CHANNELS](state, payload: Array<ChannelBasic>): void {
    state.channels = payload;
  },

  [ChannelMutations.SET_MODAL_STATE](state, payload: boolean): void {
    state.isModalVisible = payload;
  },

  [ChannelMutations.SET_CONFIRMED_CHANNEL](
    state,
    payload: ChannelFullInfo
  ): void {
    state.confirmedChannel = payload;
  },

  [ChannelMutations.SET_INFO_MODAL_STATE](state, payload: boolean) {
    state.isInfoModalVisible = payload;
  },
} as MutationTree<ChannelState>;
