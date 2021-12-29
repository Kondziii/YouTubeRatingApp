<template>
  <div>
    <basic-modal
      ref="modal"
      v-if="modalDelete.is"
      :title="modalDelete.title"
      :message="modalDelete.message"
      :confirm="modalDelete.confirm"
      :htmlMessage="modalDelete.htmlMessage"
      @close="modalDelete.cancelHandler"
      @confirm="modalDelete.confirmHandler"
    ></basic-modal>
    <q-card-section>
      <q-virtual-scroll
        v-if="videoItems.length !== 0"
        style="max-height: 100vh"
        :items="videoItems"
      >
        <template v-slot="{ item, index }">
          <transition-group
            enter-active-class="animate__animated animate__slideInLeft"
            leave-active-class="animate__animated animate__slideInRight"
            appear
            mode="out-in"
            name="list"
          >
            <the-list-item
              :key="item.video.id"
              :img="item.video.image"
              :title="item.video.title"
              :id="item.video.id"
              type="videos"
              model="history"
              :description="itemDescription(index)"
              :index="index"
              @delete="deleteVideo"
              @onClick="showResult"
            ></the-list-item>
          </transition-group>
        </template>
      </q-virtual-scroll>
      <div v-else class="flex column justify-center">
        <p
          :style="{
            fontSize: '1rem',
            fontStyle: 'italic',
            textAlign: 'center',
          }"
        >
          You haven't got any saved video evaluation results.
        </p>
        <q-btn
          class="q-mx-auto"
          :style="{ fontSize: '0.8rem !important', width: 'fit-content' }"
          label="Move to evaluate"
          type="button"
          color="red"
          :to="{ name: 'Home' }"
          icon-right="arrow_forward"
        />
      </div>
    </q-card-section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive, ref } from 'vue';
import { useStore } from '@/store';
import { useEvaluateActions } from '@/store/evaluate/actions';
import { VideoHistory } from '@/types/Video';
import TheListItem from '@/components/TheListItem.vue';
import BasicModal from '@/components/Modals/BasicModal.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'VideoHistory',

  components: {
    TheListItem,
    BasicModal,
  },

  setup() {
    const router = useRouter();
    const modal = ref<typeof BasicModal>();
    const store = useStore();
    const evaluateActions = useEvaluateActions();
    const videoItems = computed<VideoHistory[]>(
      () => store.getters['evaluate/getVideoHistory']
    );

    const itemDescription = (index: string) => {
      const date = new Date(
        videoItems.value[index].result.date
      ).toLocaleString();
      return 'Date of evaluation ' + date;
    };

    const modalDelete = reactive({
      is: false,
      title: 'Warning!',
      message: `<p class="q-mb-xs">Are you sure you want to delete this item?</p>`,
      confirm: true,
      htmlMessage: true,
      confirmHandler: () => {
        modalDelete.is = false;
      },
      cancelHandler: () => {
        modalDelete.is = false;
      },
    });

    const deleteVideo = async (index: number) => {
      modalDelete.is = true;
      nextTick(async () => {
        if (modal.value) {
          const answer = await modal.value.getConfirm();
          if (answer) {
            store.dispatch(evaluateActions.deleteVideoResult, index);
          }
        }
      });
    };

    const showResult = (index: string) => {
      const historyItem = videoItems[index];
    };

    return {
      deleteVideo,
      videoItems,
      itemDescription,
      modalDelete,
      modal,
      showResult,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-move {
  transition: transform 1s;
}
</style>
