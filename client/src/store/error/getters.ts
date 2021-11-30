import { RootState } from './../types';
import { GetterTree } from 'vuex';
import { ErrorState } from './types';
import ErrorType from '@/types/ErrorType';

export default {
  getError(state): ErrorType {
    return state.err;
  },
} as GetterTree<ErrorState, RootState>;
