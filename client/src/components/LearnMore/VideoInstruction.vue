<template>
  <basic-instruction model="video">
    <template #title-img>
      <q-img
        class="title-img"
        src="../../assets/title-video-mobile.png"
      ></q-img>
    </template>
    <template #url-img>
      <q-img class="url-img" src="../../assets/url-video-mobile.png"></q-img>
    </template>
    <template #links>
      <p>
        You can find address url in YouTube after playing the video. It should
        look similar to the examples below.
      </p>
      <ul class="nested wrap-text q-mb-md">
        <li>
          https://www.youtube.com/watch?v=DLBgtb4nqnQ&t=3s&ab_channel=GoogleDevelopers
          (recommended)
        </li>
        <li>v=DLBgtb4nqnQ</li>
      </ul>
    </template>
    <template #advanced-settings>
      <ul class="nested q-mb-md">
        <li class="q-mb-xs">
          <span style="font-weight: bold">Take subcomments into account </span>
          - default yes, it means that answers for comments will also take part
          in evaluation
        </li>
        <li class="q-mb-xs">
          <span style="font-weight: bold"
            >Take author's answers into account</span
          >
          - default no, it means that answers for comments written by the author
          of video will be excluded from evaluation.
        </li>
      </ul>
    </template>
    <template #time-warn>
      <p>
        Evaluation process may last for a while depending on the degree of
        channel expansion so be patient and don't close the app.
      </p>
    </template>
  </basic-instruction>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BasicInstruction from '@/components/LearnMore/BasicInstruction.vue';

export default defineComponent({
  components: { BasicInstruction },
  name: 'VideoInstruction',

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';
@import 'src/styles/instruction';

@media (min-width: $breakpoint-sm-min) {
  .title-img {
    content: url('../../assets/title-video.png');
  }
  .url-img {
    content: url('../../assets/url-video.png');
  }
}
</style>
