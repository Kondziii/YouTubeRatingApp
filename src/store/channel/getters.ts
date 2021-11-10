import { RootState } from './../types';
import { GetterTree } from 'vuex';
import { ChannelState } from './types';
import { ChannelBasic } from '@/types/Channel';

export default {
  channels(state): ChannelBasic | unknown {
    return state.channels;
  },
} as GetterTree<ChannelState, RootState>;
