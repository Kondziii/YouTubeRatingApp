<template>
  <transition
    appear
    enter-active-class="animate__animated animate__fadeIn animate__delay-2s"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div class="badge-container">
      <p :style="{ margin: '4px 0 0' }">{{ title }}</p>
      <p :style="{ margin: '0 0 4px' }">{{ subtitle }}</p>
      <p class="value">{{ value }}</p>
      <slot></slot>
    </div>
  </transition>
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
    font-size: 1.4rem;
    font-weight: 500;
  }
}
</style>
