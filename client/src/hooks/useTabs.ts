import Tab from '@/types/Tab';
import { ref } from 'vue';

interface useTabInterface {
  items: Array<Tab>;
  selectedTab: {
    value: string;
  };
  setSelectedTab: (value: string) => void;
}

export default (
  items: Array<Tab>,
  selected: string = items[0].value
): useTabInterface => {
  const selectedTab = ref<string>(selected);

  const setSelectedTab = (value: string) => {
    selectedTab.value = value;
  };

  return {
    items,
    selectedTab,
    setSelectedTab,
  };
};
