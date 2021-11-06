<template>
  <q-layout class="root">
    <div class="background" />
    <router-view :style="{ marginBottom: '20vh' }"></router-view>
    <the-footer></the-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheFooter from '@/components/TheFooter.vue';
// import TheFooter from '@/components/TheFooter.vue';
// import { useStore } from './store';
// import { useChannelActions } from './store/channel/actions';

export default defineComponent({
  components: {
    TheFooter,
  },

  setup() {
    // const store = useStore();
    // const ChannelActions = useChannelActions();

    return {};
  },
});
</script>

<style lang="scss">
.root {
  width: 100%;
  min-height: 100vh !important;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url('./assets/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.background::before {
  content: '';
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}
</style>
