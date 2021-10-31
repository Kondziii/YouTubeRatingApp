import { ChannelState } from './types';
import { ChannelBasic, ChannelWithStats } from '@/types/Channel';
import { MutationTree } from 'vuex';

export enum ChannelMutations {
  SET_CHANNEL = 'SET_CHANNEL',
}

export default {
  [ChannelMutations.SET_CHANNEL](
    state,
    payload: Array<ChannelWithStats> | ChannelBasic
  ): void {
    state.channels = payload;
  },
} as MutationTree<ChannelState>;
