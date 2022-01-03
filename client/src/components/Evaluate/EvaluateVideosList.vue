<template>
  <div v-if="videosResult.length > 0">
    <h1>{{ title }}</h1>
    <div class="row no-wrap q-ma-sm" :style="{ overflow: 'auto' }" v-dragscroll>
      <div
        class="col-xs-12 col-sm-9 col-md-6 col-xl-4"
        v-for="(result, index) in videosResult"
        :key="result.videoId"
      >
        <div class="img-container">
          <img
            :style="{ width: '100%', height: '40vh', objectFit: 'cover' }"
            :src="result.imageHigh"
            alt=""
          />
          <div class="info">
            <p class="q-ma-sm text-center">{{ result.title }}</p>
            <div
              class="
                evaluate-result
                flex
                justify-center
                items-center
                q-gutter-sm
              "
            >
              <evaluate-badge
                :value="parseFloat(result.avg.compound.toFixed(3))"
                title="score"
                :style="{
                  width: '70px',
                  height: '70px',
                }"
              ></evaluate-badge>
              <q-btn color="red" @click="seeDetailsEmit(index)"
                >See details</q-btn
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Sentiment } from '@/types/Sentiment';
import { defineComponent, PropType } from 'vue';
import EvaluateBadge from '@/components/Evaluate/EvaluateBadge.vue';

export default defineComponent({
  name: 'EvaluateVideosList',

  components: {
    EvaluateBadge,
  },

  props: {
    videosResult: {
      type: Array as PropType<Array<Sentiment>>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  emits: ['seeDetails'],

  setup(props, { emit }) {
    const seeDetailsEmit = (index: string) => {
      emit('seeDetails', props.videosResult[index]);
    };

    return {
      seeDetailsEmit,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

h1 {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 3rem;
}

::-webkit-scrollbar {
  display: none;
}

.img-container {
  position: relative;

  .info {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    transition: 0.5s;
    font-size: 0.8rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &:hover .info {
    height: 100%;
  }

  .evaluate-result {
    display: none;
    transition: 0.5s;
  }
  &:hover .evaluate-result {
    display: flex;
  }
}
</style>
