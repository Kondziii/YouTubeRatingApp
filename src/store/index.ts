import { RootState } from './types';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import channelModule from './channel/index';
import videoModule from './video';

export const key: InjectionKey<Store<RootState>> = Symbol();

export const namespaces = {
  channel: 'channel',
  video: 'video',
};

export const store = createStore<RootState>({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    [namespaces.channel]: channelModule,
    [namespaces.video]: videoModule,
  },
});

export const useStore = (): Store<RootState> => {
  return baseUseStore(key);
};
