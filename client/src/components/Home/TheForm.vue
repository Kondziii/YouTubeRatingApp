<template>
  <q-form @submit="onSubmit" @reset="onReset">
    <q-card-section class="q-mx-sm-md q-mx-md-lg">
      <transition
        enter-active-class="animate__animated animate__slideInLeft"
        :leave-active-class="
          confirmed === null ? '' : 'animate__animated animate__slideOutRight'
        "
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
              label="Search"
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
          <transition
            enter-active-class="animate__animated animate__slideInLeft"
            leave-active-class="animate__animated animate__slideOutRight"
            appear
            mode="out-in"
          >
            <the-list-item
              :img="confirmed.image"
              :title="confirmed.title"
              :id="confirmed.id"
              :key="confirmed.id"
              model="formItem"
              :type="selectedTab"
              @openDetails="openDetails"
              @reset="resetConfirmed"
              @showList="showConfirmModal"
            ></the-list-item>
          </transition>
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
                ? 'Show advanced settings'
                : 'Hide advanced settings'
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
            <div
              :class="selectedTab === 'videos' ? 'q-gutter-xs' : 'q-gutter-sm'"
              v-if="isAdvancedSettingsVisible"
            >
              <div v-if="selectedTab === 'channels'">
                <q-slider
                  dark
                  :min="1"
                  :max="100"
                  color="red"
                  :label-value="'Minimal comments amount: ' + commentsLimit"
                  label-always
                  v-model="commentsLimit"
                />
              </div>

              <div v-if="selectedTab !== 'videos'">
                <q-toggle dark v-model="useTime" color="red" />
                <label>{{
                  !useTime ? 'Default date frames' : 'Custom date frames'
                }}</label>
              </div>

              <transition name="date">
                <div v-if="useTime" class="row justify-center align-center">
                  <div class="col-xs-12 col-sm-6">
                    <q-input
                      class="date-input"
                      filled
                      label="From"
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
                      label="To"
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
                      >Incorrect dates!</label
                    >
                  </transition>
                </div>
              </transition>
              <div class="flex column justify-start q-gutter-y-sm">
                <q-checkbox
                  v-model="useSubComments"
                  label="Take subcomments into account"
                  color="red"
                  dark
                />
                <q-checkbox
                  v-model="useAuthorAnswers"
                  label="Take author's answers into account"
                  color="red"
                  dark
                />
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </q-card-section>
    <q-separator dark />
    <q-card-actions class="flex justify-end align-center q-ma-md">
      <q-btn
        label="Reset"
        type="reset"
        flat
        class="q-ml-sm actions"
        color="red"
      />
      <q-btn
        class="actions"
        label="Evaluate"
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
import Evaluate, { EvaluateType } from '@/types/Evaluate';
import {
  computed,
  defineComponent,
  nextTick,
  PropType,
  reactive,
  ref,
} from 'vue';
import { useStore } from '../../store/index';
import useDateRules from '@/hooks/useDateRules';
import { useChannelActions } from '@/store/channel/actions';
import { Channel } from '@/types/Channel';
import TheListItem from '@/components/TheListItem.vue';
import BasicModal from '../Modals/BasicModal.vue';
import { useRouter } from 'vue-router';
import { useVideoActions } from '@/store/video/actions';
import { Video } from '@/types/Video';
import EvaluateActions from '@/types/EvaluateActions';
import { COMMENTS_LIMIT } from '../../../config';
import { useEvaluateActions } from '@/store/evaluate/actions';

