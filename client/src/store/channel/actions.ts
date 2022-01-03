import { EvaluateMutations } from './../evaluate/mutations';
import { EvaluateParams } from './../../types/EvaluateParams';
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
  setConfirmed: 'setConfirmed',
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

  async [ChannelActions.analyzeSentiment](
    { dispatch, commit, rootGetters },
    payload: { channelId: string; playlistId: string }
  ) {
    const errorActions = useErrorActions();
    try {
      const params = rootGetters['evaluate/getParams'];

      // const channelSentiment = await youtube.getChannelSentiment(
      //   params.useAuthorAnswers ? 'null' : payload.channelId,
      //   payload.playlistId,
      //   {
      //     minComments: params.minComments,
      //     useSubComments: params.useSubComments,
      //     useDates: params.useDates,
      //     beginDate: params.beginDate,
      //     endDate: params.endDate,
      //   }
      // );

      const channelSentiment = {
        vote: 'positive',
        videosCount: {
          all: 5,
          processed: 5,
          excluded: 0,
        },
        videosVoteCount: {
          'very positive': 0,
          positive: 5,
          neutral: 0,
          negative: 0,
          'very negative': 0,
        },
        videosAvg: {
          positive: 0.275682170659624,
          neutral: 0.709939471797774,
          negative: 0.014385764950009433,
          compound: 0.3001237409293844,
        },
        evaluateParams: {
          commentsLimit: 5,
          useTime: true,
          beginDate: '20/12/2021',
          endDate: '31/12/2021',
          useSubcomments: true,
          useAuthorAnswers: false,
        },
        videosSentiment: {
          processed: [
            {
              vote: 'positive',
              commentCount: {
                all: 32,
                processed: 27,
                excluded: 5,
              },
              commentVoteCount: {
                positive: 19,
                neutral: 6,
                negative: 2,
              },
              avg: {
                positive: 0.28770370370370374,
                neutral: 0.6986666666666665,
                negative: 0.013666666666666667,
                compound: 0.37551481481481486,
              },
              evaluateParams: {
                useSubcomments: true,
                useAuthorAnswers: false,
              },
              date: '2022-01-03T10:36:42.608Z',
              videoId: 'hdnt-jdDlao',
              title:
                'Full Year view Calendar using Html CSS & Javascript | JS Year Calendar',
              imageHigh: 'https://i.ytimg.com/vi/hdnt-jdDlao/hqdefault.jpg',
              publishedAt: '2021-12-23T12:17:53Z',
            },
            {
              vote: 'positive',
              commentCount: {
                all: 50,
                processed: 45,
                excluded: 5,
              },
              commentVoteCount: {
                positive: 28,
                neutral: 17,
                negative: 0,
              },
              avg: {
                positive: 0.29837777777777785,
                neutral: 0.6986444444444444,
                negative: 0.002977777777777778,
                compound: 0.33019777777777776,
              },
              evaluateParams: {
                useSubcomments: true,
                useAuthorAnswers: false,
              },
              date: '2022-01-03T10:36:43.021Z',
              videoId: 'GnllGn9Oifs',
              title:
                'CSS Water Drop Logo Effect | Html CSS Dropmorphism @Online Tutorials',
              imageHigh: 'https://i.ytimg.com/vi/GnllGn9Oifs/hqdefault.jpg',
              publishedAt: '2021-12-26T09:03:47Z',
            },
            {
              vote: 'positive',
              commentCount: {
                all: 23,
                processed: 19,
                excluded: 4,
              },
              commentVoteCount: {
                positive: 7,
                neutral: 12,
                negative: 0,
              },
              avg: {
                positive: 0.2113157894736842,
                neutral: 0.7886842105263158,
                negative: 0,
                compound: 0.20299473684210528,
              },
              evaluateParams: {
                useSubcomments: true,
                useAuthorAnswers: false,
              },
              date: '2022-01-03T10:36:43.392Z',
              videoId: 'i8t2ANI8Qyo',
              title:
                'New Year Text Animation Effects using Html CSS | CSS 3D Animated Christmas Tree @Online Tutorials',
              imageHigh: 'https://i.ytimg.com/vi/i8t2ANI8Qyo/hqdefault.jpg',
              publishedAt: '2021-12-24T07:17:48Z',
            },
            {
              vote: 'positive',
              commentCount: {
                all: 73,
                processed: 62,
                excluded: 11,
              },
              commentVoteCount: {
                positive: 40,
                neutral: 18,
                negative: 4,
              },
              avg: {
                positive: 0.3031451612903226,
                neutral: 0.6655967741935486,
                negative: 0.03125806451612904,
                compound: 0.3034403225806452,
              },
              evaluateParams: {
                useSubcomments: true,
                useAuthorAnswers: false,
              },
              date: '2022-01-03T10:36:43.954Z',
              videoId: 'pqny8c69LUY',
              title: 'CSS Animation Effects | Html CSS  @Online Tutorials',
              imageHigh: 'https://i.ytimg.com/vi/pqny8c69LUY/hqdefault.jpg',
              publishedAt: '2021-12-22T10:41:44Z',
            },
            {
              vote: 'positive',
              commentCount: {
                all: 44,
                processed: 38,
                excluded: 6,
              },
              commentVoteCount: {
                positive: 23,
                neutral: 13,
                negative: 2,
              },
              avg: {
                positive: 0.2778684210526316,
                neutral: 0.6981052631578948,
                negative: 0.024026315789473684,
                compound: 0.2884710526315789,
              },
              evaluateParams: {
                useSubcomments: true,
                useAuthorAnswers: false,
              },
              date: '2022-01-03T10:36:44.453Z',
              videoId: 'hrv2XAY27gU',
              title:
                'Animated Christmas Tree using Html & CSS Only | CSS 3D Animation Effects @Online Tutorials',
              imageHigh: 'https://i.ytimg.com/vi/hrv2XAY27gU/hqdefault.jpg',
              publishedAt: '2021-12-20T11:31:14Z',
            },
          ],
          excluded: [
            {
              vote: 'positive',
              commentCount: {
                all: 44,
                processed: 38,
                excluded: 6,
              },
              commentVoteCount: {
                positive: 23,
                neutral: 13,
                negative: 2,
              },
              avg: {
                positive: 0.2778684210526316,
                neutral: 0.6981052631578948,
                negative: 0.024026315789473684,
                compound: 0.2884710526315789,
              },
              evaluateParams: {
                useSubcomments: true,
                useAuthorAnswers: false,
              },
              date: '2022-01-03T10:36:44.453Z',
              videoId: 'hrv2XAY27gU',
              title:
                'Animated Christmas Tree using Html & CSS Only | CSS 3D Animation Effects @Online Tutorials',
              imageHigh: 'https://i.ytimg.com/vi/hrv2XAY27gU/hqdefault.jpg',
              publishedAt: '2021-12-20T11:31:14Z',
            },
          ],
        },
        date: '2022-01-03T10:36:44.454Z',
      };

      commit(
        `evaluate/${EvaluateMutations.SET_CHANNEL_RESULT}`,
        channelSentiment,
        { root: true }
      );
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
} as ActionTree<ChannelState, RootState>;
