import { ChannelState } from './types';
import { ChannelBasic } from '@/types/Channel';
import { MutationTree } from 'vuex';

export enum ChannelMutations {
  SET_CHANNELS = 'SET_CHANNELS',
}

export default {
  [ChannelMutations.SET_CHANNELS](state, payload: Array<ChannelBasic>): void {
    state.channels = payload;
  },
} as MutationTree<ChannelState>;
