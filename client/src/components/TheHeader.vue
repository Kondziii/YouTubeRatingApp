<template>
  <div class="nav">
    <q-toolbar class="toolbar text-white shadow-2 rounded-borders q-px-xl">
      <router-link :style="{ color: 'white !important' }" class="logo" to="/"
        >YouTubeRateApp
      </router-link>
      <q-space />
      <div v-if="!$q.screen.xs">
        <the-header-links></the-header-links>
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
          <the-header-links></the-header-links>
        </q-drawer>
      </div>
    </q-toolbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TheHeaderLinks from '@/components/TheHeaderLinks.vue';

export default defineComponent({
  name: 'TheHeader',

  components: {
    TheHeaderLinks,
  },
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

  .toolbar {
    background: $dark-2;
    font-size: 1.3rem;
  }
}

@media (min-width: $breakpoint-sm-min) {
  .nav {
    .toolbar {
      font-size: 1rem;
    }
  }
}
</style>
