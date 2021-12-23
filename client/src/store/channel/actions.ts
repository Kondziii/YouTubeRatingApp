import { useErrorActions } from './../error/actions';
import { RootState } from './../types';
import { ActionTree } from 'vuex';
import { ChannelState } from './types';
import youtube from '@/data/yt-api';
import { ChannelMutations } from './mutations';
import { namespaces } from '../index';
import Channel_url from '@/enums/Channel_url';
import useActions from '@/hooks/useActions';
import EvaluateActions from '@/types/EvaluateActions';

const ChannelActions: EvaluateActions = {
  fetchSimilarByTitle: 'fetchSimilarByTitle',
  fetchSimilarByUrl: 'fetchSimilarByUrl',
  toggleModal: 'toggleModal',
  fetchFullInfo: 'fetchFullInfo',
  toggleInfoModal: 'toggleInfoModal',
  resetConfirmed: 'resetConfirmed',
  analyzeSentiment: 'analyzeSentiment',
};

export const useChannelActions = (): typeof ChannelActions => {
  return useActions<typeof ChannelActions>(ChannelActions, namespaces.channel);
};

export default {
  async [ChannelActions.fetchSimilarByTitle](
    { commit, dispatch },
    payload: string
  ) {
    const errorActions = useErrorActions();
    if (payload.includes('/')) {
      dispatch(
        errorActions.setError,
        {
          is: true,
          title: 'Error occurred',
          message: `Oops. The entered value is more like a url address. Make sure you've selected correct option.`,
        },
        { root: true }
      );
    } else {
      try {
        const channels = await youtube.getChannelsByTitle(payload);
        commit(ChannelMutations.SET_CHANNELS, channels);
        dispatch(ChannelActions.toggleModal, true);
      } catch (error: any) {
        if (error.response) {
          const status = error.response.status;
          if (status === 404) {
            dispatch(
              errorActions.setError,
              {
                is: true,
                title: `The channel hasn't been found`,
                message: `Oops. There hasn't been found any results that corresponds to the entered value: ${payload}`,
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

  async [ChannelActions.fetchSimilarByUrl](
    { commit, dispatch },
    payload: string
  ) {
    const errorActions = useErrorActions();
    if (!payload.includes('/')) {
      dispatch(
        errorActions.setError,
        {
          is: true,
          title: 'Error occurred',
          message: `Oops. The entered value is more like a title. Make sure you've selected correct option.`,
        },
        { root: true }
      );
    } else if (payload.includes('v=')) {
      dispatch(
        errorActions.setError,
        {
          is: true,
          title: 'Error occurred',
          message: `Oops. The entered url address is more like url for video. Make sure you've selected correct option.`,
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
      } catch (error: any) {
        if (error.response) {
          const status = error.response.status;
          if (status === 404) {
            dispatch(
              errorActions.setError,
              {
                is: true,
                title: `The channel hasn't been found`,
                message: `Oops. There hasn't been found any results that corresponds to the entered value: ${payload}`,
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

  [ChannelActions.toggleModal]({ commit }, payload: boolean) {
    commit(ChannelMutations.SET_MODAL_STATE, payload);
  },

  async [ChannelActions.fetchFullInfo]({ dispatch, commit }, payload: string) {
    const errorActions = useErrorActions();
    try {
      const channel = await youtube.getChannelInfoById(payload);
      commit(ChannelMutations.SET_CONFIRMED_CHANNEL, channel);
      setTimeout(() => {
        dispatch(ChannelActions.toggleInfoModal, true);
      }, 300);
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        if (status === 404) {
          commit(ChannelMutations.SET_CONFIRMED_CHANNEL, null);
          dispatch(
            errorActions.setError,
            {
              is: true,
              title: 'Error occurred',
              message: `Oops. The confirmed channel hasn't been found: ${payload}`,
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

  [ChannelActions.toggleInfoModal]({ commit }, payload: boolean) {
    commit(ChannelMutations.SET_INFO_MODAL_STATE, payload);
  },

  [ChannelActions.resetConfirmed]({ commit }) {
    commit(ChannelMutations.SET_CONFIRMED_CHANNEL, null);
  },
} as ActionTree<ChannelState, RootState>;
