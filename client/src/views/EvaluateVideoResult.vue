<template>
  <div>
    <header class="q-pa-lg text-center">
      <h1>Evaluation result</h1>
    </header>
    <evaluate-banner :vote="result.vote"></evaluate-banner>
    <q-card-section>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <evaluate-chart
            :values="result.commentVoteCount"
            title="Classified comments amount"
          ></evaluate-chart>
        </div>
        <div class="col-xs-12 col-md-6">
          <evaluate-chart
            :values="avgValues"
            title="Average content of comment [%]"
            percentage
          ></evaluate-chart>
        </div>
      </div>
    </q-card-section>
  </div>
</template>

<script lang="ts">
import { Sentiment } from '@/types/Sentiment';
import { computed, defineComponent, PropType } from 'vue';
import EvaluateBanner from '@/components/Evaluate/EvaluateBanner.vue';
import EvaluateChart from '@/components/Evaluate/EvaluateChart.vue';

export default defineComponent({
  name: 'EvaluateVideoResult',

  components: {
    EvaluateBanner,
    EvaluateChart,
  },

  props: {
    result: {
      type: Object as PropType<Sentiment>,
      required: true,
    },
  },

  setup(props) {
    const avgValues = computed(() => {
      const pom = { ...props.result.avg };
      delete pom.compound;
      Object.keys(pom).forEach((key) => {
        pom[key] = (pom[key] * 100).toFixed(2);
      });
      return pom;
    });

    return {
      avgValues,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './src/styles/quasar.variables.scss';

header h1 {
  @include header();
}
</style>
