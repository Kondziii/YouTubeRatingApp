<template>
  <template>
    <q-dialog v-model="isVisible">
      <q-card class="card">
        <q-card-section class="section">
          <div class="text-h5">Wybrałeś filmik:</div>
        </q-card-section>
        <q-separator dark></q-separator>
        <q-scroll-area
          dark
          style="
            height: 50vh;
            min-width: 100%;
            word-wrap: break-word;
            overflow-wrap: break-word;
          "
        >
          <q-card-section
            class="q-pt-none flex column justify-between items-center q-mt-md"
            :style="{ paddingBottom: '0', minHeight: '47vh' }"
          >
            <div class="row flex column items-center q-mb-sm">
              <q-avatar class="avatar">
                <q-img :src="video.image"></q-img>
              </q-avatar>
              <h6 class="highlight">{{ video.title }}</h6>
            </div>
            <div class="row q-gutter-lg justify-center align-center">
              <div class="flex column items-center">
                <q-tooltip>Polubienia</q-tooltip>
                <p class="highlight">
                  {{
                    video.statistics.likeCount
                      ? video.statistics.likeCount
                      : 'brak'
                  }}
                </p>
                <label><q-icon name="thumb_up"></q-icon></label>
              </div>
              <div class="flex column items-center">
                <q-tooltip>Nie polubienia</q-tooltip>
                <p class="highlight">
                  {{
                    video.statistics.dislikeCount
                      ? video.statistics.dislikeCount
                      : 'brak'
                  }}
                </p>
                <label><q-icon name="thumb_down"> </q-icon></label>
              </div>
              <div class="flex column items-center">
                <q-tooltip>Liczba wyświetleń</q-tooltip>
                <p class="highlight">
                  {{
                    video.statistics.viewCount
                      ? video.statistics.viewCount
                      : 'brak'
                  }}
                </p>
                <label><q-icon name="visibility"> </q-icon></label>
              </div>
              <div class="flex column items-center">
                <q-tooltip>Liczba komentarzy</q-tooltip>
                <p class="highlight">
                  {{
                    video.statistics.commentCount
                      ? video.statistics.commentCount
                      : 'brak'
                  }}
                </p>
                <label><q-icon name="comment"> </q-icon></label>
              </div>
            </div>
            <div
              class="row q-mt-sm"
              style="
                word-wrap: break-word;
                overflow-wrap: break-word;
                max-width: 90vw;
              "
            >
              <p>{{ video.description }}</p>
            </div>
            <div
              :style="{ width: '100%' }"
              class="row q-mt-sm flex justify-start"
            >
              <p>Data dodania: {{ beginDate }}</p>
            </div>

            <div class="info row q-mt-md" :style="{ width: '100%' }">
              Teraz możesz zmodyfikować ustawienia i przejść do oceny!
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
            :href="linkToVideo"
            :style="{ textDecoration: 'none' }"
          >
            <q-btn id="yt" color="red" flat icon-right="fab fa-youtube">
              Zobacz w</q-btn
            >
          </a>
          <q-btn class="q-ml-sm" label="Rozumiem" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
</template>

<script lang="ts">
import { useStore } from '@/store/index';
import { Video } from '@/types/Video';
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'ConfirmVideoInfoModal',

  emits: ['close'],

  setup(_, context) {
    const isVisible = ref<boolean>(true);
    const store = useStore();

    const video = computed<Video>(
      () => store.getters['video/getConfirmedVideo']
    );

    const linkToVideo = computed<string>(
      () => `https://www.youtube.com/watch?v=${video.value.id}`
    );

    const beginDate = computed<string>(() =>
      new Date(video.value.publishedAt).toLocaleDateString()
    );

    watch(isVisible, () => {
      context.emit('close');
    });

    return {
      isVisible,
      linkToVideo,
      video,
      beginDate,
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
  width: 90vw;
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
