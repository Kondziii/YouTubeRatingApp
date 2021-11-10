<template>
  <div class="instruction-container">
    <ol>
      <li>
        <p>Wybierz sposób wyszukania {{ type }} - dostępne są dwie metody</p>
        <ol type="a" class="nested">
          <li>
            <p>po tytule</p>
            <slot name="title-img"></slot>
            <p class="warn">Uwaga!</p>
            <p>
              Nie jest konieczne wpisywanie całej nazwy {{ type }}. Jednakże
              jest to wysoce rekomendowane, ponieważ zwiększa prawdopodobieństwo
              wyszukania {{ type }} o który ci chodzi.
            </p>
          </li>
          <li>
            <p>po linku</p>
            <slot name="url-img"></slot>
            <p class="warn">Uwaga!</p>
            <slot name="links"></slot>
          </li>
        </ol>
      </li>
      <li>
        <p>
          Zatwierdź wprowadzony {{ type_ }} klikając na przycisk "Zatwierdź".
        </p>
      </li>
      <li>
        <p>
          Powinno pojawić się okienko w którym należy wybrać {{ type_ }}, który
          nas interesuje i go zatwierdzić.
        </p>
      </li>
      <li>
        <p>
          Następnie możesz otworzyć i zmodyfikować ustawienia niestandardowe
          klikając na przycisk "pokaż ustawienia niestandardowe" pod polem w
          którym skopiowałeś link lub nazwę {{ type }}, chociaż zalecane jest
          aby pozostały domyślne. Ustawienia niestandardowe zawierają
          następujące wartości:
        </p>
        <slot name="advanced-settings"></slot>
      </li>
      <li>
        <p>
          Kliknij przycisk "Przejdź do oceny" i następnie zaczekaj na rezultat.
        </p>
        <p class="warn">Uwaga!</p>
        <slot name="time-warn"></slot>
      </li>
    </ol>
    <p>
      Jeśli tu dotarłeś to już wszystko co potrzebne wiesz, więc możesz przejść
      do korzystania z aplikacji.
    </p>
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
import { computed, defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import Evaluate from '@/types/Evaluate';

export default defineComponent({
  name: 'BasicInstruction',

  props: {
    model: {
      type: String as PropType<Evaluate>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();

    const directToApp = () => {
      router.push('/');
    };
    const type = computed(() =>
      props.model === 'videos' ? 'filmiku' : 'kanału'
    );
    const type_ = computed(() =>
      props.model === 'videos' ? 'filmik' : 'kanał'
    );

    return {
      type,
      type_,
      directToApp,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';
@import 'src/styles/instruction';

ol * {
  @include list();
}
</style>
