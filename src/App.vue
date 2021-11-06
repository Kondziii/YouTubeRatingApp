<template>
  <div class="root">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { useStore } from './store';
// import { useChannelActions } from './store/channel/actions';

export default defineComponent({
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
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  background-image: url('./assets/i1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.root::before {
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
