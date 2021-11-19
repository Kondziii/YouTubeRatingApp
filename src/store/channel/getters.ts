import { RootState } from './../types';
import { GetterTree } from 'vuex';
import { ChannelState } from './types';
import { ChannelBasic, ChannelFullInfo } from '@/types/Channel';

export default {
  getChannels(state): ChannelBasic | unknown {
    return state.channels;
  },

  getModalState(state): boolean {
    return state.isModalVisible;
  },

  getConfirmedChannel(state): ChannelFullInfo | null {
    return state.confirmedChannel;
  },

  getInfoModalState(state): boolean {
    return state.isInfoModalVisible;
  },

  getIfConfirmed(state): boolean {
    return !!state.confirmedChannel;
  },
} as GetterTree<ChannelState, RootState>;
