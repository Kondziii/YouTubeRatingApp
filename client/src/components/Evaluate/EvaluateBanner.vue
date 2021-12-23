<template>
  <div :style="{ width: '100%' }">
    <p :class="['banner', bannerClass]">{{ vote }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'EvaluateBanner',

  props: {
    vote: {
      type: String,
      required: true,
      validate: (value: string) => {
        return (
          [
            'very positive',
            'positive',
            'neutral',
            'negative',
            'very negative',
          ].indexOf(value) !== -1
        );
      },
    },
  },
  setup(props) {
    const bannerClass = computed(() => {
      if (props.vote.includes('positive')) return 'positive';
      else if (props.vote.includes('neutral')) return 'neutral';
      else return 'negative';
    });

    return {
      bannerClass,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './src/styles/quasar.variables.scss';

div {
  .banner {
    line-height: 7rem;
    font-size: 3rem;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .positive {
    color: $positive;
    background: $positive-background;
  }

  .neutral {
    color: $neutral;
    background: $neutral-background;
  }

  .negative {
    color: $negative;
    background: $negative-background;
  }
}
</style>
