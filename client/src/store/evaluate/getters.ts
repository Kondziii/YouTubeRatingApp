import { RootState } from './../types';
import { GetterTree } from 'vuex';
import { EvaluateState } from './type';

export default {
  getParams(state) {
    return state.params;
  },

  getVideoResult(state) {
    return state.videoResult;
  },

  getVideoHistory(state) {
    return state.videoHistory;
  },

  getChannelResult(state) {
    return state.channelResult;
  },
} as GetterTree<EvaluateState, RootState>;
