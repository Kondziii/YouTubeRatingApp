import Video, { VideoFullInfo } from '@/types/Video';
import { MutationTree } from 'vuex';
import VideoState from './types';

export enum VideoMutations {
  SET_VIDEOS = 'SET_VIDEOS',
  SET_MODAL_STATE = 'SET_MODAL_STATE',
  SET_CONFIRMED_VIDEO = 'SET_CONFIRMED_VIDEO',
}

export default {
  [VideoMutations.SET_VIDEOS](state, payload: Video[]) {
    state.videos = payload;
  },

  [VideoMutations.SET_MODAL_STATE](state, payload: boolean) {
    state.isModalVisible = payload;
  },

  [VideoMutations.SET_CONFIRMED_VIDEO](state, payload: VideoFullInfo) {
    state.confirmedVideo = payload;
  },
} as MutationTree<VideoState>;
