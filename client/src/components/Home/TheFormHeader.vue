<template>
  <header class="text-center">
    <h2 class="header q-pa-lg">
      Czy chcesz zobaczyć jak odbierany jest kanał lub filmik przez widzów
      portalu
      <a href="https://www.youtube.com/" target="_blank"
        ><img class="logo" src="../../assets/logo-yt.png"
      /></a>
      na podstawie komentarzy?
    </h2>
    <q-separator dark />
    <div class="q-px-sm q-my-lg">
      <p class="content-header q-pr-xs">
        Jeśli tak to dobrze trafiłeś, wypełnij pole i przejdź do oceny.
      </p>
      <router-link to="/learn-more"> Dowiedz się więcej </router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheFormHeader',

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

.header {
  @include header();
}

.logo {
  height: 35px;
  width: auto;
  margin-left: 5px;
  margin-right: 5px;
  vertical-align: -8px;
}

.content-header {
  font-size: 1.1rem;
  margin: 0 5px;
  display: inline-block;
}

a {
  @include link;
}

p {
  margin: 0;
}

@media (min-width: $breakpoint-xs-max) {
  .logo {
    height: 40px;
    vertical-align: -10px;
  }
}

@media (min-width: $breakpoint-sm-max) {
  .logo {
    height: 40px;
    vertical-align: -12px;
  }
}
</style>
