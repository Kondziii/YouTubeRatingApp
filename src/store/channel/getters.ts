import { RootState } from './../types';
import { GetterTree } from 'vuex';
import { ChannelState } from './types';
import { ChannelBasic } from '@/types/Channel';

export default {
  getChannels(state): ChannelBasic | unknown {
    return state.channels;
  },

  getModalState(state): boolean {
    return state.isModalVisible;
  },
} as GetterTree<ChannelState, RootState>;
