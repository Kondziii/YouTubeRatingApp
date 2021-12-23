<template>
  <basic-container type="card--transparent">
    <the-form-header></the-form-header>
    <basic-tabs
      :items="items"
      :selectedTab="selectedTab"
      :condition="!!confirmedChannel || !!confirmedVideo"
      @select="setSelectedTab"
      @warn="showAgreeModalSelectTab"
    ></basic-tabs>
    <the-form
      :selectedTab="selectedTab"
      :key="selectedTab"
      :confirmed="confirmedChannel || confirmedVideo"
    ></the-form>
    <confirm-channel-modal
      v-if="channelConfirmModal.isVisible.value"
      :channels="channelConfirmModal.items.value"
      @cancel="channelConfirmModal.hideModal"
      @confirm="channelConfirmModal.confirmModal"
      v-model:selectedItemId="channelConfirmModal.selectedItemId.value"
      :confirmed="confirmedChannel?.id"
    ></confirm-channel-modal>
    <confirm-channel-info-modal
      v-if="channelInfoModal.isVisible.value"
      @close="channelInfoModal.hideModal"
    ></confirm-channel-info-modal>
    <confirm-video-modal
      v-if="videoConfirmModal.isVisible.value"
      :videos="videoConfirmModal.items.value"
      v-model:selectedItemId="videoConfirmModal.selectedItemId.value"
      @cancel="videoConfirmModal.hideModal"
      @confirm="videoConfirmModal.confirmModal"
      :confirmed="confirmedVideo?.id"
    ></confirm-video-modal>
    <confirm-video-info-modal
      v-if="videoInfoModal.isVisible.value"
      @close="videoInfoModal.hideModal"
    >
    </confirm-video-info-modal>
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
import TheFormHeader from '@/components/Home/TheFormHeader.vue';
import TheForm from '@/components/Home/TheForm.vue';
import useTabs from '@/hooks/useTabs';
import ConfirmChannelModal from '@/components/Modals/ConfirmChannelModal.vue';
import { useStore } from '@/store/index';
import { Channel } from '@/types/Channel';
import { useChannelActions } from '@/store/channel/actions';
import ConfirmChannelInfoModal from '@/components/Modals/ConfirmChannelInfoModal.vue';
import BasicModal from '@/components/Modals/BasicModal.vue';
import ConfirmVideoModal from '@/components/Modals/ConfirmVideoModal.vue';
import { Video } from '@/types/Video';
import { useVideoActions } from '@/store/video/actions';
import ConfirmVideoInfoModal from '@/components/Modals/ConfirmVideoInfoModal.vue';
import useConfirmModal from '@/hooks/useConfirmModal';
import useInfoModal from '@/hooks/useInfoModal';

export default defineComponent({
  name: 'Home',

  components: {
    TheFormHeader,
    TheForm,
    ConfirmChannelModal,
    ConfirmChannelInfoModal,
    BasicModal,
    ConfirmVideoModal,
    ConfirmVideoInfoModal,
  },

  setup() {
    const { items, selectedTab, setSelectedTab } = useTabs([
      {
        label: 'Channels',
        value: 'channels',
      },
      {
        label: 'Videos',
        value: 'videos',
      },
    ]);

    const store = useStore();
    const channelActions = useChannelActions();
    const videoActions = useVideoActions();

    const getters = {
      channels: {
        isVisible: 'channel/getModalState',
        items: 'channel/getChannels',
      },
      videos: {
        isVisible: 'video/getModalState',
        items: 'video/getVideos',
      },
    };

    //confirm modals
    const channelConfirmModal = useConfirmModal<Channel>(
      channelActions,
      getters.channels
    );

    const videoConfirmModal = useConfirmModal<Video>(
      videoActions,
      getters.videos
    );

    //confirmed getters
    const confirmedVideo = computed<Video>(
      () => store.getters['video/getConfirmedVideo']
    );

    const confirmedChannel = computed<Channel>(
      () => store.getters['channel/getConfirmedChannel']
    );

    //channel info modal
    const infoGetters = {
      channels: {
        isVisible: 'channel/getInfoModalState',
      },
      videos: {
        isVisible: 'video/getInfoModalState',
      },
    };

    const channelInfoModal = useInfoModal(channelActions, infoGetters.channels);

    const videoInfoModal = useInfoModal(videoActions, infoGetters.videos);

    //changing tab when confirmed video or channel modal
    const agreeModalSelectTab = reactive({
      is: false,
      title: 'Warning!',
      message: `<p class="q-mb-xs">Are you sure you want to change search category?</p>
        <p>You will lose current settings.</p>`,
      confirm: true,
      htmlMessage: true,
      confirmHandler: () => {
        selectedTab.value === 'channels'
          ? store.dispatch(channelActions.resetConfirmed)
          : store.dispatch(videoActions.resetConfirmed);
        selectedTab.value = nextTab.value;
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
      channelConfirmModal,
      channelInfoModal,
      confirmedChannel,
      videoConfirmModal,
      videoInfoModal,
      confirmedVideo,
      agreeModalSelectTab,
      showAgreeModalSelectTab,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';
</style>
