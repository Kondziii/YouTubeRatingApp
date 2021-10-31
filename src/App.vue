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

    store.dispatch(ChannelActions.fetchSimilarChannelsByTitle, 'cbxcvbcvbcvb');

    return {};
  },
});
</script>

<style scoped></style>
