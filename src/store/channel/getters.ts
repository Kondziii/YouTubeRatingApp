import { RootState } from './../types';
import { GetterTree } from 'vuex';
import { ChannelState } from './types';

export default {
  channels(state) {
    return state.channels;
  },
} as GetterTree<ChannelState, RootState>;
