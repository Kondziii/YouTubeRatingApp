<template>
  <q-card :style="{ background: 'white', padding: '3%', width: '70%' }">
    <p style="font-size: 2rem">
      Now I have to fetch all videos and all video comments of the confirmed
      channel that has id {{ id }}. Afterwards I have to conduct sentiment
      analysis of the comments and hence evaluate channel. This part of
      application hasn't been implemented yet. I've started to working on it.
    </p>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EvaluateChannel',

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped></style>
