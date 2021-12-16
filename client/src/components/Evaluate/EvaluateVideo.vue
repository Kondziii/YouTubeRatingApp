<template>
  <basic-container type="card--transparent" class="q-pa-sm">
    <header class="q-pa-lg text-center">
      <h1>Trwa ocenianie wybranego filmiku</h1>
    </header>
    <q-separator dark />
    <q-card-section v-if="!!video">
      <div class="row justify-center items-start q-col-gutter-lg">
        <div class="col-xs-12 col-sm-6 col-md-5">
          <youtube height="250" width="100%" :src="video.id"></youtube>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-7">
          <ul style="list-style: none">
            <li class="video-title">{{ video.title }}</li>
            <li class="video-details">
              <span>{{ video.channelTitle }}</span>
              <span>, {{ releaseDate }}</span>
            </li>
            <li>
              <ul
                :style="{
                  listStyle: 'none',
                  color: '#aaa',
                  fontSize: '0.8rem',
                  fontWeight: '300',
                }"
                class="q-mt-lg"
              >
                <li class="q-mb-sm">
                  {{ video.statistics.viewCount }} wyświetleń
                </li>
                <li>{{ video.statistics.commentCount }} kometarzy</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </q-card-section>
    <q-separator dark></q-separator>
    <q-card-section class="flex column items-center justify-center">
      <p class="wait-title">Bądź cierpliwy, może to chwilę potrwać.</p>
      <q-spinner-dots color="red" size="3rem" />
    </q-card-section>
  </basic-container>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store/index';
import { Video } from '@/types/Video';
import { useVideoActions } from '@/store/video/actions';

export default defineComponent({
  name: 'EvaluateVideo',

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();
    const videoActions = useVideoActions();
    const video = computed<Video>(
      () => store.getters['video/getConfirmedVideo']
    );

    const releaseDate = computed(() =>
      new Date(video.value.publishedAt).toLocaleDateString()
    );

    if (!video.value) {
      console.log('elo');
      store.dispatch(videoActions.fetchFullInfo, props.id);
    }

    return {
      video,
      releaseDate,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

header h1 {
  @include header();
}

ul {
  font-size: 0.9rem;

  .video-title {
    font-size: 1.2rem;
  }
  .video-details {
    color: #aaa;
  }
}

.wait-title {
  font-size: 1rem;
  font-weight: 300;
  font-style: italic;
  margin: 0;
}
</style>