export default defineComponent({
  name: 'TheForm',

  components: { TheListItem, BasicModal },

  props: {
    selectedTab: {
      type: String as PropType<Evaluate>,
      required: true,
      default: 'channels',
    },

    confirmed: {
      type: Object as PropType<Channel | Video>,
      required: false,
    },
  },

  setup(props) {
    const router = useRouter();
    const store = useStore();

    const channelActions = useChannelActions();
    const videoActions = useVideoActions();
    const evaluateActions = useEvaluateActions();

    nextTick(() => {
      store.dispatch(channelActions.resetConfirmed);
      store.dispatch(videoActions.resetConfirmed);
    });

    const actions = computed<EvaluateActions>(() =>
      props.selectedTab === 'channels' ? channelActions : videoActions
    );

    const type = ref<EvaluateType>('title');
    const options = [
      {
        label: 'Search by title',
        value: 'title',
      },
      {
        label: 'Search by link',
        value: 'url',
      },
    ];

    // input
    const inputParams = {
      channels: {
        label: {
          title: 'Type channel title*',
          url: 'Type link to channel*',
        },
        hint: {
          title: 'Example: Google Developers',
          url: 'Example: https://www.youtube.com/channel/UC0rqucBdTuFTjJiefW5t-IQ',
        },
      },
      videos: {
        label: {
          title: 'Type video title*',
          url: 'Type link to video*',
        },
        hint: {
          title:
            'Example: Google Coding Interview With A Normal Software Engineer',
          url: 'Example: https://www.youtube.com/watch?v=rw4s4M3hFfs&ab_channel=Cl%C3%A9mentMihailescu',
        },
      },
    };
    const userInput = ref<string>('');
    const inputLabel = computed<string>(
      () => inputParams[props.selectedTab].label[type.value]
    );
    const inputHint = computed<string>(
      () => inputParams[props.selectedTab].hint[type.value]
    );

    //loading
    const searchLoading = ref<boolean>(false);
    const onSearch = async () => {
      searchLoading.value = true;
      if (userInput.value !== '') {
        type.value === 'title'
          ? await store.dispatch(
              actions.value.fetchSimilarByTitle,
              userInput.value
            )
          : await store.dispatch(
              actions.value.fetchSimilarByUrl,
              userInput.value
            );
      }
      searchLoading.value = false;
    };

    //advanced settings
    const isAdvancedSettingsVisible = ref<boolean>(false);
    const setIsAdvancedSettingsVisible = () => {
      isAdvancedSettingsVisible.value = !isAdvancedSettingsVisible.value;
    };
    const commentsLimit = ref<number>(COMMENTS_LIMIT);
    const useTime = ref<boolean>(false);
    const useSubComments = ref<boolean>(true);
    const useAuthorAnswers = ref<boolean>(false);
    const { dateErr, beginDate, endDate, dateRules } = useDateRules();

    // form reset
    const agreeModalReset = reactive({
      is: false,
      title: 'Warning!',
      message: `<p class="q-mb-xs">Are you sure you want to reset the form?</p>
        <p>You will lose current settings.</p> `,
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
      useAuthorAnswers.value = false;
      beginDate.value = '';
      endDate.value = '';
      userInput.value = '';
      isAdvancedSettingsVisible.value = false;
      confirmedChannel.value
        ? store.dispatch(channelActions.resetConfirmed)
        : store.dispatch(videoActions.resetConfirmed);
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
      store.dispatch(actions.value.toggleInfoModal, true);
    };
    const resetConfirmed = () => {
      onReset();
    };
    const showConfirmModal = () => {
      store.dispatch(actions.value.toggleModal, true);
    };
    const evaluateLoading = ref<boolean>(false);
    const agreeModalEvaluate = reactive({
      is: false,
      title: 'Warning!',
      message: 'Are you sure you want to move to the evaluation process?',
      confirm: true,
      confirmHandler: () => {
        store.dispatch(evaluateActions.setParams, {
          params: {
            type: props.selectedTab,
            minComments: commentsLimit.value,
            useDates: useTime.value,
            beginDate: beginDate.value,
            endDate: endDate.value,
            useSubComments: useSubComments.value,
            useAuthorAnswers: useAuthorAnswers.value,
          },
        });
        store.dispatch(evaluateActions.setChannelResult, null);
        store.dispatch(evaluateActions.setVideoResult, null);
        props.selectedTab === 'channels'
          ? router.push(`/evaluate/channels/${confirmedChannel.value.id}`)
          : router.push(`/evaluate/videos/${confirmedVideo.value.id}`);
        agreeModalEvaluate.is = false;
      },
      cancelHandler: () => {
        agreeModalEvaluate.is = false;
      },
    });

    const onSubmit = async () => {
      evaluateLoading.value = true;
      if (!dateErr.value) {
        if (
          confirmedChannel.value === null &&
          confirmedVideo.value === null &&
          userInput.value !== ''
        ) {
          if (type.value === 'title') {
            await store.dispatch(
              actions.value.fetchSimilarByTitle,
              userInput.value
            );
          } else if (type.value === 'url') {
            await store.dispatch(
              actions.value.fetchSimilarByUrl,
              userInput.value
            );
          }
        } else {
          agreeModalEvaluate.is = true;
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
      commentsLimit,
      useTime,
      useSubComments,
      useAuthorAnswers,
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
    font-size: 0.95rem;
  }
}

.advanced-settings-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 4% auto 1%;
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
