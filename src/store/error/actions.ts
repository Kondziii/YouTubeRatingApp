import { RootState } from './../types';
import { ActionTree } from 'vuex';
import { ErrorState } from './types';
import { ErrorMutations } from './mutations';
import { namespaces } from '..';
import useActions from '@/hooks/useActions';
import ErrorType from '@/types/ErrorType';

const ErrorActions = {
  setError: 'setError',
};

export const useErrorActions = (): typeof ErrorActions => {
  return useActions<typeof ErrorActions>(ErrorActions, namespaces.error);
};

export default {
  [ErrorActions.setError]({ commit }, payload: ErrorType) {
    commit(ErrorMutations.SET_ERROR, payload);
  },
} as ActionTree<ErrorState, RootState>;
