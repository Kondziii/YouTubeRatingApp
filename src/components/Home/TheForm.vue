<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mx-sm">
    <q-option-group
      class="option-container"
      :options="options"
      color="red"
      inline
      v-model="type"
    />
    <q-input
      filled
      color="black"
      class="input"
      :label="inputLabel"
      :hint="inputHint"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Pole nie może być puste!']"
      v-model="userInput"
    />
    <div class="advanced-settings-btn" @click="setIsAdvancedSettingsVisible">
      <q-icon v-if="isAdvancedSettingsVisible" name="arrow_drop_up"></q-icon>
      {{
        !isAdvancedSettingsVisible
          ? 'Otwórz ustawienia zaawansowane'
          : 'Schowaj ustawienia zaawansowane'
      }}<q-icon
        v-if="!isAdvancedSettingsVisible"
        name="arrow_drop_down"
      ></q-icon>
    </div>
    <section class="advanced-settings" v-if="isAdvancedSettingsVisible">
      <div class="q-gutter-md">
        <div>
          <label color="grey">
            Minimalna liczba komentarzy: {{ commentsLimit }}
          </label>
          <q-slider :min="0" :max="100" color="red" v-model="commentsLimit" />
        </div>

        <div>
          <q-toggle v-model="useTime" color="red" />
          <label>{{
            !useTime
              ? 'Nie uwzględniaj ram czasowych'
              : 'Uwzględniaj ramy czasowe'
          }}</label>
        </div>

        <div v-if="useTime" class="row justify-center align-center">
          <div class="col-xs-12 col-sm-6">
            <q-input
              class="date-input"
              filled
              label="Od"
              v-model="beginDate"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="red" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              class="date-input"
              filled
              v-model="endDate"
              label="Do"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="red" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <q-checkbox
          v-model="useSubComments"
          label="Uwzględniaj podkomentarze"
          color="red"
        />
      </div>
    </section>
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
        @click="reset"
      />
      <q-btn label="Przejdź do oceny" type="submit" color="red" />
    </div>
  </q-form>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const COMMENTS_LIMIT = 10;

export default defineComponent({
  name: 'TheForm',
  setup() {
    const route = useRoute();
    const type = ref<string>('title');
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
      if (type.value === 'title') return 'Podaj nazwę kanału*';
      else if (type.value === 'url') return 'Podaj link do kanału*';
      return '';
    });
    const inputHint = computed(() => {
      if (type.value === 'title') return 'Na przykład: Google Developers';
      else if (type.value === 'url')
        return 'Na przykład: https://www.youtube.com/channel/UC0rqucBdTuFTjJiefW5t-IQ';
      return '';
    });

    const isAdvancedSettingsVisible = ref<boolean>(false);
    const setIsAdvancedSettingsVisible = () => {
      isAdvancedSettingsVisible.value = !isAdvancedSettingsVisible.value;
    };
    const commentsLimit = ref<number>(COMMENTS_LIMIT);
    const useTime = ref<boolean>(false);
    const useSubComments = ref<boolean>(true);
    const beginDate = ref<string>('');
    const endDate = ref<string>('');

    const reset = () => {
      commentsLimit.value = COMMENTS_LIMIT;
      useTime.value = false;
      useSubComments.value = true;
      beginDate.value = endDate.value = new Date().toISOString().split('T')[0];
      userInput.value = '';
      isAdvancedSettingsVisible.value = false;
    };

    return {
      type,
      options,
      userInput,
      inputLabel,
      inputHint,
      isAdvancedSettingsVisible,
      setIsAdvancedSettingsVisible,
      commentsLimit,
      useTime,
      useSubComments,
      beginDate,
      endDate,
      reset,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

.option-container {
  display: flex;
  justify-content: center;
  align-items: center;
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

.advanced-settings-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  margin-top: 1em;
  color: $red-8;
  cursor: pointer;
}

.date-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.input {
  margin: 0 auto;
  margin-top: 1em;
}

.advanced-settings-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  margin-top: 1em;
  color: $red;
  cursor: pointer;
  width: fit-content;
  text-align: center;
}

.advanced-settings-btn:hover {
  color: $red-14;
}

.advanced-settings {
  padding: 2em 0;
  margin: 0 auto;
}

.date-input {
  width: 90%;
  margin: 0 auto;
}
</style>
