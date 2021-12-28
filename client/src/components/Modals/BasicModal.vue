<template>
  <q-dialog
    v-model="isVisible"
    transition-show="scale"
    transition-hide="scale"
    transition-duration="500"
  >
    <q-card class="card">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section v-if="!htmlMessage" class="q-pt-none">
        {{ message }}
      </q-card-section>
      <q-card-section v-else class="q-pt-none" v-html="message">
      </q-card-section>

      <q-card-actions align="right" class="q-mx-xs-sm q-mx-sm-md q-mb-sm">
        <q-btn v-if="!confirm" label="OK" color="red" v-close-popup />
        <div v-else>
          <q-btn flat label="No" color="red" v-close-popup />
          <q-btn
            class="q-ml-sm"
            label="Yes"
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
      if (resolveModal.value) {
        resolveModal.value(false);
      }
    });

    const resolveModal = ref<
      ((value: boolean | PromiseLike<boolean>) => void) | null
    >(null);

    const confirmEmit = () => {
      context.emit('confirm');
      if (resolveModal.value) {
        resolveModal.value(true);
      }
    };

    const getConfirm = () => {
      return new Promise<boolean>((resolve) => {
        resolveModal.value = resolve;
      });
    };

    return {
      isVisible,
      confirmEmit,
      getConfirm,
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

@media (min-width: $breakpoint-xs-max) {
  .card {
    min-width: 400px;
  }
}
</style>
