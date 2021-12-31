import Tab from '@/types/Tab';
import { ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';

interface useTabInterface {
  items: Array<Tab>;
  selectedTab: {
    value: string;
  };
  setSelectedTab: (value: string) => void;
}

export default (
  items: Array<Tab>,
  path: string,
  selected: string = items[0].value
): useTabInterface => {
  const router = useRouter();
  const route = useRoute();
  const selectedTab = ref<string>(route.query.value?.toString() || selected);

  const setSelectedTab = (value: string) => {
    selectedTab.value = value;
    router.replace({ name: path, query: { value: value } });
  };

  return {
    items,
    selectedTab,
    setSelectedTab,
  };
};
