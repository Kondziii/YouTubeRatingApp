<template>
  <basic-container type="card--normal--dark">
    <q-card-section>
      <h1>Informacje dotyczące aplikacji</h1>
    </q-card-section>
    <q-card-section>
      <ol>
        <li>
          <p>Ogólne</p>
          <p>
            YouTube to serwis internetowy, który powstał w 2005 roku i stał się
            jednym z najbardziej popularnych i najbardziej rozpoznawalnych
            serwisów w Internecie. Wedlug statystyk pochodzących z 2020 roku w
            serwisie zarejestrwano ponad 37 milionów kanałów oraz szacuję się,
            że ludzie z całego świata dostarczają około 500 godzin wideo
            materiałów w każdej minucie na serwery Youtube.
          </p>
          <p>
            Tak duża liczba materiałów (często wiele kanałów lub filmików na ten
            sam temat) stała się inspiracją do stworzenia aplikacji
            umożliwiającej ich ocenę. W następstwie została stworzona aplikacja,
            którą właśnie używasz - daje możliwość sprawdzenia jak konkretny
            kanał czy filmik jest odbiernay przez widzów serwisu Youtube. Ocena
            jest dokonywana na podstawie analizy semantycznej komentarzy
            zamieszczanych przez widzów pod filmikami. W skrócie analiza
            sentymentu jest to jednoznaczna ocena wydźwięku wypowiedzi, czyli
            stwierdzenie czy wypowiedź jest negatywna, neutralna czy pozytywna.
            Jeśli kogoś ten temat zainteresował to odsyłam do materiałów
            dostępnych w Internecie np.
            <a
              href="https://brand24.pl/blog/co-to-jest-analiza-sentymentu-oraz-jak-mozesz-ja-wykorzystac/"
              target="_blank"
              >Analiza sentymentu</a
            >
          </p>
        </li>
        <li>
          <p>Instrukcja obsługi aplikacji</p>
          <basic-tabs
            :items="items"
            :selectedTab="selectedTab"
            @select="setSelectedTab"
          ></basic-tabs>
          <component :is="selectedInstruction"></component>
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
        label: 'Kanały',
        value: 'channels',
      },
      {
        label: 'Filmiki',
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
  font-size: 1.6em;
}

.selection-container {
  margin-bottom: 5% !important;
}

ol {
  padding: 0 1em;

  li {
    &::marker {
      font-size: 1.2em;
    }

    p {
      font-size: 0.85em;
      &:first-child {
        font-size: 1.2em;
      }
    }
  }
}

a {
  @include link();
}

@media (min-width: $breakpoint-xs-max) {
  ol {
    padding: 0 2em;
  }
}
</style>
