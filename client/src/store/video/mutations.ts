import { Video } from '@/types/Video';
import { MutationTree } from 'vuex';
import VideoState from './types';

export enum VideoMutations {
  SET_VIDEOS = 'SET_VIDEOS',
  SET_MODAL_STATE = 'SET_MODAL_STATE',
  SET_CONFIRMED_VIDEO = 'SET_CONFIRMED_VIDEO',
  SET_INFO_MODAL_STATE = 'SET_INFO_MODAL_STATE',
}

export default {
  [VideoMutations.SET_VIDEOS](state, payload: Video[]) {
    state.videos = payload;
  },

  [VideoMutations.SET_MODAL_STATE](state, payload: boolean) {
    state.isModalVisible = payload;
  },

  [VideoMutations.SET_CONFIRMED_VIDEO](state, payload: Video) {
    state.confirmedVideo = payload;
  },

  [VideoMutations.SET_INFO_MODAL_STATE](state, payload: boolean) {
    state.isInfoModalVisible = payload;
  },
} as MutationTree<VideoState>;
