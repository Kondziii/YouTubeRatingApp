<template>
  <div :class="itemClasses" @click="select" class="q-my-xs">
    <div class="col-8 flex items-center justify-start no-wrap">
      <q-avatar
        :class="type === 'channels' ? 'avatar-channel' : 'avatar-video'"
      >
        <q-img :src="img" />
      </q-avatar>
      <div class="flex column justify-start" :style="{ width: '100%' }">
        <p>{{ title }}</p>
        <p v-if="!!description" class="description">{{ description }}</p>
      </div>
    </div>
    <div class="col-4 flex justify-center items-center">
      <q-btn
        v-if="model === ''"
        type="a"
        :href="urlLink"
        target="_blank"
        id="yt"
        icon-right="fab fa-youtube"
        color="red"
        @click.stop
      >
        {{ $q.screen.gt.sm ? 'View in' : '' }}
      </q-btn>

      <div
        v-else-if="model === 'formItem'"
        class="q-mr-sm flex justify-center items-center"
      >
        <q-btn
          @click.stop
          id="details"
          color="red"
          flat
          icon="details"
          @click="openDetails"
        >
          <q-tooltip>Details</q-tooltip>
        </q-btn>
        <q-btn
          @click.stop
          id="clear"
          color="red"
          icon="clear"
          @click="resetConfirmed"
        >
          <q-tooltip>Cancel</q-tooltip>
        </q-btn>
      </div>

      <div v-else class="q-mr-sm flex justify-center items-center q-gutter-sm">
        <q-btn
          type="a"
          :href="urlLink"
          target="_blank"
          icon="fab fa-youtube"
          color="red"
          flat
          id="clear"
        >
          <q-tooltip>View in YouTube</q-tooltip>
        </q-btn>
        <q-btn
          @click.stop
          id="clear"
          color="red"
          icon="clear"
          class="link"
          @click="deleteItem"
        >
          <q-tooltip>Delete</q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Evaluate from '@/types/Evaluate';
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ChannelListItem',

  props: {
    img: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    id: {
      type: String,
      required: true,
    },

    selected: {
      type: Boolean,
      required: false,
      default: false,
    },

    model: {
      //formItem, history or default
      type: String,
      required: false,
      default: '',
    },

    type: {
      //channel or video
      type: String as PropType<Evaluate>,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },

    index: {
      type: Number,
      required: false,
    },
  },

  emits: ['onClick', 'openDetails', 'reset', 'showList', 'delete'],

  setup(props, context) {
    const urlLink = computed(() => {
      if (props.type === 'channels') {
        return `https://www.youtube.com/channel/${props.id}`;
      } else if (props.type === 'videos') {
        return `https://www.youtube.com/watch?v=${props.id}`;
      }
      return '';
    });

    const select = () => {
      if (props.model === 'formItem') {
        context.emit('showList');
      } else if (props.model === 'history') {
        context.emit('onClick', props.index);
      } else {
        context.emit('onClick', props.id);
      }
    };

    const itemClasses = computed(() => {
      return [
        'row',
        'justify-between',
        'items-center',
        { selected: props.selected },
        { formItem: props.model === 'formItem' },
        { historyItem: props.model === 'history' },
      ];
    });

    const openDetails = () => {
      context.emit('openDetails');
    };

    const resetConfirmed = () => {
      context.emit('reset');
    };

    const deleteItem = () => {
      context.emit('delete', props.index);
    };

    return {
      urlLink,
      select,
      itemClasses,
      openDetails,
      resetConfirmed,
      deleteItem,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

.row {
  width: 100%;
  margin: 2% auto;
  background: $dark-2;
  border-radius: 35px;
  box-shadow: 1px 8px 9px -5px rgba(75, 75, 75, 0.46);
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    box-shadow: 1px 8px 9px -5px rgba(100, 100, 100, 0.7);
  }

  a {
    &::before {
      content: '';
    }

    &:hover {
      opacity: 0.9;
    }
  }
}

p {
  margin: 0 5%;
  font-size: 0.9rem;
}

.selected {
  background: $grey-8;
}

.avatar-video {
  width: 80px;
  height: auto;
  object-fit: cover;
  margin-left: -5px;
}

.avatar-channel {
  width: 60px;
  height: auto;
  object-fit: cover;
}

//////////////////props class
.formItem {
  background: $dark-4;
}

.historyItem {
  .avatar-video {
    width: 80px;
    height: auto;
  }
}

.description {
  font-size: 0.8rem;
  color: #aaa;
}

@media (min-width: $breakpoint-xs-max) {
  .historyItem {
    .avatar-video {
      width: 100px;
      height: auto;
    }
  }
}
</style>
