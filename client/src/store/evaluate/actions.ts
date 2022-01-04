import { useErrorActions } from './../error/actions';
import { Video, VideoHistory } from './../../types/Video';
import { Sentiment, ChannelSentiment } from './../../types/Sentiment';
import useActions from '@/hooks/useActions';
import { EvaluateMutations } from './mutations';
import { RootState } from './../types';
import { ActionTree } from 'vuex';
import { EvaluateState } from './type';
import { namespaces } from '..';

const EvaluateActions = {
  setParams: 'setParams',
  setVideoResult: 'setVideoResult',
  saveVideoResult: 'saveVideoResult',
  deleteVideoResult: 'deleteVideoResult',
  setChannelResult: 'setChannelResult',
  setChannelResultVisible: 'setChannelResultVisible',
};

export const useEvaluateActions = (): typeof EvaluateActions => {
  return useActions<typeof EvaluateActions>(
    EvaluateActions,
    namespaces.evaluate
  );
};

export default {
  [EvaluateActions.setParams]({ commit, state }, payload: { params: unknown }) {
    commit(EvaluateMutations.SET_PARAMS, { ...state.params, ...payload });
  },

  [EvaluateActions.setVideoResult]({ commit }, payload: Sentiment) {
    commit(EvaluateMutations.SET_VIDEO_RESULT, payload);
  },

  [EvaluateActions.setChannelResult]({ commit }, payload: ChannelSentiment) {
    commit(EvaluateMutations.SET_CHANNEL_RESULT, payload);
  },

  async [EvaluateActions.saveVideoResult](
    context,
    payload: { video: Video; result: Sentiment }
  ) {
    const errorActions = useErrorActions();

    const id: string =
      payload.video.id + new Date(payload.result.date).getTime();

    const item = { id, ...payload } as VideoHistory;

    const history = await context.getters.getVideoHistory;

    const ifExists = history.findIndex((item: VideoHistory) => item.id === id);

    if (ifExists !== -1) {
      context.dispatch(
        errorActions.setError,
        {
          is: true,
          title: 'Error',
          message: `Oops. This result has already been saved.`,
        },
        { root: true }
      );
    } else {
      history.push(item);
      context.commit(EvaluateMutations.SET_VIDEO_HISTORY, history);
      window.localStorage.setItem('video-history', JSON.stringify(history));
      context.dispatch(
        errorActions.setError,
        {
          is: true,
          title: 'Success',
          message: `The evaluation result successfully was added to your history.`,
        },
        { root: true }
      );
    }
  },

  async [EvaluateActions.deleteVideoResult](
    { dispatch, commit, getters },
    payload: number
  ) {
    const errorActions = useErrorActions();

    const history = await getters.getVideoHistory;

    history.splice(payload, 1);

    commit(EvaluateMutations.SET_VIDEO_RESULT, history);

    window.localStorage.setItem('video-history', JSON.stringify(history));

    dispatch(
      errorActions.setError,
      {
        is: true,
        title: 'Success',
        message: `The item was successfully deleted.`,
      },
      { root: true }
    );
  },

  [EvaluateActions.setChannelResultVisible]({ commit }, payload: boolean) {
    commit(EvaluateMutations.SET_CHANNEL_RESULT_VISIBLE, payload);
  },
} as ActionTree<EvaluateState, RootState>;
