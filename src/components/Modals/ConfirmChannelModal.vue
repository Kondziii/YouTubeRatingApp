<template>
  <confirm-modal-basic>
    <template #items>
      <confirm-channel-modal-item
        v-for="channel in channels"
        :key="channel.id.channelId"
        :img="channel.snippet.thumbnails.default.url"
        :title="channel.snippet.title"
        :id="channel.id?.channelId || channel.id"
        :selected="isChannelSelected(channel.id?.channelId || channel.id)"
        @onClick="selectChannel"
      ></confirm-channel-modal-item>
    </template>
  </confirm-modal-basic>
</template>

<script lang="ts">
import { ChannelBasic } from '@/types/Channel';
import { defineComponent, PropType } from 'vue';
import ConfirmChannelModalItem from '@/components/Modals/ConfirmChannelModalItem.vue';
import ConfirmModalBasic from '@/components/Modals/ConfirmModalBasic.vue';
import useConfirm from '@/hooks/useConfirm';

export default defineComponent({
  name: 'ConfirmChannelModal',

  components: {
    ConfirmChannelModalItem,
    ConfirmModalBasic,
  },

  props: {
    channels: {
      type: Array as PropType<ChannelBasic[]>,
      required: true,
    },
  },

  setup(props) {
    const { selectItem: selectChannel, isItemSelected: isChannelSelected } =
      useConfirm(
        typeof props.channels[0]?.id === 'string'
          ? props.channels[0].id
          : props.channels[0]?.id.channelId || ''
      );

    return {
      selectChannel,
      isChannelSelected,
    };
  },
});
</script>

<style lang="scss" scoped></style>
