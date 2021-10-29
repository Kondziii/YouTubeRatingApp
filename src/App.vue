<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import yt_api from '@/data/yt_api';

export default defineComponent({
  setup() {
    console.log(process.env.YOUTUBE_API_URL);

    return {};
  },
});
</script>

<style scoped></style>
