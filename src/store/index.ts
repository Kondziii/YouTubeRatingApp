import { RootState } from './types';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import channelModule from './channel/index';
import videoModule from './video/index';
import errorModule from './error/index';

export const key: InjectionKey<Store<RootState>> = Symbol();

export const namespaces = {
  channel: 'channel',
  video: 'video',
  error: 'error',
};

export const store = createStore<RootState>({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    [namespaces.channel]: channelModule,
    [namespaces.video]: videoModule,
    [namespaces.error]: errorModule,
  },
});

export const useStore = (): Store<RootState> => {
  return baseUseStore(key);
};
