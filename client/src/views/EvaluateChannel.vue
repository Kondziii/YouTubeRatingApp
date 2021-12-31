<template>
  <basic-container type="card--transparent" class="q-pa-sm">
    <transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeInDown"
      mode="out-in"
    >
      <evaluate-header
        title="The selected channel is being evaluated"
      ></evaluate-header>
      <!-- <evaluate-header
        v-else
        title="The video has been evaluated"
      ></evaluate-header> -->
    </transition>
    <q-separator dark />
    <q-card-section v-if="!!channel">
      <div class="row justify-center items-start q-col-gutter-lg">
        <div class="col-xs-12 col-sm-6 col-md-5">
          <a
            :href="moveToChannel"
            target="_blank"
            class="flex justify-center items-center"
          >
            <img
              :style="{
                width: '80%',
                height: 'auto',
                margin: '0',
                cursor: 'pointer',
              }"
              :src="channel.imageHigh"
              alt=""
            />
          </a>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-7">
          <ul style="list-style: none">
            <li class="channel-title">{{ channel.title }}</li>
            <li class="channel-details">
              <span>{{ channel.description }}</span>
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
                <li>{{ channel.statistics.videoCount }} videos</li>
                <li>{{ channel.statistics.subscriberCount }} subscribers</li>
                <li>{{ channel.statistics.viewCount }} views</li>
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
        to="EvaluateChannelResult"
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
import { computed, defineComponent, watchEffect } from 'vue';
import { useStore } from '@/store';
import EvaluateHeader from '@/components/Evaluate/EvaluateHeader.vue';
import EvaluateWait from '@/components/Evaluate/EvaluateWait.vue';
import { useChannelActions } from '@/store/channel/actions';

export default defineComponent({
  name: 'EvaluateChannel',

  components: {
    EvaluateHeader,
    EvaluateWait,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();
    const channelActions = useChannelActions();
    const channel = computed(
      () => store.getters['channel/getConfirmedChannel']
    );
    const releaseDate = computed(() =>
      new Date(channel.value.publishedAt).toLocaleDateString()
    );

    const moveToChannel = computed(
      () => `http://youtube.com/channel/${channel.value.id}`
    );

    const result = null;

    watchEffect(() => {
      if (!channel.value) {
        store.dispatch(channelActions.fetchFullInfo, props.id);
      }
      if (channel.value) console.log('elo');
    });

    return {
      channel,
      releaseDate,
      moveToChannel,
      result,
    };
  },
});
</script>

<style lang="scss" scoped>
a img {
  transition: 0.3s;
}

a img:hover {
  opacity: 0.9;
}

ul {
  font-size: 0.9rem;

  .channel-title {
    font-size: 1.2rem;
  }
  .channel-details {
    color: #aaa;
  }
}
</style>
