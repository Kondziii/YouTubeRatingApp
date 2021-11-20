<template>
  <basic-container type="card--transparent">
    <the-header></the-header>
    <basic-tabs
      :items="items"
      :selectedTab="selectedTab"
      :channelCondition="true"
      @select="setSelectedTab"
      @warn="showAgreeModalSelectTab"
    ></basic-tabs>
    <the-form
      :selectedTab="selectedTab"
      :key="selectedTab"
      :confirmed="confirmedChannel || confirmedVideo"
    ></the-form>
    <confirm-channel-modal
      v-if="isChannelModalVisible"
      :channels="channels"
      @cancel="hideChannelsModal"
      @confirm="confirmChannelsModal"
      v-model:selectedItemId="selectedChannelId"
      :confirmed="confirmedChannel?.id"
    ></confirm-channel-modal>
    <confirm-channel-info-modal
      v-if="isChannelInfoModalVisible"
      @close="hideChannelInfoModal"
    ></confirm-channel-info-modal>
    <confirm-video-modal
      v-if="isVideoModalVisible"
      :videos="videos"
      v-model:selectedItemId="selectedVideoId"
      @cancel="hideVideosModal"
      @confirm="confirmVideosModal"
      :confirmed="confirmedVideo?.id"
    ></confirm-video-modal>
    <basic-modal
      v-if="agreeModalSelectTab.is"
      :title="agreeModalSelectTab.title"
      :message="agreeModalSelectTab.message"
      :confirm="agreeModalSelectTab.confirm"
      :htmlMessage="agreeModalSelectTab.htmlMessage"
      @close="agreeModalSelectTab.cancelHandler"
      @confirm="agreeModalSelectTab.confirmHandler"
    ></basic-modal>
  </basic-container>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import TheHeader from '@/components/Home/TheHeader.vue';
import TheForm from '@/components/Home/TheForm.vue';
import useTabs from '@/hooks/useTabs';
import ConfirmChannelModal from '@/components/Modals/ConfirmChannelModal.vue';
import { useStore } from '@/store/index';
import { ChannelBasic } from '@/types/Channel';
import { useChannelActions } from '@/store/channel/actions';
import ConfirmChannelInfoModal from '@/components/Modals/ConfirmChannelInfoModal.vue';
import BasicModal from '@/components/Modals/BasicModal.vue';
import ConfirmVideoModal from '@/components/Modals/ConfirmVideoModal.vue';
import Video, { VideoFullInfo } from '@/types/Video';
import { useVideoActions } from '@/store/video/actions';

export default defineComponent({
  name: 'Home',

  components: {
    TheHeader,
    TheForm,
    ConfirmChannelModal,
    ConfirmChannelInfoModal,
    BasicModal,
    ConfirmVideoModal,
  },

  setup() {
    const { items, selectedTab, setSelectedTab } = useTabs([
      {
        label: 'Kanały',
        value: 'channels',
      },
      {
        label: 'Filmiki',
        value: 'videos',
      },
    ]);

    const store = useStore();
    const channelActions = useChannelActions();
    const videoActions = useVideoActions();

    // Channel confirm
    const isChannelModalVisible = computed<boolean>(
      () => store.getters['channel/getModalState']
    );
    const channels = computed<ChannelBasic[]>(
      () => store.getters['channel/getChannels']
    );
    const selectedChannelId = ref<string>('');
    const hideChannelsModal = () => {
      store.dispatch(channelActions.toggleModal, false);
    };
    const confirmChannelsModal = () => {
      store.dispatch(channelActions.toggleModal, false);
      store.dispatch(
        channelActions.fetchFullInfoAboutChannel,
        selectedChannelId.value
      );
    };

    // Video confirm
    const isVideoModalVisible = computed<boolean>(
      () => store.getters['video/getModalState']
    );
    const videos = computed<Video[]>(() => store.getters['video/getVideos']);
    const selectedVideoId = ref<string>('');
    const hideVideosModal = () => {
      store.dispatch(videoActions.toggleModal, false);
    };
    const confirmVideosModal = () => {
      store.dispatch(videoActions.toggleModal, false);
      store.dispatch(
        videoActions.fetchFullInfoAboutVideo,
        selectedVideoId.value
      );
    };
    const confirmedVideo = computed<VideoFullInfo>(
      () => store.getters['video/getConfirmedVideo']
    );

    //Info modals
    const isChannelInfoModalVisible = computed<boolean>(() => {
      return store.getters['channel/getInfoModalState'];
    });
    const hideChannelInfoModal = () => {
      store.dispatch(channelActions.toggleInfoModal, false);
    };

    const confirmedChannel = computed(
      () => store.getters['channel/getConfirmedChannel']
    );

    const agreeModalSelectTab = reactive({
      is: false,
      title: 'Uwaga!',
      message: `<p class="q-mb-xs">Czy na pewno chcesz zmienić kategorię wyszukiwania?</p>
        <p>Utracisz wszystkie bieżące ustawienia.</p>`,
      confirm: true,
      htmlMessage: true,
      confirmHandler: () => {
        selectedTab.value = nextTab.value;
        store.dispatch(channelActions.resetConfirmedChannel);
        agreeModalSelectTab.is = false;
      },
      cancelHandler: () => {
        agreeModalSelectTab.is = false;
      },
    });

    const nextTab = ref<string>('');
    const showAgreeModalSelectTab = (val: string) => {
      agreeModalSelectTab.is = true;
      nextTab.value = val;
    };

    return {
      selectedTab,
      items,
      setSelectedTab,
      isChannelModalVisible,
      channels,
      hideChannelsModal,
      confirmChannelsModal,
      selectedChannelId,
      isChannelInfoModalVisible,
      hideChannelInfoModal,
      confirmedChannel,
      agreeModalSelectTab,
      showAgreeModalSelectTab,
      isVideoModalVisible,
      videos,
      selectedVideoId,
      hideVideosModal,
      confirmVideosModal,
      confirmedVideo,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';
</style>
