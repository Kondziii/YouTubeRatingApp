import { VideoHistory } from '@/types/Video';
import { Sentiment } from './../../types/Sentiment';
import { MutationTree } from 'vuex';
import { EvaluateState } from './type';

export enum EvaluateMutations {
  SET_PARAMS = 'SET_PARAMS',
  SET_VIDEO_RESULT = 'SET_VIDEO_RESULT',
  SET_VIDEO_HISTORY = 'SET_VIDEO_HISTORY',
}

export default {
  [EvaluateMutations.SET_PARAMS](state, payload: EvaluateState) {
    state.params = payload.params;
  },

  [EvaluateMutations.SET_VIDEO_RESULT](state, payload: Sentiment) {
    state.videoResult = payload;
  },

  [EvaluateMutations.SET_VIDEO_HISTORY](state, payload: VideoHistory[]) {
    state.videoHistory = payload;
  },
} as MutationTree<EvaluateState>;
