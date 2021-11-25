import { useStore } from '@/store';
import EvaluateActions from '@/types/EvaluateActions';
import { computed } from 'vue';

type useInfoModalType = {
  isVisible: {
    value: boolean;
  };
  hideModal: () => Promise<void>;
};

export default (
  actions: EvaluateActions,
  getters: {
    isVisible: string;
  }
): useInfoModalType => {
  const store = useStore();

  const isVisible = computed<boolean>(() => store.getters[getters.isVisible]);

  const hideModal = (): Promise<void> =>
    store.dispatch(actions.toggleInfoModal, false);

  return {
    isVisible,
    hideModal,
  };
};
