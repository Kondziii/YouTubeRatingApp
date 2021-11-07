<template>
  <div class="container row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-xl-6 card-container">
      <q-card class="my-card">
        <the-header></the-header>
        <section class="selection-container">
          <q-tabs class="tab" align="justify">
            <router-link :to="'/evaluate/channels'"
              ><q-tab name="channels" label="Kanały" value="channels"
            /></router-link>
            <router-link :to="'/evaluate/videos'"
              ><q-tab name="videos" label="Filmiki" value="videos"
            /></router-link>
          </q-tabs>
        </section>
        <router-view :selectedTab="selectedTab" :key="route.path"></router-view>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import TheHeader from '@/components/Home/TheHeader.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Home',

  components: { TheHeader },

  setup() {
    const route = useRoute();
    const selectedTab = computed(() =>
      route.path.includes('/evaluate/videos') ? 'videos' : 'channels'
    );

    return {
      selectedTab,
      route,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: contrast(120%);
}

.my-card {
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 1em rgba(255, 255, 255, 0.4);
  margin: 2em 1em;
  overflow: hidden;
  color: $grey-3;
}

.selection-container {
  width: 90%;
  margin: 0 auto;
}

.tab {
  border-radius: 25px;
}

a {
  text-decoration: none;
  color: #eee;
  width: 100%;
  background: $red-4;
}

.router-link-active {
  background: $red;
  color: white;
}

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
