<template>
  <q-dialog v-model="isVisible">
    <q-card class="card">
      <q-card-section class="section">
        <div class="text-h5">Chosen channel:</div>
      </q-card-section>
      <q-separator dark></q-separator>
      <q-scroll-area dark style="height: 50vh; min-width: 100%">
        <q-card-section
          class="q-pt-none flex column justify-between items-center q-mt-md"
          :style="{ paddingBottom: '0', minHeight: '47vh' }"
        >
          <div class="row flex column items-center q-mb-sm">
            <q-avatar class="avatar">
              <q-img :src="channel.image"></q-img>
            </q-avatar>
            <h6 class="highlight">{{ channel.title }}</h6>
          </div>
          <div class="row q-gutter-lg">
            <div class="flex column items-center">
              <p class="highlight">
                {{
                  channel.statistics.subscriberCount
                    ? channel.statistics.subscriberCount
                    : 'unknown'
                }}
              </p>
              <label>Subscribers</label>
            </div>
            <div class="flex column items-center">
              <p class="highlight">
                {{
                  channel.statistics.videoCount
                    ? channel.statistics.videoCount
                    : 'unknown'
                }}
              </p>
              <label>Videos</label>
            </div>
          </div>

          <div
            v-if="!!channel.description"
            class="row q-mt-md"
            :style="{ textAlign: 'justify' }"
          >
            <p>{{ channel.description }}</p>
          </div>
          <div :style="{ width: '100%' }" class="row q-mt-md">
            <p>Published date: {{ beginDate }}</p>
          </div>
          <div class="info row q-mt-md" :style="{ width: '100%' }">
            Now you can change advanced settings and move to evaluation process!
          </div>
        </q-card-section>
      </q-scroll-area>

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
          <q-btn id="yt_2" color="red" flat icon-right="fab fa-youtube">
            View in</q-btn
          >
        </a>
        <q-btn class="q-ml-sm" label="Close" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed } from 'vue';
import { useStore } from '@/store/index';
import { Channel } from '@/types/Channel';

export default defineComponent({
  name: 'ConfirmChannelInfoModal',

  emits: ['close'],

  setup(_, { emit }) {
    const store = useStore();
    const isVisible = ref<boolean>(true);

    const channel = computed<Channel>(() => {
      return store.getters['channel/getConfirmedChannel'];
    });

    const beginDate = computed<string>(() =>
      new Date(channel.value.publishedAt).toLocaleDateString()
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
  margin: 0 auto;
  min-width: 90vw;
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

.info {
  color: #aaa;
  font-size: 0.8em;
}

@media (min-width: $breakpoint-xs-max) {
  .card {
    min-width: 500px;
    font-size: 1.1em;
  }
}

@media (min-width: $breakpoint-sm-max) {
  .text-h5 {
    font-size: 24px;
  }
  .card {
    min-width: 600px;
  }
}
</style>
