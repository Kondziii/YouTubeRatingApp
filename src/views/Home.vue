<template>
  <div class="container">
    <the-form></the-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheForm from '@/components/Home/TheForm.vue';

export default defineComponent({
  name: 'Home',

  components: { TheForm },

  setup() {
    return {};
  },
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
