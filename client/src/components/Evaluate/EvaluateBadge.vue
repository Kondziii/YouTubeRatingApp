<template>
  <div class="badge-container" v-bind="$attrs">
    <p v-if="title" :style="{ margin: '4px 0 0' }">{{ title }}</p>
    <p v-if="subtitle" :style="{ margin: '0 0 4px' }">{{ subtitle }}</p>
    <p class="value q-ma-none">{{ value }}</p>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EvaluateBadge',

  props: {
    value: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    subtitle: {
      type: String,
      required: false,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.badge-container {
  box-sizing: content-box;
  width: 18vh;
  height: 18vh;
  border-radius: 50%;
  border: solid 5px rgba(#ccc, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px auto;

  .value {
    font-size: 1.4em;
    font-weight: 500;
  }
}
</style>
