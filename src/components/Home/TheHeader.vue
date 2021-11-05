<template>
  <header class="text-center">
    <h2 class="header q-pa-lg">
      Czy chcesz zobaczyć jak odbierany jest kanał lub filmik przez widzów
      portalu
      <a href="https://www.youtube.com/" target="_blank"
        ><img class="logo" src="../../assets/youtube.png"
      /></a>
      na podstawie komentarzy?
    </h2>

    <div class="q-pl-lg q-my-lg">
      <p class="content-header q-pr-xs">
        Jeśli tak to dobrze trafiłeś, wypełnij pole i przejdź do oceny.
      </p>
      <router-link to="/"> Dowiedz się więcej </router-link>
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
  font-size: 1.8em;
  font-weight: 400;
  line-height: 160%;
  background: #eee;
}

.logo {
  height: 30px;
  width: auto;
  margin-left: 5px;
  margin-right: 5px;
  vertical-align: -5px;
}

.content-header {
  font-size: 1.1rem;
  display: inline-block;
}

a {
  color: $red;
  font-size: 1.1rem;
  display: inline-block;
}

a:hover {
  color: $red-14;
}

p {
  margin: 0;
}
</style>
