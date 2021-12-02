import { RootState } from './../types';
import { GetterTree } from 'vuex';
import VideoState from './types';
import { Video } from '@/types/Video';

export default {
  getVideos(state): Video[] | null {
    return state.videos;
  },

  getModalState(state): boolean {
    return state.isModalVisible;
  },

  getConfirmedVideo(state): Video | null {
    return state.confirmedVideo;
  },

  getInfoModalState(state): boolean {
    return state.isInfoModalVisible;
  },
} as GetterTree<VideoState, RootState>;
