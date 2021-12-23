import { RootState } from './../types';
import { GetterTree } from 'vuex';
import { EvaluateState } from './type';

export default {
  getParams(state) {
    return state.params;
  },

  getResult(state) {
    return state.result;
  },
} as GetterTree<EvaluateState, RootState>;
