import { RootState } from './../types';
import { GetterTree } from 'vuex';
import VideoState from './types';
import Video, { VideoFullInfo } from '@/types/Video';

export default {
  getVideos(state): Video[] | null {
    return state.videos;
  },

  getModalState(state): boolean {
    return state.isModalVisible;
  },

  getConfirmedVideo(state): VideoFullInfo | null {
    return state.confirmedVideo;
  },
} as GetterTree<VideoState, RootState>;
