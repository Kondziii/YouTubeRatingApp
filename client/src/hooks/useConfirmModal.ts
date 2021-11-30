import { useStore } from '@/store/index';
import { ConfirmModalGettersType } from '@/types/ConfirmModalGettersType';
import EvaluateActions from '@/types/EvaluateActions';
import { computed, ref } from 'vue';

interface useConfirmModalType<type> {
  isVisible: {
    value: boolean;
  };
  items: {
    value: Array<type>;
  };
  selectedItemId: {
    value: string;
  };
  hideModal: () => void;
  confirmModal: () => void;
}

export default <T>(
  actions: EvaluateActions,
  getters: ConfirmModalGettersType
): useConfirmModalType<T> => {
  const store = useStore();

  const isVisible = computed<boolean>(() => store.getters[getters.isVisible]);

  const items = computed<T[]>(() => store.getters[getters.items]);

  const selectedItemId = ref<string>('');

  const hideModal = () => {
    store.dispatch(actions.toggleModal, false);
  };

  const confirmModal = () => {
    store.dispatch(actions.toggleModal, false);
    store.dispatch(actions.fetchFullInfo, selectedItemId.value);
  };

  return {
    isVisible,
    items,
    selectedItemId,
    hideModal,
    confirmModal,
  };
};
