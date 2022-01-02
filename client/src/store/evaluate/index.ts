import { RootState } from './../types';
import { Module } from 'vuex';
import { EvaluateState } from './type';
import { COMMENTS_LIMIT } from '../../../config';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { VideoHistory } from '@/types/Video';

const EvaluateModule: Module<EvaluateState, RootState> = {
  namespaced: true,
  state: () => ({
    params: {
      type: 'channels',
      minComments: COMMENTS_LIMIT,
      useDates: false,
      beginDate: null,
      endDate: null,
      useSubComments: true,
      useAuthorAnswers: false,
    },
    videoResult: null,
    videoHistory: JSON.parse(
      window.localStorage.getItem('video-history') || '[]'
    ) as Array<VideoHistory>,
    channelResult: null,
  }),
  mutations,
  actions,
  getters,
};

export default EvaluateModule;
