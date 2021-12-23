<template>
  <div>
    <header class="q-pa-lg text-center">
      <h1>Evaluation result</h1>
    </header>
    <evaluate-banner :vote="'neutral'"></evaluate-banner>
  </div>
</template>

<script lang="ts">
import { Sentiment } from '@/types/Sentiment';
import { defineComponent, PropType } from 'vue';
import EvaluateBanner from '@/components/Evaluate/EvaluateBanner.vue';

export default defineComponent({
  name: 'EvaluateVideoResult',

  components: {
    EvaluateBanner,
  },

  props: {
    result: {
      type: Object as PropType<Sentiment>,
      required: true,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import './src/styles/quasar.variables.scss';

header h1 {
  @include header();
}
</style>
