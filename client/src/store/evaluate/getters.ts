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
} as GetterTree<EvaluateState, RootState>;
