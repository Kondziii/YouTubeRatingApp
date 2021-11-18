import { useErrorActions } from './../error/actions';
import { RootState } from './../types';
import { ActionTree } from 'vuex';
import { ChannelState } from './types';
import youtube from '@/data/yt-api';
import { ChannelMutations } from './mutations';
import { namespaces } from '../index';
import Exception from '@/others/exception';
import Channel_url from '@/enums/Channel_url';
import useActions from '@/hooks/useActions';

const ChannelActions = {
  fetchSimilarChannelsByTitle: 'fetchSimilarChannelsByTitle',
  fetchSimilarChannelsByUrl: 'fetchSimilarChannelsByUrl',
  toggleModal: 'toggleModal',
};

export const useChannelActions = (): typeof ChannelActions => {
  return useActions<typeof ChannelActions>(ChannelActions, namespaces.channel);
};

export default {
  async [ChannelActions.fetchSimilarChannelsByTitle](
    { commit, dispatch },
    payload: string
  ) {
    const errorActions = useErrorActions();
    if (payload.includes('/')) {
      dispatch(
        errorActions.setError,
        {
          is: true,
          title: 'Wystąpił błąd',
          message: `Ups. Podana nazwa przypomina bardziej adres url filmiku, a nie nazwę kanału. Upewnij się, że wybrałeś odpowiednią opcję.`,
        },
        { root: true }
      );
    } else if (payload.includes('v=')) {
      dispatch(
        errorActions.setError,
        {
          is: true,
          title: 'Wystąpił błąd',
          message: `Ups. Podana nazwa przypomina bardziej adres url filmiku, a nie nazwę kanału. Upewnij się, że wybrałeś odpowiednią opcję.`,
        },
        { root: true }
      );
    } else {
      try {
        const channels = await youtube.getChannelsByTitle(payload);
        commit(ChannelMutations.SET_CHANNELS, channels);
        dispatch(ChannelActions.toggleModal, true);
      } catch (error) {
        if (error instanceof Exception) {
          dispatch(
            errorActions.setError,
            {
              is: true,
              title: 'Nie znaleziono kanału',
              message: `Ups. Nie znaleziono żadnego kanału pasującego do podanej nazwy: ${payload}`,
            },
            { root: true }
          );
        }
      }
    }
  },

  async [ChannelActions.fetchSimilarChannelsByUrl](
    { commit, dispatch },
    payload: string
  ) {
    const errorActions = useErrorActions();
    if (!payload.includes('/')) {
      dispatch(
        errorActions.setError,
        {
          is: true,
          title: 'Wystąpił błąd',
          message: `Ups. Podany adres url przypomina bardzej nazwę kanału. Upewnij się, że wybrałeś odpowiednią opcję.`,
        },
        { root: true }
      );
    } else if (payload.includes('v=')) {
      dispatch(
        errorActions.setError,
        {
          is: true,
          title: 'Wystąpił błąd',
          message: `Ups. Podana nazwa przypomina bardziej adres url filmiku, a nie url kanału. Upewnij się, że wybrałeś odpowiednią opcję.`,
        },
        { root: true }
      );
    } else {
      const type: Channel_url = payload.includes('/channel/')
        ? Channel_url.STANDARD_URL
        : Channel_url.CUSTOM_URL;
      try {
        const channels = await youtube.getChannelsByUrl(payload, type);
        commit(ChannelMutations.SET_CHANNELS, channels);
        dispatch(ChannelActions.toggleModal, true);
      } catch (error) {
        if (error instanceof Exception) {
          dispatch(
            errorActions.setError,
            {
              is: true,
              title: 'Nie znaleziono kanału',
              message: `Ups. Nie znaleziono żadnego kanału pasującego do podanego url: ${payload}`,
            },
            { root: true }
          );
        }
      }
    }
  },

  [ChannelActions.toggleModal]({ commit }, payload: boolean) {
    commit(ChannelMutations.SET_MODAL_STATE, payload);
  },
} as ActionTree<ChannelState, RootState>;
