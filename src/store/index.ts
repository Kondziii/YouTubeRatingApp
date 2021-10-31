import { RootState } from './types';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import channelModule from './channel/index';

export const key: InjectionKey<Store<RootState>> = Symbol();

export const namespaces = {
  channel: 'channel',
};

export const store = createStore<RootState>({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    [namespaces.channel]: channelModule,
  },
});

export const useStore = (): Store<RootState> => {
  return baseUseStore(key);
};
