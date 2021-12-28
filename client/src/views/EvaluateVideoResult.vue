<template>
  <div>
    <basic-modal
      ref="modal"
      v-if="modalLeave.is"
      :title="modalLeave.title"
      :message="modalLeave.message"
      :confirm="modalLeave.confirm"
      :htmlMessage="modalLeave.htmlMessage"
      @close="modalLeave.cancelHandler"
      @confirm="modalLeave.confirmHandler"
    ></basic-modal>
    <header class="q-pa-lg text-center">
      <h1>Result</h1>
    </header>

    <evaluate-banner :vote="result.vote"></evaluate-banner>
    <q-card-section>
      <div class="row q-mt-sm q-mb-xl justify-center items-center">
        <div
          class="col-xs-12 col-sm-6 col-md-3"
          v-for="(comment, key, index) in result.commentCount"
          :key="comment"
        >
          <evaluate-badge
            :style="{ position: 'relative' }"
            :value="comment"
            :title="key"
          >
            <basic-toolbar
              class="toolbarInfo"
              icon="info"
              :info="tooltipsContent[index]"
            ></basic-toolbar>
          </evaluate-badge>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <evaluate-badge
            :value="parseFloat(result.avg.compound.toFixed(3))"
            title="score"
            :style="{ position: 'relative' }"
          >
            <basic-toolbar
              class="toolbarInfo"
              icon="info"
              :info="tooltipsContent[3]"
            ></basic-toolbar>
          </evaluate-badge>
        </div>
      </div>
      <div class="row">
        <div
          class="col-xs-12 col-md-6 q-mb-md"
          :style="{ position: 'relative' }"
        >
          <evaluate-chart
            :values="result.commentVoteCount"
            title="Classified comments amount"
          ></evaluate-chart>
          <basic-toolbar
            class="tooltip-chart"
            icon="info"
            :info="tooltipsContent[4]"
          ></basic-toolbar>
        </div>
        <div class="col-xs-12 col-md-6" :style="{ position: 'relative' }">
          <evaluate-chart
            :values="avgValues"
            title="Average content of comment [%]"
            percentage
          ></evaluate-chart>
          <basic-toolbar
            class="tooltip-chart"
            icon="info"
            :info="tooltipsContent[5]"
          ></basic-toolbar>
        </div>
      </div>
      <div class="flex justify-end">
        <p :style="{ margin: '2rem 0 0', fontSize: '0.9rem', color: '#aaa' }">
          Analiza zakończona została: {{ evaluationDate }}
        </p>
      </div>
    </q-card-section>
    <q-separator dark></q-separator>
    <q-card-actions class="flex justify-end q-pa-lg">
      <q-btn color="red" flat>Save</q-btn>
      <q-btn color="red" :to="{ name: 'Home' }">Close</q-btn>
    </q-card-actions>
  </div>
</template>

<script lang="ts">
import { Sentiment } from '@/types/Sentiment';
import {
  computed,
  defineComponent,
  nextTick,
  PropType,
  reactive,
  ref,
} from 'vue';
import EvaluateBanner from '@/components/Evaluate/EvaluateBanner.vue';
import EvaluateChart from '@/components/Evaluate/EvaluateChart.vue';
import EvaluateBadge from '@/components/Evaluate/EvaluateBadge.vue';
import { onBeforeRouteLeave } from 'vue-router';
import BasicModal from '@/components/Modals/BasicModal.vue';

export default defineComponent({
  name: 'EvaluateVideoResult',

  components: {
    EvaluateBanner,
    EvaluateChart,
    EvaluateBadge,
    BasicModal,
  },

  props: {
    result: {
      type: Object as PropType<Sentiment>,
      required: true,
    },
  },

  setup(props) {
    const modal = ref<typeof BasicModal>();

    const avgValues = computed(() => {
      const pom = { ...props.result.avg };
      delete pom.compound;
      Object.keys(pom).forEach((key) => {
        pom[key] = (pom[key] * 100).toFixed(2);
      });
      return pom;
    });

    const tooltipsContent = [
      'The total number of comments that was passed to the evaluation.',
      'The amount of comments that took part in evaluation process and contributes to result.',
      'The amount of comments that was excluded from evaluation due to detecting another language or strange characters',
      `The "score" is the result of evaluation process, it's an average sentiment value normalized by the number of words from processed comments. The value of "score" could be between -1 and 1. It can be interpreted as if the score is closer to first the video is perceived more negative and for the later similarly but more positive. `,
      `The chart displays the number of processed comments that was determined as positive, neutral or negative based on computed sentiment value.`,
      `The chart shows the average content of the comment in percentage with division on positive neutral and negative words. It can be also interpreted as words of processed comments that were classified to proper class i.e. positive, neutral and negative.`,
    ];

    const modalLeave = reactive({
      is: false,
      title: 'Warning!',
      message: `<p class="q-mb-xs">Are you sure you want to close the result page?</p>
        <p>The outcome won't be available unless u saved it.</p> `,
      confirm: true,
      htmlMessage: true,
      confirmHandler: () => {
        modalLeave.is = false;
      },
      cancelHandler: () => {
        modalLeave.is = false;
      },
    });

    onBeforeRouteLeave(async () => {
      modalLeave.is = true;
      const answer = await nextTick(async () => {
        if (modal.value) {
          return await modal.value.getConfirm();
        }
      });
      return answer;
    });

    const evaluationDate = computed(() => {
      const date = new Date(props.result.date);

      return date.toLocaleDateString() + ', ' + date.toLocaleTimeString();
    });

    return {
      avgValues,
      tooltipsContent,
      modalLeave,
      modal,
      evaluationDate,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './src/styles/quasar.variables.scss';

h1 {
  @include header();
}

.toolbarInfo {
  position: absolute;
  top: 12px;
  right: -6px;
}

.tooltip-chart {
  position: absolute;
  bottom: 0;
  right: 10%;
}
</style>
