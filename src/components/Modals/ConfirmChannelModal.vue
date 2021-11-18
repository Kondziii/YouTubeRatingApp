<template>
  <confirm-modal-basic>
    <template #items>
      <channel-list-item
        v-for="channel in channels"
        :key="channel.id.channelId"
        :img="channel.snippet.thumbnails.default.url"
        :title="channel.snippet.title"
        :id="channel.id?.channelId || channel.id"
        :selected="isChannelSelected(channel.id?.channelId || channel.id)"
        @onClick="selectChannel"
      ></channel-list-item>
    </template>
  </confirm-modal-basic>
</template>

<script lang="ts">
import { ChannelBasic } from '@/types/Channel';
import { defineComponent, onBeforeMount, PropType } from 'vue';
import ChannelListItem from '@/components/Channel/ChannelListItem.vue';
import ConfirmModalBasic from '@/components/Modals/ConfirmModalBasic.vue';

export default defineComponent({
  name: 'ConfirmChannelModal',

  components: {
    ChannelListItem,
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

    confirmed: {
      type: String,
      required: false,
      default: '',
    },
  },

  setup(props, context) {
    onBeforeMount(() => {
      if (props.confirmed) {
        const confirmedChannel = props.channels.find((e) => {
          typeof e?.id === 'string' ? e.id : e.id.channelId;
        });
        if (confirmedChannel) {
          context.emit(
            'update:selectedItemId',
            typeof confirmedChannel?.id === 'string'
              ? confirmedChannel.id
              : confirmedChannel.id.channelId
          );
        }
      } else {
        context.emit(
          'update:selectedItemId',
          typeof props.channels[0]?.id === 'string'
            ? props.channels[0].id
            : props.channels[0]?.id.channelId || ''
        );
      }
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
