<template>
  <header class="q-pa-lg text-center">
    <h1>{{ title }}</h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EvaluateHeader',

  props: {
    title: {
      type: String,
      required: true,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';
h1 {
  @include header();
}
</style>
