<template>
  <q-form @submit="onSubmit" @reset="onReset">
    <q-card-section class="q-mx-sm-md q-mx-md-lg">
      <transition
        enter-active-class="animate__animated animate__slideInLeft"
        leave-active-class="animate__animated animate__slideOutRight"
        appear
        mode="out-in"
      >
        <div v-if="!confirmed">
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
            type="text"
            dark
            label-color="grey-3"
            class="input"
            :label="inputLabel"
            :hint="inputHint"
            lazy-rules
            :error="false"
            :rules="[
              (val) => (val && val.length > 0) || 'Pole nie może być puste!',
            ]"
            v-model="userInput"
            :loading="evaluateLoading || searchLoading"
          />
          <div class="flex justify-center q-mt-xs-lg q-mt-md-md q-mb-md">
            <q-btn
              class="actions"
              label="Wyszukaj"
              type="button"
              color="red"
              icon="search"
              @click="onSearch"
              :loading="searchLoading"
              :disable="userInput === ''"
            />
          </div>
        </div>
        <div v-else>
          <the-list-item
            :img="confirmed.snippet.thumbnails.default.url"
            :title="confirmed.snippet.title"
            :id="confirmed.id"
            model="formItem"
            :type="selectedTab"
            @openDetails="openDetails"
            @reset="resetConfirmed"
            @showList="showConfirmModal"
          ></the-list-item>
          <div
            class="advanced-settings-btn"
            @click="setIsAdvancedSettingsVisible"
          >
            <q-icon
              v-if="isAdvancedSettingsVisible"
              name="arrow_drop_up"
            ></q-icon>
            {{
              !isAdvancedSettingsVisible
                ? 'Otwórz ustawienia zaawansowane'
                : 'Schowaj ustawienia zaawansowane'
            }}<q-icon
              v-if="!isAdvancedSettingsVisible"
              name="arrow_drop_down"
            ></q-icon>
          </div>
          <transition
            tag="section"
            class="advanced-settings"
            name="settings"
            mode="out-in"
          >
            <div class="q-gutter-md" v-if="isAdvancedSettingsVisible">
              <div v-if="selectedTab !== 'videos'" class="q-mb-lg">
                <q-slider
                  dark
                  :min="1"
                  :max="100"
                  color="red"
                  :label-value="'Minimalna liczba filmików: ' + videosLimit"
                  label-always
                  v-model="videosLimit"
                />
              </div>
              <div>
                <q-slider
                  dark
                  :min="1"
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
                            <q-date
                              v-model="endDate"
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
        </div>
      </transition>
    </q-card-section>
    <q-separator dark />
    <q-card-actions class="flex justify-end align-center q-ma-md">
      <q-btn
        label="Zresetuj"
        type="reset"
        flat
        class="q-ml-sm actions"
        color="red"
      />
      <q-btn
        class="actions"
        label="Przejdź do oceny"
        type="submit"
        color="red"
        :loading="evaluateLoading"
      />
    </q-card-actions>
  </q-form>
  <basic-modal
    v-if="agreeModalEvaluate.is"
    :title="agreeModalEvaluate.title"
    :message="agreeModalEvaluate.message"
    :confirm="agreeModalEvaluate.confirm"
    @close="agreeModalEvaluate.cancelHandler"
    @confirm="agreeModalEvaluate.confirmHandler"
  ></basic-modal>
  <basic-modal
    v-if="agreeModalReset.is"
    :title="agreeModalReset.title"
    :message="agreeModalReset.message"
    :confirm="agreeModalReset.confirm"
    :htmlMessage="agreeModalReset.htmlMessage"
    @close="agreeModalReset.cancelHandler"
    @confirm="agreeModalReset.confirmHandler"
  ></basic-modal>
</template>

<script lang="ts">
import Evaluate from '@/types/Evaluate';
import { computed, defineComponent, PropType, reactive } from 'vue';
import { ref } from 'vue';
import { useStore } from '../../store/index';
import useDateRules from '@/hooks/useDateRules';
import { useChannelActions } from '@/store/channel/actions';
import { ChannelFullInfo } from '@/types/Channel';
import TheListItem from '@/components/TheListItem.vue';
import BasicModal from '../Modals/BasicModal.vue';
import { useRouter } from 'vue-router';
import { useVideoActions } from '@/store/video/actions';
import { VideoFullInfo } from '@/types/Video';
const COMMENTS_LIMIT = 10;
const VIDEOS_LIMIT = 3;

