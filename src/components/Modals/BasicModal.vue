<template>
  <q-dialog
    v-model="isVisible"
    transition-show="scale"
    transition-hide="scale"
    transition-duration="500"
  >
    <q-card class="card">
      <q-card-section>
        <div class="text-h5">{{ title }}</div>
      </q-card-section>

      <q-card-section v-if="!htmlMessage" class="q-pt-none">
        {{ message }}
      </q-card-section>
      <q-card-section v-else class="q-pt-none" v-html="message">
      </q-card-section>

      <q-card-actions align="right" class="q-mx-xs-sm q-mx-sm-md q-mb-sm">
        <q-btn v-if="!confirm" label="Rozumiem" color="red" v-close-popup />
        <div v-else>
          <q-btn flat label="Nie" color="red" v-close-popup />
          <q-btn
            class="q-ml-sm"
            label="Tak"
            color="red"
            v-close-popup
            @click="confirmEmit"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    confirm: {
      type: Boolean,
      default: false,
      required: false,
    },
    htmlMessage: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  emits: ['close', 'confirm'],

  setup(_, context) {
    const isVisible = ref<boolean>(true);

    watch(isVisible, () => {
      context.emit('close');
    });

    const confirmEmit = () => {
      context.emit('confirm');
    };

    return {
      isVisible,
      confirmEmit,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

.card {
  @include card($dark-2);
  min-width: 300px;
}
</style>
