<template>
  <basic-instruction model="channel">
    <template #title-img>
      <q-img
        class="title-img"
        src="../../assets/title-channel-mobile.png"
      ></q-img>
    </template>
    <template #url-img>
      <q-img class="url-img" src="../../assets/url-channel-mobile.png"></q-img>
    </template>
    <template #links>
      <p>
        Link do kanału może różnie wyglądać. Poniżej przedstwione zostały
        wszystkie możliwe formaty wyszukiwania po linku:
      </p>
      <ul class="nested wrap-text q-mb-md">
        <li>
          https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg (zalecany)
        </li>
        <li>https://www.youtube.com/c/TheNetNinja</li>
        <li>https://www.youtube.com/googlecode</li>
      </ul>
    </template>
    <template #advanced-settings>
      <ul class="nested q-mb-md">
        <li>
          Minimalna liczba filmików - kanał musi posiadać co najmniej tyle
          filmików ile wynosi ten próg, domyślnie 3
        </li>
        <li>
          Minimalna liczby komentarzy - filmiki tego kanału, które mają mniej
          niż 10 komentarzy (dotyczy to tylko komentarzy najwyższego rzędu, bez
          uwzględniania podkomentarzy) zostaną wykluczone z analizy.
        </li>
        <li>
          Uwzględniaj ramy czasowe - domyslnie kanał oceniany jest od momentu
          powstania, ale możesz to ograniczyć podając datę początkową i końcową
        </li>
        <li>
          Uwzględniaj podkomentarze - domyślnie tak oznacza, że podkomentarze
          również biorą udział w analizie sentymentu
        </li>
      </ul>
    </template>
    <template #time-warn>
      <p>
        Analiza może potrwać od klku do kilkudziesięciu minut w zależności od
        tego jak rozbudowany jest kanał, więc bądź cierliwy i nie zamykaj
        aplikacji.😃
      </p>
    </template>
  </basic-instruction>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import BasicInstruction from '@/components/LearnMore/BasicInstruction.vue';

export default defineComponent({
  name: 'ChannelInstruction',

  components: {
    BasicInstruction,
  },

  setup() {
    const router = useRouter();

    const directToApp = () => {
      router.push('/');
    };

    return {
      directToApp,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';
@import 'src/styles/instruction';

@media (min-width: $breakpoint-sm-min) {
  .title-img {
    content: url('../../assets/title-channel.png');
  }
  .url-img {
    content: url('../../assets/url-channel.png');
  }
}
</style>
