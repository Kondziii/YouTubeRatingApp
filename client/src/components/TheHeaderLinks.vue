<template>
  <router-link class="link" to="/">Ocena</router-link>
  <router-link class="link" to="/learn-more">Pomoc</router-link>
  <router-link class="link" to="/history">Historia</router-link>
  <a class="link" href="https://youtube.com" target="_blank">YouTube</a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheHeaderLinks',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import './src/styles/quasar.variables.scss';
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

.router-link-active {
  color: white;
  font-weight: 400;
}

@media (min-width: $breakpoint-sm-min) {
  .link {
    width: fit-content;
    margin: 0 1rem;
  }
}
</style>
