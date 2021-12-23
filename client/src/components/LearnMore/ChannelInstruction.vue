<template>
  <basic-instruction model="channel">
    <template #title-img>
      <q-img
        class="title-img"
        src="../../assets/title-channel-mobile.png"
      ></q-img>
    </template>
    <template #url-img>
      <q-img class="url-img" src="../../assets/url-channel-mobile.png"></q-img>
    </template>
    <template #links>
      <p>
        Url addresses may look differently. Below you can find examples that are
        valid with the app format requirements.
      </p>
      <ul class="nested wrap-text q-mb-md">
        <li>
          https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg (recommended)
        </li>
        <li>https://www.youtube.com/c/TheNetNinja</li>
        <li>https://www.youtube.com/googlecode</li>
      </ul>
    </template>
    <template #advanced-settings>
      <ul class="nested q-mb-md">
        <li class="q-mb-xs">
          <span style="font-weight: bold">Minimal comments amount</span> - it's
          the threshold, channel's videos that has less comments than this value
          will be excluded from the sentiment analysis in order to make analysis
          more reliable.
        </li>
        <li class="q-mb-xs">
          <span style="font-weight: bold">Default/custom date frames</span> - in
          default case all videos of channel will be passed to the evaluation
          process, in the latter case some videos that aren't within entered
          dates will be excluded
        </li>
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
          of channel will be excluded from evaluation.
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
  name: 'ChannelInstruction',

  components: {
    BasicInstruction,
  },

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
    content: url('../../assets/title-channel.png');
  }
  .url-img {
    content: url('../../assets/url-channel.png');
  }
}
</style>
