import { RootState } from './../types';
import { Module } from 'vuex';
import { ErrorState } from './types';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const errorModule: Module<ErrorState, RootState> = {
  namespaced: true,
  state: () => ({
    err: {
      is: false,
      title: '',
      message: '',
    },
  }),
  mutations,
  actions,
  getters,
};

export default errorModule;
