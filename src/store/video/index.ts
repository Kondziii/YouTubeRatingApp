import { RootState } from '../types';
import { Module } from 'vuex';
import VideoState from './types';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const videoModule: Module<VideoState, RootState> = {
  namespaced: true,
  state: () => ({
    videos: [],
  }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};

export default videoModule;
