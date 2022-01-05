<template>
  <transition
    enter-active-class="animate__animated animate__slideInLeft"
    leave-active-class="animate__animated animate__slideOutRight"
    appear
    mode="out-in"
  >
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
        <q-virtual-scroll v-if="videoItems.length !== 0" :items="videoItems">
          <template v-slot="{ item }">
            <transition-group name="list">
              <the-list-item
                class="list-item"
                :key="item.id"
                :img="item.video.image"
                :title="item.video.title"
                :id="item.video.id"
                :historyId="item.id"
                type="videos"
                model="history"
                :description="`Date of evaluation ${new Date(
                  item.result.date
                ).toLocaleString()}`"
                :score="{
                  vote: item.result.vote,
                  score: item.result.avg.compound.toFixed(3),
                }"
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
            :to="{ name: 'Home', query: { value: 'videos' } }"
            icon-right="arrow_forward"
          />
        </div>
      </q-card-section>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive, ref } from 'vue';
import { useStore } from '@/store';
import { useEvaluateActions } from '@/store/evaluate/actions';
import { VideoHistory } from '@/types/Video';
import TheListItem from '@/components/TheListItem.vue';
import BasicModal from '@/components/Modals/BasicModal.vue';
import { useRouter } from 'vue-router';
import { VideoMutations } from '@/store/video/mutations';

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

    const deleteVideo = async (id: string) => {
      modalDelete.is = true;
      nextTick(async () => {
        if (modal.value) {
          const answer = await modal.value.getConfirm();
          if (answer) {
            store.dispatch(evaluateActions.deleteVideoResult, id);
          }
        }
      });
    };

    const showResult = (id: string) => {
      const item = videoItems.value.find((videoItem) => videoItem.id === id);

      if (item) {
        store.commit(`video/${VideoMutations.SET_CONFIRMED_VIDEO}`, item.video);
        store.dispatch(evaluateActions.setVideoResult, item.result);

        router.push({
          path: `/evaluate/videos/${item.video.id}/result`,
          query: { history: 'true' },
        });
      }
    };

    return {
      deleteVideo,
      videoItems,
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
