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
import { defineComponent, onBeforeMount, PropType } from 'vue';
import ConfirmChannelModalItem from '@/components/Modals/ConfirmChannelModalItem.vue';
import ConfirmModalBasic from '@/components/Modals/ConfirmModalBasic.vue';

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

    selectedItemId: {
      type: String,
      required: false,
    },
  },

  setup(props, context) {
    onBeforeMount(() => {
      context.emit(
        'update:selectedItemId',
        typeof props.channels[0]?.id === 'string'
          ? props.channels[0].id
          : props.channels[0]?.id.channelId || ''
      );
    });

    const selectChannel = (id: string) => {
      context.emit('update:selectedItemId', id);
    };

    const isChannelSelected = (id: string) => {
      return props.selectedItemId === id;
    };

    return {
      selectChannel,
      isChannelSelected,
    };
  },
});
</script>

<style lang="scss" scoped></style>
