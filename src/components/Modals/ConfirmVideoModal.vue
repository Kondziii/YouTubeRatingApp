<template>
  <confirm-modal-basic>
    <template #items>
      <p>elo</p>
    </template>
  </confirm-modal-basic>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ConfirmModalBasic from '@/components/Modals/ConfirmModalBasic.vue';
import Video from '@/types/Video';

export default defineComponent({
  name: 'ConfirmVideoModal',

  components: {
    ConfirmModalBasic,
  },

  props: {
    videos: {
      type: Array as PropType<Video[]>,
      required: true,
    },

    selectedItemId: {
      type: String,
      required: false,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped></style>
