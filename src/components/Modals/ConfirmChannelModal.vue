<template>
  <q-dialog v-model="is" persistent>
    <q-card class="card" style="width: 700px; max-width: 90vw">
      <q-card-section class="flex justify-between">
        <div class="text-h5">Potwierdź swój wybór</div>
        <q-btn id="close" dense icon="close" @click="cancel">
          <q-tooltip>Anuluj</q-tooltip>
        </q-btn>
      </q-card-section>
      <q-separator dark></q-separator>
      <q-scroll-area dark style="height: 70vh; max-width: 100%">
        <q-card-section>
          <confirm-channel-modal-item
            v-for="channel in channels"
            :key="channel.id.channelId"
            :img="channel.snippet.thumbnails.default.url"
            :title="channel.snippet.title"
            :id="channel.id?.channelId || channel.id"
            :selected="isSelected(channel.id?.channelId || channel.id)"
            @onClick="setSelectedChannel"
          ></confirm-channel-modal-item>
          <p class="text-center not-found">Nie znaleziono więcej rezultatów</p>
        </q-card-section>
      </q-scroll-area>
      <q-separator dark></q-separator>
      <q-card-section>
        <q-card-actions align="right" class="q-mx-sm q-mb-sm">
          <q-btn flat label="Anuluj" color="red" @click="cancel" />
          <q-btn label="Zatwerdź" color="red" @click="confirm" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useChannelActions } from '@/store/channel/actions';
import { ChannelBasic } from '@/types/Channel';
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from '../../store/index';
import ConfirmChannelModalItem from '@/components/Modals/ConfirmChannelModalItem.vue';

export default defineComponent({
  name: 'ConfirmChannelModal',

  components: {
    ConfirmChannelModalItem,
  },

  setup() {
    const store = useStore();
    const channelActions = useChannelActions();
    const is = computed<boolean>(() => store.getters['channel/getModalState']);
    const channels = computed<ChannelBasic[]>(
      () => store.getters['channel/getChannels']
    );

    const confirm = () => {
      store.dispatch(channelActions.toggleModal, false);
    };

    const cancel = () => {
      store.dispatch(channelActions.toggleModal, false);
    };

    //select logic
    watch(is, () => {
      selectedChannel.value =
        typeof channels.value[0]?.id === 'string'
          ? channels.value[0].id
          : channels.value[0]?.id.channelId || '';
    });

    const selectedChannel = ref<string>('');

    const isSelected = (id: string) => {
      return selectedChannel.value === id;
    };

    const setSelectedChannel = (id: string) => {
      selectedChannel.value = id;
    };

    return {
      is,
      channels,
      confirm,
      cancel,
      setSelectedChannel,
      isSelected,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

.card {
  @include card($dark-1);
  margin: 0;

  .modal-actions {
    background: rgba(0, 0, 0, 0.5);
  }

  .not-found {
    font-size: 0.9em;
    margin-top: 5%;
  }
}
</style>
