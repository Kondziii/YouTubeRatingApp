<template>
  <q-layout class="root">
    <div class="background" />
    <the-header></the-header>
    <router-view v-slot="slotProps">
      <transition
        enter-active-class="animate__animated animate__fadeInUp"
        mode="out-in"
      >
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
    <the-footer></the-footer>
    <basic-modal
      v-if="error.is"
      :title="error.title"
      :message="error.message"
      @close="hideErrorModal"
    ></basic-modal>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import TheFooter from '@/components/TheFooter.vue';
import { useStore } from '@/store/index';
import BasicModal from '@/components/Modals/BasicModal.vue';
import { useErrorActions } from '@/store/error/actions';
import TheHeader from '@/components/TheHeader.vue';

export default defineComponent({
  components: {
    TheFooter,
    BasicModal,
    TheHeader,
  },

  setup() {
    const store = useStore();
    const errorActions = useErrorActions();
    const error = computed(() => {
      return store.getters['error/getError'];
    });
    const hideErrorModal = () => {
      store.dispatch(errorActions.setError, {
        is: false,
        title: '',
        message: '',
      });
    };

    return {
      error,
      hideErrorModal,
    };
  },
});
</script>

<style lang="scss">
@import '/src/styles/quasar.variables.scss';

:root {
  font-size: 14px;
}

.root {
  width: 100%;
  min-height: 100vh !important;
  overflow: hidden;
  position: relative;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url('./assets/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.background::before {
  content: '';
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

.q-field__label {
  font-size: 0.85em !important;
}

.q-btn .q-icon {
  font-size: 1rem !important;
}

#close .q-icon {
  margin: 0 !important;
}

#details .q-icon,
#clear .q-icon {
  margin: 0 !important;
  font-size: 1.2rem !important;
}

@media (min-width: $breakpoint-md-min) {
  .q-field__label {
    font-size: 0.9em !important;
  }

  #yt .q-icon {
    margin-left: 6px !important;
  }
}

@media (min-width: $breakpoint-xs-max) {
  .selection-container {
    width: 80%;
  }
  :root {
    font-size: 16px;
  }
}

@media (min-width: $breakpoint-sm-max) {
  :root {
    font-size: 18px;
  }
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}
</style>
