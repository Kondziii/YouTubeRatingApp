<template>
  <confirm-modal-basic>
    <template #items>
      <the-list-item
        v-for="channel in channels"
        type="channels"
        :key="channel.id"
        :img="channel.image"
        :title="channel.title"
        :id="channel.id"
        :selected="isChannelSelected(channel.id)"
        @onClick="selectChannel"
      ></the-list-item>
    </template>
  </confirm-modal-basic>
</template>

<script lang="ts">
import { Channel } from '@/types/Channel';
import { defineComponent, onBeforeMount, PropType } from 'vue';
import TheListItem from '@/components/TheListItem.vue';
import ConfirmModalBasic from '@/components/Modals/ConfirmModalBasic.vue';

export default defineComponent({
  name: 'ConfirmChannelModal',

  components: {
    TheListItem,
    ConfirmModalBasic,
  },

  props: {
    channels: {
      type: Array as PropType<Channel[]>,
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
        selectChannel(props.confirmed);
      } else {
        selectChannel(props.channels[0].id);
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
