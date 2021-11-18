import { ref } from 'vue';

interface useSelectType {
  selectItem: (id: string) => void;
  isItemSelected: (id: string) => boolean;
}

export default (currItem: string): useSelectType => {
  const selectedItem = ref<string>(currItem);

  const selectItem = (id: string) => {
    selectedItem.value = id;
  };

  const isItemSelected = (id: string) => {
    return selectedItem.value === id;
  };

  return {
    selectItem,
    isItemSelected,
  };
};
