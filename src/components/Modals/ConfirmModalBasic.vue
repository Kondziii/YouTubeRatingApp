<template>
  <q-dialog
    v-model="is"
    persistent
    transition-show="scale"
    transition-hide="scale"
    transition-duration="500"
  >
    <q-card class="card" style="width: 700px; max-width: 90vw">
      <q-card-section class="flex justify-between">
        <div class="text-h5">Potwierdź swój wybór</div>
        <q-btn id="close" dense icon="close" @click="cancel">
          <q-tooltip>Anuluj</q-tooltip>
        </q-btn>
      </q-card-section>
      <q-separator dark></q-separator>
      <q-scroll-area dark style="height: 50vh; max-width: 100%">
        <q-card-section>
          <slot name="items"></slot>
          <p class="text-center not-found">Nie znaleziono więcej rezultatów</p>
        </q-card-section>
      </q-scroll-area>
      <q-separator dark></q-separator>
      <q-card-section>
        <q-card-actions align="right" class="q-mx-sm q-mb-sm">
          <q-btn flat label="Anuluj" color="red" @click="cancel" />
          <q-btn label="Zatwerdź" color="red" @click="confirm" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ConfirmModalBasic',

  emits: ['confirm', 'cancel'],

  setup(_, context) {
    const is = true;

    const confirm = () => {
      context.emit('confirm');
    };

    const cancel = () => {
      context.emit('cancel');
    };

    return {
      is,
      confirm,
      cancel,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

.card {
  @include card($dark-1);
  margin: 0;

  .modal-actions {
    background: rgba(0, 0, 0, 0.5);
  }

  .not-found {
    font-size: 0.9em;
    margin-top: 5%;
  }
}
</style>
