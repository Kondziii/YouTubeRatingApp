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
        <q-virtual-scroll
          v-if="channelItems.length !== 0"
          :items="channelItems"
        >
          <template v-slot="{ item, index }">
            <transition-group name="list">
              <the-list-item
                :key="item.id"
                :img="item.channel.image"
                :title="itemTitle(index)"
                :id="item.channel.id"
                :historyId="item.id"
                type="channels"
                model="history"
                :description="itemDescription(index)"
                :score="{
                  vote: item.result.vote,
                  score: item.result.videosAvg.compound.toFixed(3),
                }"
                @delete="deleteChannel"
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
            :to="{ name: 'Home', query: { value: 'channels' } }"
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
import { ChannelHistory } from '@/types/Channel';
import TheListItem from '@/components/TheListItem.vue';
import BasicModal from '@/components/Modals/BasicModal.vue';
import { useEvaluateActions } from '@/store/evaluate/actions';
import { useRouter } from 'vue-router';
import { useChannelActions } from '@/store/channel/actions';

export default defineComponent({
  name: 'ChannelHistory',

  components: {
    TheListItem,
    BasicModal,
  },

  setup() {
    const modal = ref<typeof BasicModal>();
    const router = useRouter();
    const store = useStore();
    const evaluateActions = useEvaluateActions();
    const channelActions = useChannelActions();

    const channelItems = computed<ChannelHistory[]>(
      () => store.getters['evaluate/getChannelHistory']
    );

    const itemDescription = (index: string) => {
      const date = new Date(
        channelItems.value[index].result.date
      ).toLocaleString();
      return 'Date of evaluation ' + date;
    };

    const itemTitle = (index: string) => {
      return (
        channelItems.value[index].channel.title +
        ' [' +
        channelItems.value[index].result.evaluateParams.beginDate.replaceAll(
          '/',
          '.'
        ) +
        ' - ' +
        channelItems.value[index].result.evaluateParams.endDate.replaceAll(
          '/',
          '.'
        ) +
        ']'
      );
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

    const deleteChannel = (id: string) => {
      modalDelete.is = true;
      nextTick(async () => {
        if (modal.value) {
          const answer = await modal.value.getConfirm();
          if (answer) {
            store.dispatch(evaluateActions.deleteChannelResult, id);
          }
        }
      });
    };

    const showResult = (id: string) => {
      const item = channelItems.value.find(
        (channelItem) => channelItem.id === id
      );
      if (item) {
        store.dispatch(channelActions.setConfirmed, item.channel).then(() => {
          store.dispatch(evaluateActions.setChannelResult, item.result);
        });
        router.push({
          path: `/evaluate/channels/${item.channel.id}/result`,
          query: { history: 'true' },
        });
      }
    };

    return {
      channelItems,
      itemDescription,
      deleteChannel,
      modalDelete,
      modal,
      showResult,
      itemTitle,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-move {
  transition: transform 1s;
}
</style>
