<template>
  <q-card :style="{ background: 'white', padding: '3%', width: '70%' }">
    <p style="font-size: 2rem">
      Now I have to fetch all comments of video with id {{ id }} and then
      conduct sentiment analysis. This part application hasn't been implemented
      yet as well.
    </p>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EvaluateVideo',

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
