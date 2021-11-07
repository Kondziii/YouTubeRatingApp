<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div class="container row">
      <div class="col-xs-12 col-sm-10 col-md-8 col-xl-6">
        <q-card :class="type">
          <slot></slot>
        </q-card>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BasicContainer',

  props: {
    type: {
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
@import '/src/styles/quasar.variables.scss';

.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // backdrop-filter: contrast(120%);
}

.card--transparent {
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 1em rgba(255, 255, 255, 0.4);
  margin: 2em 1em;
  overflow: hidden;
  color: $grey-3;
}
</style>
