<template>
  <q-form @submit="onSubmit" @reset="onReset">
    <q-card-section class="q-mx-xl">
      <q-option-group
        class="option-container"
        :options="options"
        color="red"
        inline
        dark
        v-model="type"
      />
      <q-input
        filled
        color="black"
        dark
        label-color="grey-3"
        class="input"
        :label="inputLabel"
        :hint="inputHint"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Pole nie może być puste!',
        ]"
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
      <transition tag="section" class="advanced-settings" name="settings">
        <div class="q-gutter-md" v-if="isAdvancedSettingsVisible">
          <div>
            <q-slider
              dark
              :min="0"
              :max="100"
              color="red"
              :label-value="'Minimalna liczba komentarzy: ' + commentsLimit"
              label-always
              v-model="commentsLimit"
            />
          </div>

          <div v-if="selectedTab !== 'videos'">
            <q-toggle dark v-model="useTime" color="red" />
            <label>{{
              !useTime
                ? 'Nie uwzględniaj ram czasowych'
                : 'Uwzględniaj ramy czasowe'
            }}</label>
          </div>

          <transition name="date">
            <div v-if="useTime" class="row justify-center align-center">
              <div class="col-xs-12 col-sm-6">
                <q-input
                  class="date-input"
                  filled
                  label="Od"
                  color="black"
                  dark
                  label-color="grey-3"
                  v-model="beginDate"
                  :rules="[(v) => dateRules(v)]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="beginDate"
                          color="red"
                          mask="DD/MM/YYYY"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="red"
                              flat
                            />
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
                  dark
                  label-color="grey-3"
                  color="black"
                  v-model="endDate"
                  label="Do"
                  :rules="[(v) => dateRules(v)]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="endDate" color="red" mask="DD/MM/YYYY">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="red"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <transition name="err">
                <label v-show="dateErr" class="err-label"
                  >Nieprawidłowe daty!</label
                >
              </transition>
            </div>
          </transition>
          <q-checkbox
            v-model="useSubComments"
            label="Uwzględniaj podkomentarze"
            color="red"
            dark
          />
        </div>
      </transition>
    </q-card-section>
    <q-separator dark />
    <q-card-actions class="flex justify-end align-center q-ma-md">
      <q-btn
        label="Zresetuj"
        type="reset"
        flat
        class="q-ml-sm"
        color="red"
        @click="reset"
      />
      <q-btn label="Przejdź do oceny" type="submit" color="red" />
    </q-card-actions>
  </q-form>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { ref, watch } from 'vue';
const COMMENTS_LIMIT = 10;

export default defineComponent({
  name: 'TheForm',

  props: {
    selectedTab: {
      type: String,
      required: true,
    },
  },

  setup(props) {
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
      if (props.selectedTab === 'channels') {
        if (type.value === 'title') return 'Podaj nazwę kanału*';
        else if (type.value === 'url') return 'Podaj link do kanału*';
      } else if (props.selectedTab === 'videos') {
        if (type.value === 'title') return 'Podaj nazwę filmiku*';
        else if (type.value === 'url') return 'Podaj link do filmiku*';
      }
      return '';
    });
    const inputHint = computed(() => {
      if (props.selectedTab === 'channels') {
        if (type.value === 'title') return 'Na przykład: Google Developers';
        else if (type.value === 'url')
          return 'Na przykład: https://www.youtube.com/channel/UC0rqucBdTuFTjJiefW5t-IQ';
      } else if (props.selectedTab === 'videos') {
        if (type.value === 'title')
          return 'Na przykład: Google Coding Interview With A Normal Software Engineer';
        else if (type.value === 'url')
          return 'Na przykład: https://www.youtube.com/watch?v=rw4s4M3hFfs&ab_channel=Cl%C3%A9mentMihailescu';
      }
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

    const dateRules = (value: string) => {
      if (!value || value.length === 0) {
        return 'Pole nie może być puste';
      } else if (!/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.test(value)) {
        return 'Nieprawidłowy format, przykład 1/01/2021';
      }
    };

    const dateErr = ref<boolean>(false);

    watch([beginDate, endDate], (currValues) => {
      if (currValues[0] !== '' && currValues[1] !== '') {
        const date1 = new Date(currValues[0].split('/').reverse().join());
        const date2 = new Date(currValues[1].split('/').reverse().join());

        if (date1.getTime() > date2.getTime()) {
          dateErr.value = true;
        } else {
          dateErr.value = false;
        }
      } else {
        dateErr.value = false;
      }
      console.log(dateErr.value);
    });

    const reset = () => {
      commentsLimit.value = COMMENTS_LIMIT;
      useTime.value = false;
      useSubComments.value = true;
      beginDate.value = '';
      endDate.value = '';
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
      dateRules,
      dateErr,
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

.err-label {
  font-size: 12px;
  color: $negative;
}

.settings-enter-active,
.date-enter-active,
.err-enter-active {
  animation: slide-down 0.3s ease-in-out;
}

.settings-leave-active,
.date-leave-active,
.err-leave-active {
  animation: slide-down 0.3s ease-in-out reverse;
}

@keyframes slide-down {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 100%;
  }
}
</style>
