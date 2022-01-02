<template>
  <div>
    <header class="q-pa-lg text-center">
      <h1>Result</h1>
    </header>
    <evaluate-banner :vote="result.vote"></evaluate-banner>
    <q-card-section>
      <div class="row q-mt-sm q-mb-xl justify-center items-center">
        <div
          class="col-xs-12 col-sm-6 col-md-3"
          v-for="(video, key, index) in result.videosCount"
          :key="video"
        >
          <evaluate-badge
            :style="{ position: 'relative' }"
            :value="video"
            :title="key"
            subtitle="videos"
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
            :style="{ position: 'relative' }"
            :value="parseFloat(result.videosAvg.compound.toFixed(3))"
            title="score"
            subtitle="videos"
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
            :values="result.videosVoteCount"
            title="Classified videos amount"
            :backgroundColor="backgroundColorVideos"
            :hoverBackgroundColor="hoverBackgroundColorVideos"
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
    </q-card-section>
    <q-card-actions class="flex justify-end q-pa-lg">
      <q-btn color="red" flat @click="saveChannelResult">Save</q-btn>
      <q-btn color="red" :to="{ name: 'Home' }" replace>Close</q-btn>
      <!-- <q-btn  color="red" @click="$router.go(-1)">Close</q-btn> -->
    </q-card-actions>
  </div>
</template>

<script lang="ts">
import { ChannelSentiment } from '@/types/Sentiment';
import { computed, defineComponent, PropType } from 'vue';
import EvaluateBanner from '@/components/Evaluate/EvaluateBanner.vue';
import EvaluateBadge from '@/components/Evaluate/EvaluateBadge.vue';
import BasicToolbar from '@/components/UI/BasicToolbar.vue';
import EvaluateChart from '@/components/Evaluate/EvaluateChart.vue';

export default defineComponent({
  name: 'EvaluateChannelResult',

  props: {
    result: {
      type: Object as PropType<ChannelSentiment>,
      required: true,
    },
  },

  components: {
    EvaluateBanner,
    EvaluateBadge,
    BasicToolbar,
    EvaluateChart,
  },

  setup(props, { emit }) {
    const tooltipsContent = [
      'The number of all videos that were passed to the evaluation process.',
      'The number of videos that were processed and match to the evaluation process settings.',
      'The number of videos that were excluded from the evaluation due to not matching to evaluation process settings.',
      `The "score" is the result of evaluation process, it's an average value coming from the evaluation each video separately. The value of "score" could be between -1 and 1. It can be interpreted as if the score is closer to first, the channel is perceived more negative and for the later similarly but more positive. `,
      'The chart displays number of videos that were classified as very positive, positive, very, negative, negative or neutral based on score gained from sentiment analysis of the video comments.',
      `The chart shows the average content of the comment in percentage with division on positive neutral and negative words. It can be also interpreted as words of processed comments that were classified to proper class i.e. positive, neutral and negative.`,
    ];

    const isResultKnown = computed(() => {
      return props.result.vote !== 'unknown';
    });

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

    const backgroundColorVideos = [
      'rgb(14, 117, 32)',
      'rgb(18, 155, 41)',
      'rgb(201, 174, 20)',
      'rgb(194, 54, 26)',
      'rgb(146, 40, 19)',
    ];
    const hoverBackgroundColorVideos = [
      'rgba(14, 117, 32, 0.9)',
      'rgba(18, 155, 41, 0.9)',
      'rgba(201, 174, 20, 0.9)',
      'rgba(194, 54, 26, 0.9)',
      'rgba(146, 40, 19, 0.9)',
    ];

    const saveChannelResult = () => {
      emit('save');
    };

    const avgValues = computed(() => {
      const pom = { ...props.result.videosAvg } as {
        positive: number;
        neutral: number;
        negative: number;
        compound?: number;
      };
      delete pom.compound;
      Object.keys(pom).forEach((key) => {
        pom[key] = (pom[key] * 100).toFixed(2);
      });

      return pom;
    });

    return {
      tooltipsContent,
      isResultKnown,
      backgroundColor,
      hoverBackgroundColor,
      backgroundColorVideos,
      hoverBackgroundColorVideos,
      saveChannelResult,
      avgValues,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

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
