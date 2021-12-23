import { EvaluateParams } from './../../types/EvaluateParams';
import { EvaluateMutations } from './../evaluate/mutations';
import { useErrorActions } from './../error/actions';
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
  analyzeSentiment: 'analyzeSentiment',
};

export const useVideoActions = (): typeof videoActions => {
  return useActions<typeof videoActions>(videoActions, namespaces.video);
};

export default {
  async [videoActions.fetchSimilarByTitle](
    { commit, dispatch },
    payload: string
  ) {
    const errorActions = useErrorActions();
    if (payload.includes('/') || payload.includes('v=')) {
      dispatch(
        errorActions.setError,
        {
          is: true,
          title: 'Error occurred',
          message: `Oops. The entered value is more like url address. Make sure you've selected correct option.`,
        },
        { root: true }
      );
    } else {
      try {
        const videos = await youtube.getVideosByTitle(payload);
        commit(VideoMutations.SET_VIDEOS, videos);
        dispatch(videoActions.toggleModal, true);
      } catch (error: any) {
        if (error.response) {
          const status = error.response.status;

          if (status === 404) {
            dispatch(
              errorActions.setError,
              {
                is: true,
                title: `The video hasn't been found`,
                message: `Oops. There hasn't been found any result that corresponds to the entered value: ${payload}`,
              },
              { root: true }
            );
          } else if (status === 500) {
            dispatch(
              errorActions.setError,
              {
                is: true,
                title: 'Server error',
                message: `Oops. Error occurred to the exceeding the available limit for youtube data.`,
              },
              { root: true }
            );
          }
        }
      }
    }
  },

  async [videoActions.fetchSimilarByUrl](
    { commit, dispatch },
    payload: string
  ) {
    const errorActions = useErrorActions();
    if (!payload.includes('/') && !payload.includes('v=')) {
      dispatch(
        errorActions.setError,
        {
          is: true,
          title: 'Error occurred',
          message: `Oops. The entered value is more like a title. Make sure you've selected correct option.`,
        },
        { root: true }
      );
    } else {
      try {
        const videos = await youtube.getVideosByUrl(payload);
        commit(VideoMutations.SET_VIDEOS, videos);
        dispatch(videoActions.toggleModal, true);
      } catch (error: any) {
        if (error.response) {
          const status = error.response.status;

          if (status === 404) {
            dispatch(
              errorActions.setError,
              {
                is: true,
                title: `The video hasn't been found`,
                message: `Oops. There hasn't been found any result that corresponds to the entered value: ${payload}`,
              },
              { root: true }
            );
          } else if (status === 500) {
            dispatch(
              errorActions.setError,
              {
                is: true,
                title: 'Server error',
                message: `Oops. Error occurred to the exceeding the available limit for youtube data.`,
              },
              { root: true }
            );
          }
        }
      }
    }
  },

  [videoActions.toggleModal]({ commit }, payload: boolean) {
    commit(VideoMutations.SET_MODAL_STATE, payload);
  },

  async [videoActions.fetchFullInfo]({ commit, dispatch }, payload: string) {
    const errorActions = useErrorActions();
    try {
      const video = await youtube.getVideoInfoById(payload);
      commit(VideoMutations.SET_CONFIRMED_VIDEO, video);
      setTimeout(() => {
        dispatch(videoActions.toggleInfoModal, true);
      }, 300);
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;

        if (status === 404) {
          commit(VideoMutations.SET_CONFIRMED_VIDEO, null);
          dispatch(
            errorActions.setError,
            {
              is: true,
              title: `The video hasn't been found`,
              message: `Oops. There hasn't been found any results that corresponds to the entered value ${payload}`,
            },
            { root: true }
          );
        } else if (status === 500) {
          dispatch(
            errorActions.setError,
            {
              is: true,
              title: 'Server error',
              message: `Oops. Error occurred to the exceeding the available limit for youtube data.`,
            },
            { root: true }
          );
        }
      }
    }
  },

  [videoActions.resetConfirmed]({ commit }) {
    commit(VideoMutations.SET_CONFIRMED_VIDEO, null);
  },

  [videoActions.toggleInfoModal]({ commit }, payload: boolean) {
    commit(VideoMutations.SET_INFO_MODAL_STATE, payload);
  },

  async [videoActions.analyzeSentiment](
    { commit, dispatch, rootGetters },
    payload: { videoId: string; channelId: string }
  ) {
    const errorActions = useErrorActions();

    const evaluateParams: EvaluateParams = rootGetters['evaluate/getParams'];

    try {
      const sentiment = await youtube.getVideoSentiment(
        payload.videoId,
        !evaluateParams.useAuthorAnswers ? payload.channelId : '',
        evaluateParams.useSubComments
      );
      commit(`evaluate/${EvaluateMutations.SET_RESULT}`, sentiment, {
        root: true,
      });
      console.log(sentiment);
    } catch (error) {
      dispatch(
        errorActions.setError,
        {
          is: true,
          title: 'Server error',
          message: `Oops. Error occurred to the exceeding the available limit for youtube data.`,
        },
        { root: true }
      );
    }
  },
} as ActionTree<VideoState, RootState>;
