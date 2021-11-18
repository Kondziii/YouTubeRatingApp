<template>
  <q-dialog v-model="isVisible">
    <q-card class="card">
      <q-card-section class="section">
        <div class="text-h5">Wybrałeś kanał:</div>
      </q-card-section>
      <q-separator dark></q-separator>
      <q-card-section
        class="q-pt-none flex column justify-center items-center q-mt-md"
        :style="{ minHeight: '300px' }"
      >
        <div class="row flex column items-center q-mb-sm">
          <q-avatar class="avatar">
            <q-img :src="channel.snippet.thumbnails.default.url"></q-img>
          </q-avatar>
          <h6 class="highlight">{{ channel.snippet.title }}</h6>
        </div>
        <div class="row q-gutter-lg">
          <div class="flex column items-center">
            <p class="highlight">{{ channel.statistics.subscriberCount }}</p>
            <label>Subskrybenci</label>
          </div>
          <div class="flex column items-center">
            <p class="highlight">{{ channel.statistics.videoCount }}</p>
            <label>Filmiki</label>
          </div>
        </div>
        <div :style="{ width: '100%' }" class="row justify-start q-mt-md">
          <p>Kanał został utworzony:{{ ' ' }}{{ beginDate }}</p>
        </div>
        <div
          v-if="!!channel.snippet.description"
          class="row q-mt-md"
          :style="{ textAlign: 'justify' }"
        >
          <p>{{ channel.snippet.description }}</p>
        </div>

        <div class="row q-mt-md" :style="{ width: '100%' }">
          Teraz możesz zmodyfikować ustawienia i przejść do oceny!
        </div>
      </q-card-section>
      <q-separator dark></q-separator>
      <q-card-actions
        align="right"
        class="section q-px-xs-sm q-px-sm-md q-py-md"
      >
        <a
          target="_blank"
          :href="linkToChannel"
          :style="{ textDecoration: 'none' }"
        >
          <q-btn id="yt" color="red" flat icon-right="fab fa-youtube">
            Zobacz w</q-btn
          >
        </a>
        <q-btn label="Rozumiem" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed } from 'vue';
import { useStore } from '@/store/index';
import { ChannelFullInfo } from '@/types/Channel';

export default defineComponent({
  name: 'ConfirmChannelInfoModal',

  emits: ['close'],

  setup(_, { emit }) {
    const store = useStore();
    const isVisible = ref<boolean>(true);

    const channel = computed<ChannelFullInfo>(() => {
      return store.getters['channel/getConfirmedChannel'];
    });

    const beginDate = computed<string>(() =>
      new Date(channel.value.snippet.publishedAt).toLocaleDateString()
    );

    const linkToChannel = computed<string>(
      () => `https://www.youtube.com/channel/${channel.value.id}`
    );

    watch(isVisible, () => {
      emit('close');
    });

    return {
      isVisible,
      channel,
      beginDate,
      linkToChannel,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

.card {
  @include card($dark-2);
  overflow: auto;
  margin: 5% auto;
  min-width: 300px;
  font-size: 1em;
}

.avatar {
  width: 130px;
  height: auto;
}

.section {
  background: $dark-3;
}

div > div > p {
  margin-bottom: 0;
}

.highlight {
  font-size: 1.4em;
  font-weight: bold;
}

.text-h5 {
  font-size: 20px;
}

@media (min-width: $breakpoint-xs-max) {
  .card {
    min-width: 400px;
    font-size: 1.1em;
  }
}

@media (min-width: $breakpoint-sm-max) {
  .text-h5 {
    font-size: 24px;
  }
}
</style>
