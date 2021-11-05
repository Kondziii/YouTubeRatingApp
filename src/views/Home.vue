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
        <div :style="{ width: '90%', margin: '0 auto' }">
          <router-view></router-view>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue';
// import TheForm from '@/components/Home/TheForm.vue';
import TheHeader from '@/components/Home/TheHeader.vue';

export default defineComponent({
  name: 'Home',

  components: { TheHeader },

  setup() {
    return {};
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
}

.my-card {
  border-radius: 15px;
  box-shadow: 2px 4px rgba(255, 255, 255, 0.5);
  margin: 3em 1em;
  overflow: hidden;
}

.selection-container {
  width: 80%;
  margin: 0 auto;
}

.tab {
  border-radius: 25px;
}

a {
  text-decoration: none;
  color: white;
  width: 100%;
  background: $red-11;
}

.router-link-active {
  background: $red;
}
</style>
