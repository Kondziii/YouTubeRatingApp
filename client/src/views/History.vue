<template>
  <basic-container type="card--transparent">
    <h1>History</h1>
    <basic-tabs
      :items="items"
      :selectedTab="selectedTab"
      @select="setSelectedTab"
      :style="{ margin: '4vh auto 2vh' }"
    ></basic-tabs>
    <component :is="selectedTab + '-history'"></component>
  </basic-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useTabs from '@/hooks/useTabs';
import VideoHistory from '@/components/history/VideoHistory.vue';
import ChannelHistory from '@/components/history/ChannelHistory.vue';

export default defineComponent({
  name: 'History',

  components: {
    VideoHistory,
    ChannelHistory,
  },

  setup() {
    const { items, selectedTab, setSelectedTab } = useTabs([
      {
        label: 'Channels',
        value: 'channel',
      },
      {
        label: 'Videos',
        value: 'video',
      },
    ]);

    return {
      items,
      selectedTab,
      setSelectedTab,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './src/styles/quasar.variables.scss';

h1 {
  @include header();
  text-align: center;
  margin-top: 2vh;
}
</style>
