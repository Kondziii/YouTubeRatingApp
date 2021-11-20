<template>
  <confirm-modal-basic>
    <template #items>
      <the-list-item
        v-for="video in videos"
        type="videos"
        :id="video.id?.videoId || video.id"
        :key="video.id?.videoId || video.id"
        :img="video.snippet.thumbnails.default.url"
        :title="video.snippet.title"
        @onClick="selectVideo"
        :selected="isVideoSelected(video.id?.videoId || video.id)"
      ></the-list-item>
    </template>
  </confirm-modal-basic>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType } from 'vue';
import ConfirmModalBasic from '@/components/Modals/ConfirmModalBasic.vue';
import Video from '@/types/Video';
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
    },
  },

  setup(props, context) {
    onBeforeMount(() => {
      if (props.confirmed) {
        const confirmedVideo = props.videos.find((e) => {
          typeof e?.id === 'string' ? e.id : e.id.videoId;
        });
        if (confirmedVideo) {
          selectVideo(
            typeof confirmedVideo?.id === 'string'
              ? confirmedVideo.id
              : confirmedVideo.id.videoId
          );
        }
      } else {
        selectVideo(
          typeof props.videos[0]?.id === 'string'
            ? props.videos[0].id
            : props.videos[0]?.id.videoId || ''
        );
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
