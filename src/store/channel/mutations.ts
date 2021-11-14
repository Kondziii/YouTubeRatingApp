import { ChannelState } from './types';
import { ChannelBasic } from '@/types/Channel';
import { MutationTree } from 'vuex';

export enum ChannelMutations {
  SET_CHANNELS = 'SET_CHANNELS',
  SET_MODAL_STATE = 'SET_MODAL_STATE',
}

export default {
  [ChannelMutations.SET_CHANNELS](state, payload: Array<ChannelBasic>): void {
    state.channels = payload;
  },

  [ChannelMutations.SET_MODAL_STATE](state, payload: boolean): void {
    state.isModalVisible = payload;
  },
} as MutationTree<ChannelState>;
