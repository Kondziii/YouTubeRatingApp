<template>
  <basic-container type="card--transparent">
    <the-header></the-header>
    <basic-tabs
      :items="items"
      :selectedTab="selectedTab"
      @select="setSelectedTab"
    ></basic-tabs>

    <the-form
      :selectedTab="selectedTab"
      :key="selectedTab"
      :confirmed="confirmedChannel"
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
  </basic-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import TheHeader from '@/components/Home/TheHeader.vue';
import TheForm from '@/components/Home/TheForm.vue';
import useTabs from '@/hooks/useTabs';
import ConfirmChannelModal from '@/components/Modals/ConfirmChannelModal.vue';
import { useStore } from '@/store/index';
import { ChannelBasic } from '@/types/Channel';
import { useChannelActions } from '@/store/channel/actions';
import ConfirmChannelInfoModal from '@/components/Modals/ConfirmChannelInfoModal.vue';

export default defineComponent({
  name: 'Home',

  components: {
    TheHeader,
    TheForm,
    ConfirmChannelModal,
    ConfirmChannelInfoModal,
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
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';
</style>
