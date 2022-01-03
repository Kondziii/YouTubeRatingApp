<template>
  <div
    :style="{ fontSize: '0.9rem', color: '#ccc' }"
    class="flex column justify-start q-mt-lg"
  >
    <p :style="{ marginBottom: '4px' }">
      Evaluation was processed according to following settings:
    </p>
    <ul class="q-pl-lg">
      <li v-if="authorAnswers === true">
        Author answers were taken into account.
      </li>
      <li v-else-if="authorAnswers === false">
        Author answers weren't taken into account.
      </li>
      <li v-if="subcomments === true">Subcomments were processed.</li>
      <li v-else-if="subcomments === false">Subcomments weren't processed.</li>
      <li v-if="useTime === false">
        The channel was evaluated from the published time (i.e. {{ beginDate }})
        to current day (i.e. {{ endDate }}).
      </li>
      <li v-else-if="useTime === true">
        The channel was evaluated from {{ beginDate }} to {{ endDate }}.
      </li>
      <li v-if="commentsLimit">
        The videos below {{ commentsLimit }} were excluded from the result
        outcome.
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EvaluateParams',

  props: {
    authorAnswers: {
      type: Boolean,
      required: false,
    },

    subcomments: {
      type: Boolean,
      required: false,
    },

    useTime: {
      type: [Boolean, String],
      required: false,
      default: 'noTime',
    },

    beginDate: {
      type: String,
      required: false,
    },

    endDate: {
      type: String,
      required: false,
    },

    commentsLimit: {
      type: Number,
      required: false,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped></style>
