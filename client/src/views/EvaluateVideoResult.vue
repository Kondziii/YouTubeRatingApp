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
            subtitle="comments"
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
            subtitle="comments"
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
      <div class="row" v-if="isResultKnown">
        <div
          class="col-xs-12 col-md-6 q-mb-md"
          :style="{ position: 'relative' }"
        >
          <evaluate-chart
            :values="result.commentVoteCount"
            title="Classified comments amount"
            :backgroundColor="backgroundColor"
            :hoverBackgroundColor="hoverBackgroundColor"
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
            title="Classified words [%]"
            :backgroundColor="backgroundColor"
            :hoverBackgroundColor="hoverBackgroundColor"
            percentage
          ></evaluate-chart>
          <basic-toolbar
            class="tooltip-chart"
            icon="info"
            :info="tooltipsContent[5]"
          ></basic-toolbar>
        </div>
      </div>
      <evaluate-params
        :authorAnswers="result.evaluateParams.useAuthorAnswers"
        :subcomments="result.evaluateParams.useSubcomments"
      ></evaluate-params>
      <div class="flex justify-end">
        <p :style="{ margin: '2rem 0 0', fontSize: '0.9rem', color: '#aaa' }">
          Evaluation was conducted on: {{ evaluationDate }}
        </p>
      </div>
    </q-card-section>
    <q-separator dark></q-separator>
    <q-card-actions class="flex justify-end q-pa-lg">
      <q-btn v-if="!query.history" color="red" flat @click="saveVideoResult"
        >Save</q-btn
      >
      <q-btn v-if="!query.history" color="red" :to="{ name: 'Home' }" replace
        >Close</q-btn
      >
      <q-btn v-else color="red" @click="$router.go(-1)">Close</q-btn>
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
import EvaluateParams from '@/components/Evaluate/EvaluateParams.vue';
import { onBeforeRouteLeave } from 'vue-router';
import BasicModal from '@/components/Modals/BasicModal.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'EvaluateVideoResult',

  components: {
    EvaluateBanner,
    EvaluateChart,
    EvaluateBadge,
    BasicModal,
    EvaluateParams,
  },

  props: {
    result: {
      type: Object as PropType<Sentiment>,
      required: true,
    },
  },

  emits: ['save'],

  setup(props, { emit }) {
    const route = useRoute();
    const query = route.query as unknown as { history: boolean };

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

    const backgroundColor = [
      'rgb(18, 155, 41)',
      'rgb(201, 174, 20)',
      'rgb(194, 54, 26)',
    ];
    const hoverBackgroundColor = [
      'rgba(18, 155, 41, 0.9)',
      'rgba(201, 174, 20, 0.9)',
      'rgba(194, 54, 26, 0.9)',
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
      if (query.history) {
        return true;
      }
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

    const saveVideoResult = () => {
      emit('save');
    };

    const isResultKnown = computed(() => {
      return props.result.vote !== 'unknown';
    });

    return {
      avgValues,
      tooltipsContent,
      modalLeave,
      modal,
      evaluationDate,
      saveVideoResult,
      query,
      isResultKnown,
      backgroundColor,
      hoverBackgroundColor,
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
