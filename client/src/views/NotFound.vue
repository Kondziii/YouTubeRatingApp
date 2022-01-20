<template>
  <basic-container type="card--transparent">
    <q-card-section>
      <h4 class="text-center">Not found</h4>
    </q-card-section>
    <q-separator dark />
    <q-card-section class="flex justify-center column items-center">
      <p class="text-center">The address you are looking for doesn't exist.</p>
      <q-btn type="button" class="q-ma-md" color="red" :to="{ name: 'Home' }"
        >Go to homepage</q-btn
      >
    </q-card-section>
  </basic-container>
</template>

<script lang="ts">
import BasicContainer from '@/components/UI/BasicContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { BasicContainer },
  name: 'NotFound',
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
