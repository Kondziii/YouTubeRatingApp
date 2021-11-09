<template>
  <basic-container type="card--transparent">
    <the-header></the-header>
    <basic-tabs :items="items"></basic-tabs>
    <router-view :selectedTab="selectedTab" :key="route.path"></router-view>
  </basic-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import TheHeader from '@/components/Home/TheHeader.vue';
import { useRoute } from 'vue-router';
import BasicTabs from '@/components/UI/BasicTabs.vue';
import Tab from '@/types/Tab';

export default defineComponent({
  name: 'Home',

  components: { TheHeader, BasicTabs },

  setup() {
    const route = useRoute();
    const selectedTab = computed(() =>
      route.path.includes('/evaluate/videos') ? 'videos' : 'channels'
    );
    const items: Array<Tab> = [
      {
        label: 'Kanały',
        value: 'channels',
        to: '/evaluate/channels',
      },
      {
        label: 'Filmiki',
        value: 'videos',
        to: '/evaluate/videos',
      },
    ];

    return {
      selectedTab,
      route,
      items,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

// .card {
//   width: 100%;
//   height: 100%;
//   border-radius: 15px;
//   background: rgba(0, 0, 0, 0.7);
//   box-shadow: 0 0 1em rgba(255, 255, 255, 0.4);
//   margin: 2em 1em;
//   overflow: hidden;
//   color: $grey-3;
// }

// .selection-container {
//   width: 90%;
//   margin: 0 auto;
// }

// .tab {
//   border-radius: 25px;
// }

// a {
//   text-decoration: none;
//   color: #eee;
//   width: 100%;
//   background: $red-4;
// }

// .router-link-active {
//   background: $red;
//   color: white;
// }

@media (min-width: $breakpoint-xs-max) {
  .selection-container {
    width: 80%;
  }
  .container {
    font-size: 17px;
  }
}

@media (min-width: $breakpoint-sm-max) {
  .container {
    font-size: 18px;
  }
}
</style>
