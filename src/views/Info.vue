<template>
  <basic-container>
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
          <basic-tabs :items="items"></basic-tabs>
          <router-view></router-view>
        </li>
      </ol>
    </q-card-section>
  </basic-container>
</template>

<script lang="ts">
import BasicTabs from '@/components/UI/BasicTabs.vue';
import Tab from '@/types/Tab';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: { BasicTabs },
  name: 'Info',

  setup() {
    const items: Array<Tab> = [
      {
        label: 'Kanały',
        value: 'channels',
        to: '/learn-more/channels',
      },
      {
        label: 'Filmiki',
        value: 'videos',
        to: '/learn-more/videos',
      },
    ];

    return {
      items,
    };
  },
});
</script>

<style lang="scss" scoped></style>
