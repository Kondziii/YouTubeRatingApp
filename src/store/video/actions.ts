import { useErrorActions } from './../error/actions';
import { VideoMutations } from './mutations';
import { RootState } from './../types';
import { ActionTree } from 'vuex';
import VideoState from './types';
import youtube from '@/data/yt-api';
import useActions from '@/hooks/useActions';
import { namespaces, store } from '..';
import EvaluateActions from '@/types/EvaluateActions';
import Exception from '@/others/exception';

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
    const errorActions = useErrorActions();
    if (payload.includes('/') || payload.includes('v=')) {
      dispatch(
        errorActions.setError,
        {
          is: true,
          title: 'Wystapił błąd',
          message: `Ups. Podana nazwa przypomina bardziej adres url, a nie nazwę filmiku. Upewnij się, że wybrałeś odpowiednią opcję.`,
        },
        { root: true }
      );
    } else {
      try {
        const videos = await youtube.getVideosByTitle(payload);
        commit(VideoMutations.SET_VIDEOS, videos);
        dispatch(videoActions.toggleModal, true);
      } catch (error) {
        if (error instanceof Exception) {
          dispatch(
            errorActions.setError,
            {
              is: true,
              title: 'Nie znaleziono filmiku',
              message: `Ups. Nie znaleziono żadnego filmiku pasującego do podanej nazwy: ${payload}`,
            },
            { root: true }
          );
        } else {
          dispatch(
            errorActions.setError,
            {
              is: true,
              title: 'Przekroczono limit',
              message: `Ups. Przekroczono dzisiejszy limit danych do wykorzystania.`,
            },
            { root: true }
          );
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
          title: 'Wystapił błąd',
          message: `Ups. Podany adres url przypomina bardziej nazwę filmiku. Upewnij się, że wybrałeś odpowiednią opcję.`,
        },
        { root: true }
      );
    } else {
      try {
        const videos = await youtube.getVideosByUrl(payload);
        commit(VideoMutations.SET_VIDEOS, videos);
        dispatch(videoActions.toggleModal, true);
      } catch (error) {
        if (error instanceof Exception) {
          dispatch(
            errorActions.setError,
            {
              is: true,
              title: 'Nie znaleziono filmiku',
              message: `Ups. Nie znaleziono żadnego filmiku pasującego do podanego adresu url: ${payload}`,
            },
            { root: true }
          );
        } else {
          dispatch(
            errorActions.setError,
            {
              is: true,
              title: 'Przekroczono limit',
              message: `Ups. Przekroczono dzisiejszy limit danych do wykorzystania.`,
            },
            { root: true }
          );
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
      console.log(video);
      setTimeout(() => {
        dispatch(videoActions.toggleInfoModal, true);
      }, 300);
    } catch (error) {
      if (error instanceof Exception) {
        commit(VideoMutations.SET_CONFIRMED_VIDEO, null);
        dispatch(
          errorActions.setError,
          {
            is: true,
            title: 'Nie znaleziono filmiku',
            message: `Ups. Nie znaleziono żadnego filmiku pasującego do podanego id: ${payload}`,
          },
          { root: true }
        );
      } else {
        dispatch(
          errorActions.setError,
          {
            is: true,
            title: 'Przekroczono limit',
            message: `Ups. Przekroczono dzisiejszy limit danych do wykorzystania.`,
          },
          { root: true }
        );
      }
    }
  },

  [videoActions.resetConfirmed]({ commit }) {
    commit(VideoMutations.SET_CONFIRMED_VIDEO, null);
  },

  [videoActions.toggleInfoModal]({ commit }, payload: boolean) {
    commit(VideoMutations.SET_INFO_MODAL_STATE, payload);
  },
} as ActionTree<VideoState, RootState>;
