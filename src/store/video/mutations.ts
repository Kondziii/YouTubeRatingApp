import { MutationTree } from 'vuex';
import VideoState from './types';

export enum VideoMutations {
  SET_VIDEOS = 'SET_VIDEOS',
}

export default {
  [VideoMutations.SET_VIDEOS](state, payload) {
    state.videos = payload;
  },
} as MutationTree<VideoState>;
