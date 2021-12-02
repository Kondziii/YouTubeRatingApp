<template>
  <confirm-modal-basic>
    <template #items>
      <the-list-item
        v-for="video in videos"
        type="videos"
        :id="video.id"
        :key="video.id"
        :img="video.image"
        :title="video.title"
        @onClick="selectVideo"
        :selected="isVideoSelected(video.id)"
      ></the-list-item>
    </template>
  </confirm-modal-basic>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType } from 'vue';
import ConfirmModalBasic from '@/components/Modals/ConfirmModalBasic.vue';
import { Video } from '@/types/Video';
import TheListItem from '@/components/TheListItem.vue';

export default defineComponent({
  name: 'ConfirmVideoModal',

  components: {
    ConfirmModalBasic,
    TheListItem,
  },

  props: {
    videos: {
      type: Array as PropType<Video[]>,
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
        selectVideo(props.confirmed);
      } else {
        selectVideo(props.videos[0].id);
      }
    });

    const selectVideo = (id: string) => {
      context.emit('update:selectedItemId', id);
    };

    const isVideoSelected = (id: string) => {
      return props.selectedItemId === id;
    };

    return {
      selectVideo,
      isVideoSelected,
    };
  },
});
</script>

<style scoped></style>
