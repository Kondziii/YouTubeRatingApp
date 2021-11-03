import { RootState } from './../types';
import { GetterTree } from 'vuex';
import VideoState from './types';

export default {
  videos(state) {
    return state.videos;
  },
} as GetterTree<VideoState, RootState>;
