<template>
  <transition name="expand" appear>
    <div :class="bannerClass" :style="{ width: '100%' }">
      <transition
        enter-active-class="animate__animated animate__fadeIn animate__delay-2s "
        appear
      >
        <p class="banner">{{ vote }}</p>
      </transition>
    </div>
  </transition>
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
      else if (props.vote.includes('unknown')) return 'unknown';
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

  .unknown {
    color: $unknown;
    background: $unknown-background;
  }
}

.expand-enter-active {
  animation: expand 2s ease-in;
}

@keyframes expand {
  from {
    opacity: 0;
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
