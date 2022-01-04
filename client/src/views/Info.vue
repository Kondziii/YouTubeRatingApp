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
            According to the statistics from 2020, over 37 million channels have
            been registered and it is being estimated that people all over the
            world provide around 500 hours of content in every minute.
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
          <p>Information about sentiment analysis</p>
          <p>
            As I mentioned in the first paragraph, the application uses library
            called vader sentiment to perform sentiment analysis. It returns the
            compound (score) value that is computed by summing the valence
            scores of each detected word from lexicon with over 7000 words. The
            score value is normalized to be between -1 (the most negative) and 1
            (the most positive). So if the value is closer to 1 we can think
            that comment and thus video or channel is more positive and in other
            direction similarly. I used typical recommended thresholds to state
            whether channel or video is positive (compound > 0.05), negative
            (compound = 0.05) or neutral (rest of the values).
          </p>
          <p class="warn">Warning!</p>
          <p>
            There is one very important issue about this library. It supports
            only English language so it means that
            <span
              :style="{
                textDecoration: 'underline',
                textTransform: 'uppercase',
              }"
              >app enables to perform sentiment analysis only based on english
              comments</span
            >. Any others comments would be excluded from the process.
          </p>
          <p>In the result you can expect following statistics:</p>
          <ul class="q-pl-lg q-mb-md">
            <li>
              The number of comments processed, excluded and average score that
              I described several lines above.
            </li>
            <li>
              The dougnut chart presents the number of comments classified as
              positive, negative or neutral in the case of evaluating video. In
              the latter case the cart will present the number of videos instead
              of comments.
            </li>
            <li>
              The dougnut chart that presents percentage words classified as
              negative, positive or neutral.
            </li>
            <li>
              Only in case of evaluating a channel you will see line chart that
              presents sentiment score of videos in according to its published
              date.
            </li>
            <li>
              Only in case of evaluating a channel you will also see the list of
              evaluated videos with their score. You can simply see the details
              of each video evaluated within channel.
            </li>
            <li>
              The evaluation has some settings that you can custom. More about
              it you will find in the further part.
            </li>
          </ul>
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
    const { items, selectedTab, setSelectedTab } = useTabs(
      [
        {
          label: 'Channels',
          value: 'channels',
        },
        {
          label: 'Videos',
          value: 'videos',
        },
      ],
      'LearnMore'
    );

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
@import 'src/styles/instruction';

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
