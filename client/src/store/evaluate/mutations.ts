import { MutationTree } from 'vuex';
import { EvaluateState } from './type';

export enum EvaluateMutations {
  SET_PARAMS = 'SET_PARAMS',
}

export default {
  [EvaluateMutations.SET_PARAMS](state, payload: EvaluateState) {
    state.params = payload.params;
  },
} as MutationTree<EvaluateState>;
