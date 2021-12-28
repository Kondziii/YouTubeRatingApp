import { Sentiment } from './../../types/Sentiment';
import useActions from '@/hooks/useActions';
import { EvaluateMutations } from './mutations';
import { RootState } from './../types';
import { ActionTree } from 'vuex';
import { EvaluateState } from './type';
import { namespaces } from '..';

const EvaluateActions = {
  setParams: 'setParams',
  setVideoResult: 'setVideoResult',
};

export const useEvaluateActions = (): typeof EvaluateActions => {
  return useActions<typeof EvaluateActions>(
    EvaluateActions,
    namespaces.evaluate
  );
};

export default {
  [EvaluateActions.setParams]({ commit, state }, payload: { params: unknown }) {
    commit(EvaluateMutations.SET_PARAMS, { ...state.params, ...payload });
  },

  [EvaluateActions.setVideoResult]({ commit }, payload: Sentiment) {
    commit(EvaluateMutations.SET_VIDEO_RESULT, payload);
  },
} as ActionTree<EvaluateState, RootState>;
