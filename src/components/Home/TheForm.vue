<template>
  <q-card class="my-card">
    <header>
      <h2 class="header">
        Czy chcesz zobaczyć jak odbierany jest kanał lub filmik przez widzów
        portalu
        <a href="https://www.youtube.com/" target="_blank"
          ><img class="logo" src="../../assets/youtube.png"
        /></a>
        na podstawie komentarzy?
      </h2>

      <p class="content">
        Jeśli tak to dobrze trafiłeś, wypełnij pole i przejdź do
        oceny.<router-link to="/"> Dowiedz się więcej </router-link>
      </p>
    </header>

    <q-card-section>
      <q-tabs class="tab" align="justify" v-model="selectedTab">
        <q-tab name="channels" label="Kanały" value="channels" />
        <q-tab name="videos" label="Filmiki" value="videos" />
      </q-tabs>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-ma-md">
        <div class="option-container">
          <q-option-group
            :options="options"
            color="red"
            inline
            v-model="selectedSearchType"
          />
        </div>

        <q-input
          filled
          color="black"
          :label="inputLabel"
          :hint="inputHint"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Pole nie może być puste!',
          ]"
          v-model="userInput"
        />

        <div
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
          }"
        >
          <q-btn
            label="Zresetuj"
            type="reset"
            flat
            class="q-ml-sm"
            color="red"
          />
          <q-btn label="Przejdź do oceny" type="submit" color="red" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { ref } from 'vue';

export default defineComponent({
  name: 'TheForm',
  setup() {
    const selectedTab = ref<string>('channels');
    const selectedSearchType = ref<string>('title');
    const options = [
      {
        label: 'Wyszukaj po nazwie',
        value: 'title',
      },
      {
        label: 'Wyszukaj po linku',
        value: 'url',
      },
    ];
    const userInput = ref<string>('');
    const inputLabel = computed(() => {
      if (selectedTab.value === 'channels') {
        if (selectedSearchType.value === 'title') return 'Podaj nazwę kanału*';
        else if (selectedSearchType.value === 'url')
          return 'Podaj link do kanału*';
      } else if (selectedTab.value === 'videos') {
        if (selectedSearchType.value === 'title') return 'Podaj nazwę filmiku*';
        else if (selectedSearchType.value === 'url')
          return 'Podaj link do filmiku*';
      }
      return '';
    });
    const inputHint = computed(() => {
      if (selectedTab.value === 'channels') {
        if (selectedSearchType.value === 'title')
          return 'Na przykład: Google Developers';
        else if (selectedSearchType.value === 'url')
          return 'Na przykład: https://www.youtube.com/channel/UC0rqucBdTuFTjJiefW5t-IQ';
      } else if (selectedTab.value === 'videos') {
        if (selectedSearchType.value === 'title')
          return 'Na przykład: Google Coding Interview With A Normal Software Engineer';
        else if (selectedSearchType.value === 'url')
          return 'Na przykład: https://www.youtube.com/watch?v=rw4s4M3hFfs&ab_channel=Cl%C3%A9mentMihailescu';
      }
      return '';
    });

    return {
      selectedTab,
      options,
      selectedSearchType,
      userInput,
      inputLabel,
      inputHint,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

.my-card {
  width: 50%;
  padding: 2em 3em;
  border-radius: 15px;
  box-shadow: 2px 4px rgba(255, 255, 255, 0.5);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: baseline;
}

.header {
  font-size: 1.8em;
  font-weight: 400;
  margin-bottom: 1em;
  line-height: 160%;
}

.header span {
  font-weight: 500;
  text-decoration: underline;
}

.content {
  font-size: 1.3em;
  margin-bottom: 1%;
}

.logo {
  height: 30px;
  width: auto;
  margin-left: 5px;
  margin-right: 5px;
  vertical-align: -5px;
}

a {
  color: red;
}

a:hover {
  color: rgb(165, 22, 22);
}

.tab {
  background: $red-11;
  color: white;
  border-radius: 25px;
}

.q-tab--active {
  background: $red;
}

.q-tab--inactive {
  color: #eee;
}

.option-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
