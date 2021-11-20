import { VideoMutations } from './mutations';
import { RootState } from './../types';
import { ActionTree } from 'vuex';
import VideoState from './types';
import youtube from '@/data/yt-api';
import useActions from '@/hooks/useActions';
import { namespaces } from '..';

const videoActions = {
  fetchSimilarVideosByTitle: 'fetchSimilarVideosByTitle',
  fetchSimilarVideosByUrl: 'fetchSimilarVideosByUrl',
  toggleModal: 'toggleModal',
  fetchFullInfoAboutVideo: 'fetchFullInfoAboutVideo',
  resetConfirmedVideo: 'resetConfirmedVideo',
};

export const useVideoActions = (): typeof videoActions => {
  return useActions<typeof videoActions>(videoActions, namespaces.video);
};

export default {
  async [videoActions.fetchSimilarVideosByTitle](
    { commit, dispatch },
    payload: string
  ) {
    try {
      const videos = await youtube.getVideosByTitle(payload);
      commit(VideoMutations.SET_VIDEOS, videos);
      dispatch(videoActions.toggleModal, true);
      console.log(videos);
    } catch (error) {
      console.log(error);
    }
  },

  async [videoActions.fetchSimilarVideosByUrl](
    { commit, dispatch },
    payload: string
  ) {
    try {
      const videos = await youtube.getVideosByUrl(payload);
      commit(VideoMutations.SET_VIDEOS, videos);
      dispatch(videoActions.toggleModal, true);
      console.log(videos);
    } catch (error) {
      console.log(error);
    }
  },

  [videoActions.toggleModal]({ commit }, payload: boolean) {
    commit(VideoMutations.SET_MODAL_STATE, payload);
  },

  async [videoActions.fetchFullInfoAboutVideo]({ commit }, payload: string) {
    try {
      const video = await youtube.getVideoInfoById(payload);
      commit(VideoMutations.SET_CONFIRMED_VIDEO, video);
      console.log(video);
    } catch (error) {
      console.log(error);
    }
  },

  [videoActions.resetConfirmedVideo]({ commit }) {
    commit(VideoMutations.SET_CONFIRMED_VIDEO, null);
  },
} as ActionTree<VideoState, RootState>;
