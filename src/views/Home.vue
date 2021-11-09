<template>
  <basic-container type="card--transparent">
    <the-header></the-header>
    <basic-tabs
      :items="items"
      :selectedTab="selectedTab"
      @select="setSelectedTab"
    ></basic-tabs>
    <the-form :selectedTab="selectedTab" :key="selectedTab"></the-form>
  </basic-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheHeader from '@/components/Home/TheHeader.vue';
import TheForm from '@/components/Home/TheForm.vue';
import useTabs from '@/hooks/useTabs';

export default defineComponent({
  name: 'Home',

  components: { TheHeader, TheForm },

  setup() {
    const { items, selectedTab, setSelectedTab } = useTabs([
      {
        label: 'Kanały',
        value: 'channels',
      },
      {
        label: 'Filmiki',
        value: 'videos',
      },
    ]);

    return {
      selectedTab,
      items,
      setSelectedTab,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';
</style>
