<template>
  <basic-container type="card--normal--dark">
    <q-card-section>
      <h1>About application</h1>
    </q-card-section>
    <q-card-section>
      <ol>
        <li>
          <p>General</p>
          <p>
            YouTube is a website that was founded in 2005 and has become one of
            the most popular and most recognizable websites in Internet.
            According to statistics from 2020, over 37 milion channels have been
            registered and it is being estimated that people all over the world
            provide around 500 hours of content in every minute.
          </p>
          <p>
            Such a huge number of channels and videos has became an inspiration
            to create app that enables user to evaluate them based on comments.
            Evaluation based on comments relies on performing its sentiment
            analysis. The app is using library called vader sentiment. If you
            want to get know more about it, you can just google it.
          </p>
        </li>
        <li>
          <p>Instruction</p>
          <basic-tabs
            :items="items"
            :selectedTab="selectedTab"
            @select="setSelectedTab"
          ></basic-tabs>
          <transition
            enter-active-class="animate__animated animate__slideInLeft"
            leave-active-class="animate__animated animate__slideOutRight"
            appear
            mode="out-in"
          >
            <component :is="selectedInstruction"></component>
          </transition>
        </li>
      </ol>
    </q-card-section>
  </basic-container>
</template>

<script lang="ts">
import ChannelInstruction from '@/components/LearnMore/ChannelInstruction.vue';
import VideoInstruction from '@/components/LearnMore/VideoInstruction.vue';
import useTabs from '@/hooks/useTabs';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  components: { ChannelInstruction, VideoInstruction },
  name: 'Info',

  setup() {
    const { items, selectedTab, setSelectedTab } = useTabs([
      {
        label: 'Channels',
        value: 'channels',
      },
      {
        label: 'Videos',
        value: 'videos',
      },
    ]);

    const selectedInstruction = computed(() => {
      if (selectedTab.value === 'channels') return 'channel-instruction';
      else if (selectedTab.value === 'videos') return 'video-instruction';
      return '';
    });

    return {
      items,
      selectedTab,
      setSelectedTab,
      selectedInstruction,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

h1 {
  @include header();
  margin-left: 0.5em;
}

.selection-container {
  margin-bottom: 5% !important;
}

ol {
  padding: 0 1em;

  li {
    &::marker {
      font-size: 1.2rem;
    }

    p {
      font-size: 0.9rem;
      &:first-child {
        font-size: 1.2rem;
      }
    }
  }
}

a {
  @include link();
  font-size: 0.9rem;
}

@media (min-width: $breakpoint-xs-max) {
  ol {
    padding: 0 2em;
  }
}
</style>
