<template>
  <q-dialog v-model="isVisible">
    <q-card class="card">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ message }}
      </q-card-section>

      <q-card-actions align="right" class="q-mx-xs-sm q-mx-sm-md q-mb-sm">
        <q-btn label="Rozumiem" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    is: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },

  emits: ['close'],

  setup(props, context) {
    const isVisible = ref<boolean>(true);

    watch(isVisible, () => {
      context.emit('close', !props.is);
    });

    return {
      isVisible,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

.card {
  @include card($dark-2);
}
</style>
