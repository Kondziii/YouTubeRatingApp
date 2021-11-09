<template>
  <div class="instruction-container">
    <ol>
      <li>
        Wybierz sposób wyszukania kanału - dostępne są dwie metody
        <ol type="a" class="nested">
          <li>
            <p>po tytule</p>
            <q-img src="../../assets/title-channel.png">
 
            </q-img>
          </li>
          <li>
            <p>po linku</p>
            <q-img src="../../assets/url-channel.png">

            </q-img>
            <p class="warn">Uwaga!</p>
            <p>
              Link do kanału może różnie wyglądać. Poniżej przedstwione zostały wszystkie możliwe formaty wyszukiwania po linku:
              <ul class="nested">
                <li>https://www.youtube.com/channel/ UCW5YeuERMmlnqo4oq8vwUpg (zalecany)</li>
                <li> https://www.youtube.com/c/TheNetNinja</li>
                <li>UCW5YeuERMmlnqo4oq8vwUpg</li>
                <li>https://www.youtube.com/googlecode</li>
              </ul>
            </p>
          </li>
        </ol>
      </li>
      <li>
        <p>Zatwierdź wprowadzony kanał klikając na przycisk "Zatwierdź".</p>
      </li>
      <li>
        <p>Powinno pojawić się okienko w którym należy wybrać kanał, który nas interesuje i go zatwierdzić.</p>
      </li>
      <li>
        Następnie możesz otworzyć i zmodyfikować ustawienia niestandardowe klikając na przycisk "pokaż ustawienia niestandardowe" 
        pod polem w którym skopiowałeś link lub nazwę kanału, chociaż zalecane jest aby pozostały domyślne. Ustawienia niestandardowe zawierają następujące wartości:
        <ul class="nested">
          <li>Minimalna liczby komentarzy - filmiki tego kanału, które mają mniej niż 10 komentarzy (dotyczy to tylko komentarzy najwyższego rzędu, bez uwzględniania podkomentarzy) zostaną wykluczone z analizy.</li>
          <li>Uwzględniaj ramy czasowe - domyslnie kanał oceniany jest od momentu powstania, ale możesz to ograniczyć podając datę początkową i końcową</li>
          <li>Uwzględniaj podkomentarze - domyślnie tak oznacza, że podkomentarze również biorą udział w analizie sentymentu</li>
        </ul>
      </li>
      <li>
        <p>Kliknij przycisk "Przejdź do oceny" i następnie zaczekaj na rezultat.</p>
        <p class="warn">Uwaga!</p>
        <p>Analiza może potrwać od klku do kilkudziesięciu minut w zależności od tego jak rozbudowany jest kanał, więc bądź cierliwy i nie zamykaj aplikacji.😃</p>
      </li>
    </ol>
    <p>Jeśli tu dotarłeś to już wszystko co potrzebne wiesz, więc możesz przejść do korzystania z aplikacji.</p>
    <q-card-actions class="flex justify-end">
    <q-btn
        label="Przejdź do aplikacji"
        type="button"
        color="red"
        @click="directToApp"
      />
    </q-card-actions>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useRouter} from 'vue-router'

export default defineComponent({
  name: 'ChannelInstruction',

  setup() {
    const router = useRouter();

    const directToApp = () => {
      router.push('/');
    }
    
    return {
      directToApp
    };
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
}

ol {
 font-size: 1em;

 li {
   ol {
     font-size: 0.9em;
   }
 }
}

p {
  font-size: 0.9em;
}

.q-btn {
  font-size: 0.8em;
}



</style>
