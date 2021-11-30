<template>
  <basic-instruction model="video">
    <template #title-img>
      <q-img
        class="title-img"
        src="../../assets/title-video-mobile.png"
      ></q-img>
    </template>
    <template #url-img>
      <q-img class="url-img" src="../../assets/url-video-mobile.png"></q-img>
    </template>
    <template #links>
      <p>
        Link do filmiku znajdziesz po jego odtworzeniu podobnie jak na
        zdjęciach. Link skopiowany powinien wyglądać nastęująco:
      </p>
      <ul class="nested wrap-text q-mb-md">
        <li>
          https://www.youtube.com/watch?v=DLBgtb4nqnQ&t=3s&ab_channel=GoogleDevelopers
          (zalecany)
        </li>
        <li>v=DLBgtb4nqnQ</li>
      </ul>
    </template>
    <template #advanced-settings>
      <ul class="nested q-mb-md">
        <li>
          Minimalna liczby komentarzy - jeżeli filmik ma mniej niż ustalony próg
          komentarzy (dotyczy to tylko komentarzy najwyższego rzędu, bez
          uwzględniania podkomentarzy) to nie zostanie oceniony.
        </li>
        <li>
          Uwzględniaj podkomentarze - domyślnie tak, oznacza, że podkomentarze
          również biorą udział w analizie sentymentu
        </li>
      </ul>
    </template>
    <template #time-warn>
      <p>
        Analiza może potrwać do kilku minut w zależności od ilości komentarzy,
        więc bądź cierliwy i nie zamykaj aplikacji.😃
      </p>
    </template>
  </basic-instruction>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BasicInstruction from '@/components/LearnMore/BasicInstruction.vue';

export default defineComponent({
  components: { BasicInstruction },
  name: 'VideoInstruction',

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';
@import 'src/styles/instruction';

@media (min-width: $breakpoint-sm-min) {
  .title-img {
    content: url('../../assets/title-video.png');
  }
  .url-img {
    content: url('../../assets/url-video.png');
  }
}
</style>
