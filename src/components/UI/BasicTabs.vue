<template>
  <section class="selection-container">
    <q-tabs style="height: 100%" class="tab" align="justify">
      <router-link :to="tab.to" v-for="tab in items" :key="tab.label"
        ><q-tab :label="tab.label" :value="tab.value"
      /></router-link>
    </q-tabs>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Tab from '@/types/Tab';

export default defineComponent({
  name: 'BasicTabs',

  props: {
    items: {
      type: Array as PropType<Tab[]>,
      required: true,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

.selection-container {
  width: 90%;
  margin: 0 auto;
}

.tab {
  border-radius: 25px;
}

a {
  text-decoration: none;
  color: #eee;
  width: 100%;
  background: $red-4;
}

.router-link-active {
  background: $red;
  color: white;
}
</style>
