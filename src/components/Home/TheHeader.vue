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
  name: 'TheHeader',

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

.header {
  font-size: 1.5em;
  font-weight: 400;
  line-height: 160%;
}

.logo {
  height: 25px;
  width: auto;
  margin-left: 5px;
  margin-right: 5px;
  vertical-align: -7px;
}

.content-header {
  font-size: 1em;
  margin: 0 5px;
  display: inline-block;
}

a {
  color: $red;
  font-size: 1em;
  display: inline-block;
  transition: 0.3s;
}

a:hover {
  color: $red-14;
}

p {
  margin: 0;
}

@media (min-width: $breakpoint-xs-max) {
  .logo {
    height: 30px;
    vertical-align: -7px;
  }
}

@media (min-width: $breakpoint-sm-max) {
  .logo {
    height: 40px;
    vertical-align: -10px;
  }
}
</style>