export default defineComponent({
  name: 'TheForm',

  components: { TheListItem, BasicModal },

  props: {
    selectedTab: {
      type: String as PropType<Evaluate>,
      required: true,
    },

    confirmed: {
      type: Object as PropType<ChannelFullInfo | VideoFullInfo>,
      required: false,
    },
  },

  emits: ['onSearch'],

  setup(props) {
    const router = useRouter();
    const store = useStore();
    const channelActions = useChannelActions();
    const videoActions = useVideoActions();

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
    const videosLimit = ref<number>(VIDEOS_LIMIT);
    const useTime = ref<boolean>(false);
    const useSubComments = ref<boolean>(true);
    const { dateErr, beginDate, endDate, dateRules } = useDateRules();

    const searchLoading = ref<boolean>(false);
    const onSearch = async () => {
      searchLoading.value = true;
      if (userInput.value !== '') {
        if (props.selectedTab === 'channels') {
          if (type.value === 'title')
            await store.dispatch(
              channelActions.fetchSimilarChannelsByTitle,
              userInput.value
            );
          else
            await store.dispatch(
              channelActions.fetchSimilarChannelsByUrl,
              userInput.value
            );
        } else {
          if (type.value === 'title') {
            await store.dispatch(
              videoActions.fetchSimilarVideosByTitle,
              userInput.value
            );
          } else {
            await store.dispatch(
              videoActions.fetchSimilarVideosByUrl,
              userInput.value
            );
          }
        }
      }
      searchLoading.value = false;
    };

    const agreeModalReset = reactive({
      is: false,
      title: 'Uwaga!',
      message: `<p class="q-mb-xs">Czy na pewno chcesz zresetować formularz?</p>
        <p>Utracisz wszystkie bieżace ustawienia.</p> `,
      confirm: true,
      htmlMessage: true,
      confirmHandler: () => {
        resetForm();
        agreeModalReset.is = false;
      },
      cancelHandler: () => {
        agreeModalReset.is = false;
      },
    });

    const resetForm = () => {
      commentsLimit.value = COMMENTS_LIMIT;
      useTime.value = false;
      useSubComments.value = true;
      beginDate.value = '';
      endDate.value = '';
      userInput.value = '';
      isAdvancedSettingsVisible.value = false;
      confirmedChannel.value
        ? store.dispatch(channelActions.resetConfirmedChannel)
        : store.dispatch(videoActions.resetConfirmedVideo);
    };

    const onReset = () => {
      agreeModalReset.is = true;
    };

    const confirmedChannel = computed(() => {
      return store.getters['channel/getConfirmedChannel'];
    });

    const confirmedVideo = computed(
      () => store.getters['video/getConfirmedVideo']
    );

    const openDetails = () => {
      props.selectedTab === 'channels'
        ? store.dispatch(channelActions.toggleInfoModal, true)
        : store.dispatch(videoActions.toggleInfoModal, true);
    };
    const resetConfirmed = () => {
      onReset();
    };
    const showConfirmModal = () => {
      if (props.selectedTab === 'channels') {
        store.dispatch(channelActions.toggleModal, true);
      } else {
        store.dispatch(videoActions.toggleModal, true);
      }
    };
    const evaluateLoading = ref<boolean>(false);
    const agreeModalEvaluate = reactive({
      is: false,
      title: 'Uwaga!',
      message: 'Czy na pewno chcesz przejść do procesu oceniania?',
      confirm: true,
      confirmHandler: () => {
        router.push(`/evaluate/${confirmedChannel.value.id}`);
        agreeModalEvaluate.is = false;
      },
      cancelHandler: () => {
        agreeModalEvaluate.is = false;
      },
    });

    const onSubmit = async () => {
      evaluateLoading.value = true;
      if (!dateErr.value) {
        if (props.selectedTab === 'channels') {
          if (confirmedChannel.value === null && userInput.value !== '') {
            if (type.value === 'title') {
              await store.dispatch(
                channelActions.fetchSimilarChannelsByTitle,
                userInput.value
              );
            } else if (type.value === 'url') {
              await store.dispatch(
                channelActions.fetchSimilarChannelsByUrl,
                userInput.value
              );
            }
          } else {
            agreeModalEvaluate.is = true;
          }
        } else {
          if (confirmedVideo.value === null && userInput.value !== '') {
            if (type.value === 'title') {
              await store.dispatch(
                videoActions.fetchSimilarVideosByTitle,
                userInput.value
              );
            } else if (type.value === 'url') {
              await store.dispatch(
                videoActions.fetchSimilarVideosByUrl,
                userInput.value
              );
            }
          } else {
            agreeModalEvaluate.is = true;
          }
        }
      }
      evaluateLoading.value = false;
    };

    return {
      type,
      options,
      userInput,
      inputLabel,
      inputHint,
      isAdvancedSettingsVisible,
      setIsAdvancedSettingsVisible,
      videosLimit,
      commentsLimit,
      useTime,
      useSubComments,
      beginDate,
      endDate,
      onReset,
      onSubmit,
      dateRules,
      dateErr,
      onSearch,
      searchLoading,
      openDetails,
      resetConfirmed,
      showConfirmModal,
      evaluateLoading,
      agreeModalEvaluate,
      agreeModalReset,
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
  font-size: 0.8rem;
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

.date-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.input {
  margin: 0 auto;
  margin-top: 1em;
  font-size: 0.9rem;
}
@media (min-width: $breakpoint-md-min) {
  .input {
    font-size: 1rem;
  }
}

.advanced-settings-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 3% auto 1%;
  color: $red;
  cursor: pointer;
  width: fit-content;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 400;
  transition: 0.3s;
}

.advanced-settings-btn:hover {
  color: $red-14;
}

.advanced-settings {
  padding: 2em 0;
  margin: 0 auto;
  font-size: 0.8rem;
}

.date-input {
  width: 90%;
  margin: 5px auto;
}

.err-label {
  font-size: 12px;
  font-weight: 400;
  color: $negative;
}

.actions {
  font-size: 0.8rem;
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
