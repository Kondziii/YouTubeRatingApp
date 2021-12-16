<template>
  <div class="nav">
    <q-toolbar class="toolbar text-white shadow-2 rounded-borders q-px-xl">
      <router-link :style="{ color: 'white !important' }" class="logo" to="/"
        >YouTubeRateApp
      </router-link>
      <q-space />
      <div v-if="!$q.screen.xs">
        <router-link class="link" to="/">Ocena</router-link>
        <router-link class="link" to="/history">Historia</router-link>
        <a class="link" href="https://youtube.com" target="_blank">YouTube</a>
      </div>
      <div v-else>
        <q-btn id="menu-btn" round icon="menu" @click="toggleDrawer"></q-btn>
        <q-drawer
          v-model="isDrawerVisible"
          side="right"
          show-if-above
          :width="200"
          elevated
          dark
          class="flex column items-center"
        >
          <h1 :style="{ fontSize: '2rem' }">Menu</h1>
          <router-link class="link" to="/">Ocena</router-link>
          <router-link class="link" to="/history">Historia</router-link>
          <a class="link" href="https://youtube.com" target="_blank">YouTube</a>
        </q-drawer>
      </div>
    </q-toolbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TheHeader',
  setup() {
    const isDrawerVisible = ref<boolean>(false);

    const toggleDrawer = () => {
      isDrawerVisible.value = !isDrawerVisible.value;
    };

    return {
      isDrawerVisible,
      toggleDrawer,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

.nav {
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  height: 10vh;
  z-index: 1000;

  .logo {
    font-size: 1.2rem;
    text-decoration: none;
    color: #ccc;
  }

  .link {
    text-decoration: none;
    color: #ccc;
    font-weight: 300;
    margin: 2% auto;
    padding-bottom: 5px;
    position: relative;
    transition: 0.1s;
    text-align: center;
    width: 70%;
  }

  .link::before {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: red;
    transition: 0.3s;
  }

  .link:hover::before {
    width: 100%;
  }

  .toolbar {
    background: $dark-2;
    font-size: 1.3rem;
  }

  .router-link-active {
    color: white;
    font-weight: 400;
  }
}

@media (min-width: $breakpoint-sm-min) {
  .nav {
    .toolbar {
      font-size: 1rem;
    }
    .link {
      width: fit-content;
      margin: 0 1rem;
    }
  }
}
</style>
