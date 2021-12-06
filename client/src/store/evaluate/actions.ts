import useActions from '@/hooks/useActions';
import { EvaluateMutations } from './mutations';
import { RootState } from './../types';
import { ActionTree } from 'vuex';
import { EvaluateState } from './type';
import { namespaces } from '..';

const EvaluateActions = {
  setParams: 'setParams',
};

export const useEvaluateActions = (): typeof EvaluateActions => {
  return useActions<typeof EvaluateActions>(
    EvaluateActions,
    namespaces.evaluate
  );
};

export default {
  [EvaluateActions.setParams]({ commit }, payload: EvaluateState) {
    commit(EvaluateMutations.SET_PARAMS, payload);
  },
} as ActionTree<EvaluateState, RootState>;
