<template>
  <div class="root"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ytApi from './data/yt-api';
import Channel_url from './enums/Channel_url';
import { useStore } from './store';
import { useChannelActions } from './store/channel/actions';

export default defineComponent({
  setup() {
    const store = useStore();
    const ChannelActions = useChannelActions();

    return {};
  },
});
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100vh;
  background-image: url('./assets/background_1.jpg');
  background-position: center;
  background-size: cover;
  position: relative;
}

.root::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(100, 100, 100, 0.3);
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
