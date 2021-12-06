import { RootState } from './types';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import channelModule from './channel/index';
import videoModule from './video/index';
import errorModule from './error/index';
import evaluateModule from './evaluate/index';

export const key: InjectionKey<Store<RootState>> = Symbol();

export const namespaces = {
  channel: 'channel',
  video: 'video',
  error: 'error',
  evaluate: 'evaluate',
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
    [namespaces.evaluate]: evaluateModule,
  },
});

export const useStore = (): Store<RootState> => {
  return baseUseStore(key);
};
