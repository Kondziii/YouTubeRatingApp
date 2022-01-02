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
      <li v-else>Author answers weren't taken into account.</li>
      <li v-if="subcomments === true">Subcomments were processed.</li>
      <li v-else>Subcomments weren't processed.</li>
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
  },

  setup() {
    return {};
  },
});
</script>

<style scoped></style>
