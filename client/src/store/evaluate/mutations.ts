import { Sentiment } from './../../types/Sentiment';
import { MutationTree } from 'vuex';
import { EvaluateState } from './type';

export enum EvaluateMutations {
  SET_PARAMS = 'SET_PARAMS',
  SET_RESULT = 'SET_RESULT',
}

export default {
  [EvaluateMutations.SET_PARAMS](state, payload: EvaluateState) {
    state.params = payload.params;
  },

  [EvaluateMutations.SET_RESULT](state, payload: Sentiment) {
    state.result = payload;
  },
} as MutationTree<EvaluateState>;
