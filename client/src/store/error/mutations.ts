import ErrorType from '@/types/ErrorType';
import { MutationTree } from 'vuex';
import { ErrorState } from './types';

export enum ErrorMutations {
  SET_ERROR = 'SET_ERROR',
}

export default {
  [ErrorMutations.SET_ERROR](state, payload: ErrorType) {
    state.err = { ...payload };
  },
} as MutationTree<ErrorState>;
