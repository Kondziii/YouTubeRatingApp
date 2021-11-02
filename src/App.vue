<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from './store';
import { useChannelActions } from './store/channel/actions';

export default defineComponent({
  setup() {
    const store = useStore();
    const ChannelActions = useChannelActions();

    store.dispatch(
      ChannelActions.fetchSimilarChannelsByUrl,
      'https://www.youtube.com/c/SonnySangha'
    );

    return {};
  },
});
</script>

<style scoped></style>
