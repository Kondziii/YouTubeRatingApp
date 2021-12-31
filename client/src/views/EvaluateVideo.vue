<template>
  <basic-container type="card--transparent" class="q-pa-sm">
    <transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeInDown"
      mode="out-in"
    >
      <evaluate-header
        v-if="result === null"
        title="The selected video is being evaluated"
      ></evaluate-header>
      <evaluate-header
        v-else
        title="The video has been evaluated"
      ></evaluate-header>
    </transition>
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
                <li class="q-mb-sm">{{ video.statistics.viewCount }} views</li>
                <li>{{ video.statistics.commentCount }} comments</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </q-card-section>
    <q-separator dark></q-separator>
    <transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOut"
      mode="out-in"
    >
      <evaluate-wait v-if="result === null"> </evaluate-wait>
      <evaluate-wait
        v-else-if="!isResultVisible"
        finished
        to="EvaluateVideoResult"
        @click="isResultVisible = !isResultVisible"
      ></evaluate-wait>
    </transition>
    <router-view
      v-if="result && isResultVisible"
      :result="result"
      v-slot="{ Component }"
    >
      <transition
        enter-active-class="animate__animated animate__fadeInUp animate__delay-1s"
        leave-active-class="animate__animated animate__fadeOut"
        mode="out-in"
        appear
      >
        <component :is="Component" @save="addToHistory"></component>
      </transition>
    </router-view>
  </basic-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import { useStore } from '@/store/index';
import { Video } from '@/types/Video';
import { useVideoActions } from '@/store/video/actions';
import { Sentiment } from '@/types/Sentiment';
import { useEvaluateActions } from '@/store/evaluate/actions';
import { useRoute } from 'vue-router';
import EvaluateHeader from '@/components/Evaluate/EvaluateHeader.vue';
import EvaluateWait from '@/components/Evaluate/EvaluateWait.vue';

export default defineComponent({
  name: 'EvaluateVideo',

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  components: {
    EvaluateHeader,
    EvaluateWait,
  },

  setup(props) {
    const store = useStore();
    const route = useRoute();
    const query = route.query as unknown as { history: boolean };
    const evaluateActions = useEvaluateActions();
    const videoActions = useVideoActions();
    const video = computed<Video>(
      () => store.getters['video/getConfirmedVideo']
    );

    const releaseDate = computed(() =>
      new Date(video.value.publishedAt).toLocaleDateString()
    );

    watchEffect(() => {
      if (!video.value) {
        store.dispatch(videoActions.fetchFullInfo, props.id);
      }
      if (video.value && !query.history)
        store.dispatch(videoActions.analyzeSentiment, {
          videoId: video.value.id,
          channelId: video.value.channelId,
        });
    });

    const result = computed<Sentiment>(
      () => store.getters['evaluate/getVideoResult']
    );

    const isResultVisible = ref<boolean>(query.history ? true : false);

    const addToHistory = () => {
      store.dispatch(evaluateActions.saveVideoResult, {
        result: result.value,
        video: video.value,
      });
    };

    return {
      video,
      releaseDate,
      result,
      isResultVisible,
      addToHistory,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

ul {
  font-size: 0.9rem;

  .video-title {
    font-size: 1.2rem;
  }
  .video-details {
    color: #aaa;
  }
}
</style>
