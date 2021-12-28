<template>
  <div>
    <q-avatar v-bind="$attrs" class="tooltip-container" :icon="icon">
      <q-tooltip
        transition-show="scale"
        transition-hide="scale"
        anchor="top end"
        self="center start"
        class="bg-red text-caption"
        max-width="10rem"
      >
        {{ info }}
      </q-tooltip>
    </q-avatar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BasicToolbar',

  props: {
    icon: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.tooltip-container {
  font-size: 3.5rem;
  width: fit-content;
  height: fit-content;
  color: red;
  position: relative;
}

.tooltip-container::before {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 65%;
  height: 65%;
  border-radius: 50%;
  background: white;
}
</style>
