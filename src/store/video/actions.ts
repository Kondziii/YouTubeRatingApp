import { VideoMutations } from './mutations';
import { RootState } from './../types';
import { ActionTree } from 'vuex';
import VideoState from './types';
import youtube from '@/data/yt-api';
import useActions from '@/hooks/useActions';
import { namespaces } from '..';
import EvaluateActions from '@/types/EvaluateActions';

const videoActions: EvaluateActions = {
  fetchSimilarByTitle: 'fetchSimilarByTitle',
  fetchSimilarByUrl: 'fetchSimilarByUrl',
  toggleModal: 'toggleModal',
  fetchFullInfo: 'fetchFullInfo',
  toggleInfoModal: 'toggleInfoModal',
  resetConfirmed: 'resetConfirmed',
};

export const useVideoActions = (): typeof videoActions => {
  return useActions<typeof videoActions>(videoActions, namespaces.video);
};

export default {
  async [videoActions.fetchSimilarByTitle](
    { commit, dispatch },
    payload: string
  ) {
    try {
      const videos = await youtube.getVideosByTitle(payload);
      commit(VideoMutations.SET_VIDEOS, videos);
      dispatch(videoActions.toggleModal, true);
    } catch (error) {
      console.log(error);
    }
  },

  async [videoActions.fetchSimilarByUrl](
    { commit, dispatch },
    payload: string
  ) {
    try {
      const videos = await youtube.getVideosByUrl(payload);
      commit(VideoMutations.SET_VIDEOS, videos);
      dispatch(videoActions.toggleModal, true);
    } catch (error) {
      console.log(error);
    }
  },

  [videoActions.toggleModal]({ commit }, payload: boolean) {
    commit(VideoMutations.SET_MODAL_STATE, payload);
  },

  async [videoActions.fetchFullInfo]({ commit, dispatch }, payload: string) {
    try {
      const video = await youtube.getVideoInfoById(payload);
      commit(VideoMutations.SET_CONFIRMED_VIDEO, video);
      console.log(video);
      setTimeout(() => {
        dispatch(videoActions.toggleInfoModal, true);
      }, 300);
    } catch (error) {
      console.log(error);
    }
  },

  [videoActions.resetConfirmed]({ commit }) {
    commit(VideoMutations.SET_CONFIRMED_VIDEO, null);
  },

  [videoActions.toggleInfoModal]({ commit }, payload: boolean) {
    commit(VideoMutations.SET_INFO_MODAL_STATE, payload);
  },
} as ActionTree<VideoState, RootState>;
