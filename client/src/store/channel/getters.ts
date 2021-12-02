import { RootState } from './../types';
import { GetterTree } from 'vuex';
import { ChannelState } from './types';
import { Channel } from '@/types/Channel';

export default {
  getChannels(state): Channel | unknown {
    return state.channels;
  },

  getModalState(state): boolean {
    return state.isModalVisible;
  },

  getConfirmedChannel(state): Channel | null {
    return state.confirmedChannel;
  },

  getInfoModalState(state): boolean {
    return state.isInfoModalVisible;
  },

  getIfConfirmed(state): boolean {
    return !!state.confirmedChannel;
  },
} as GetterTree<ChannelState, RootState>;
