<template>
  <basic-container type="card--transparent">
    <the-header></the-header>
    <basic-tabs
      :items="items"
      :selectedTab="selectedTab"
      @select="setSelectedTab"
    ></basic-tabs>
    <the-form :selectedTab="selectedTab" :key="selectedTab"></the-form>
    <confirm-channel-modal
      v-if="isChannelModalVisible"
      :channels="channels"
      @cancel="hideChannelsModal"
      @confirm="confirmChannelsModal"
    ></confirm-channel-modal>
  </basic-container>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import TheHeader from '@/components/Home/TheHeader.vue';
import TheForm from '@/components/Home/TheForm.vue';
import useTabs from '@/hooks/useTabs';
import ConfirmChannelModal from '@/components/Modals/ConfirmChannelModal.vue';
import { useStore } from '@/store/index';
import { ChannelBasic } from '@/types/Channel';
import { useChannelActions } from '@/store/channel/actions';

export default defineComponent({
  name: 'Home',

  components: { TheHeader, TheForm, ConfirmChannelModal },

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
    const isChannelModalVisible = computed<boolean>(
      () => store.getters['channel/getModalState']
    );
    const channels = computed<ChannelBasic[]>(
      () => store.getters['channel/getChannels']
    );

    const hideChannelsModal = () => {
      store.dispatch(channelActions.toggleModal, false);
    };

    const confirmChannelsModal = () => {
      store.dispatch(channelActions.toggleModal, false);
    };

    return {
      selectedTab,
      items,
      setSelectedTab,
      isChannelModalVisible,
      channels,
      hideChannelsModal,
      confirmChannelsModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';
</style>
