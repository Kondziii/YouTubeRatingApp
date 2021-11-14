import { RootState } from '../types';
import { ChannelState } from './types';
import { Module } from 'vuex';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

const channelModule: Module<ChannelState, RootState> = {
  namespaced: true,
  state: () => ({
    channels: [],
    isModalVisible: false,
  }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};

export default channelModule;
