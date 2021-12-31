<template>
  <q-card-section
    v-if="!finished"
    class="flex column items-center justify-center"
  >
    <p class="wait-title">Be patient, it may take a while.</p>
    <q-spinner-dots color="red" size="3rem" />
  </q-card-section>
  <q-card-section v-else class="flex column items-center justify-center">
    <p class="wait-title">Evaluation has been successfully completed.</p>
    <div :style="{ width: '100%' }" class="flex justify-end">
      <q-btn
        @click="clickEmit"
        class="q-mt-sm"
        color="red"
        :to="{ name: to }"
        replace
        >Show result</q-btn
      >
    </div>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EvaluateWait',

  props: {
    finished: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      required: false,
    },
  },

  emits: ['click'],

  setup(_, { emit }) {
    const clickEmit = () => {
      emit('click');
    };

    return {
      clickEmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.wait-title {
  font-size: 1rem;
  font-weight: 300;
  font-style: italic;
  margin: 0;
}
</style>
