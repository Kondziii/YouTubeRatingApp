<template>
    <div class="instruction-container">
    <ol>
      <li>
        Wybierz sposób wyszukania filmiku - dostępne są dwie metody
        <ol type="a" class="nested">
          <li>
            <p>po tytule</p>
            <q-img class="title-img" src="../../assets/title-video-mobile.png">
 
            </q-img>
            <p class="warn">Uwaga!</p>
            <p>Nie jest konieczne wpisywanie całej nazwy filmiku.
              Jednakże jest to wysoce rekomendowane, ponieważ zwiększa
               prawdopodobieństwo wyszukania filmiku o który ci chodzi.</p>
          </li>
          <li>
            <p>po linku</p>
            <q-img class="url-img" src="../../assets/url-video-mobile.png">

            </q-img>
            <p class="warn">Uwaga!</p>
            <p>
              Link do filmiku znajdziesz po jego odtworzeniu podobnie jak na zdjęciach. Link skopiwoany powinien wyglądać nastęująco:
              <ul class="nested wrap-text">
                <li>https://www.youtube.com/watch?v=DLBgtb4nqnQ&t=3s&ab_channel=GoogleDevelopers (zalecany)</li>
                <li>v=DLBgtb4nqnQ</li>
                <li>DLBgtb4nqnQ</li>
              </ul>
            </p>
          </li>
        </ol>
      </li>
      <li>
        <p>Zatwierdź wprowadzony filmik klikając na przycisk "Zatwierdź".</p>
      </li>
      <li>
        <p>Powinno pojawić się okienko w którym należy wybrać filmik, który nas interesuje i go zatwierdzić.</p>
      </li>
      <li>
        Następnie możesz otworzyć i zmodyfikować ustawienia niestandardowe klikając na przycisk "pokaż ustawienia niestandardowe" 
        pod polem w którym skopiowałeś link lub nazwę filmiku, chociaż zalecane jest aby pozostały domyślne. Ustawienia niestandardowe zawierają następujące wartości:
        <ul class="nested q-mb-md">
          <li>Minimalna liczby komentarzy - jeżeli filmik ma mniej niż ustalony próg komentarzy (dotyczy to tylko komentarzy najwyższego rzędu, bez uwzględniania podkomentarzy) to nie zostanie oceniony.</li>
          <li>Uwzględniaj podkomentarze - domyślnie tak oznacza, że podkomentarze również biorą udział w analizie sentymentu</li>
        </ul>
      </li>
      <li>
        <p>Kliknij przycisk "Przejdź do oceny" i następnie zaczekaj na rezultat.</p>
        <p class="warn">Uwaga!</p>
        <p>Analiza może potrwać do kilku minut w zależności od ilości komentarzy, więc bądź cierliwy i nie zamykaj aplikacji.😃</p>
      </li>
    </ol>
    <p>Jeśli tu dotarłeś to już wszystko co potrzebne wiesz, więc możesz przejść do korzystania z aplikacji.</p>
    <q-card-actions class="flex justify-end">
    <q-btn
        label="Przejdź do aplikacji"
        type="button"
        color="red"
        icon-right="arrow_forward"
        @click="directToApp"
      />
    </q-card-actions>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoInstruction',

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

.q-img {
  width: 100%;
  height: auto;
  margin-bottom: 5%;
}

.instruction-container {
  margin: 0 auto;
}

.nested {
  margin-left: 2em;
}

.warn {
  font-weight: bold;
  line-height: 120%;
  color: $red;
  padding: 0;
  margin: 5px 0;
  font-size: 1.1rem !important;
}

.wrap-text {
  overflow-wrap: break-word;
  word-wrap: break-word;
}

ol * {
  @include list();
}


@media (min-width: $breakpoint-sm-min) {
  .title-img {
    content: url("../../assets/title-video.png");
  }
  .url-img {
    content: url("../../assets/url-video.png");
  }
}

</style>
