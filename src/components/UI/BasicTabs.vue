<template>
  <section class="selection-container">
    <q-tabs style="height: 100%" class="tab" align="justify" v-model="currTab">
      <q-tab
        v-for="tab in items"
        :name="tab.value"
        :key="tab.label"
        :label="tab.label"
        :value="tab.value"
      />
    </q-tabs>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import Tab from '@/types/Tab';
import Evaluate from '@/types/Evaluate';

export default defineComponent({
  name: 'BasicTabs',

  emits: ['select'],

  props: {
    items: {
      type: Array as PropType<Tab[]>,
      required: true,
    },
    selectedTab: {
      type: String as PropType<Evaluate>,
      required: true,
    },
  },

  setup(props, context) {
    const currTab = ref<string>(props.selectedTab);

    watch(currTab, (currVal) => {
      context.emit('select', currVal);
    });

    return {
      currTab,
    };
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

.q-tab {
  text-decoration: none;
  color: #eee;
  width: 100%;
  background: $red-4;
}

.q-tab--active {
  background: $red;
  color: white;
}
</style>
