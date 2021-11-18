<template>
  <div :class="itemClasses" @click="select">
    <div class="col-8 flex items-center justify-start no-wrap">
      <q-avatar class="avatar">
        <q-img :src="img" />
      </q-avatar>
      <p>{{ title }}</p>
    </div>
    <div class="col-4">
      <a
        v-if="model === ''"
        :href="urlLink"
        target="_blank"
        class="flex items-center justify-center"
        @click.stop
      >
        <q-icon name="fab fa-youtube"></q-icon>
      </a>
      <div v-else class="q-mr-sm flex justify-center items-center">
        <q-btn
          @click.stop
          id="details"
          color="red"
          flat
          icon="details"
          @click="openDetails"
        >
          <q-tooltip>Szczegóły</q-tooltip>
        </q-btn>
        <q-btn
          @click.stop
          id="clear"
          color="red"
          icon="clear"
          @click="resetConfirmed"
        >
          <q-tooltip>Anuluj</q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

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
      //formItem or default
      type: String,
      required: false,
      default: '',
    },
  },

  emits: ['onClick', 'openDetails', 'reset', 'showChannelList'],

  setup(props, context) {
    const urlLink = computed(
      () => `https://www.youtube.com/channel/${props.id}`
    );

    const select = () => {
      console.log('siema');
      if (props.model === 'formItem') {
        context.emit('showChannelList');
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
      ];
    });

    const openDetails = () => {
      context.emit('openDetails');
    };

    const resetConfirmed = () => {
      context.emit('reset');
    };

    return {
      urlLink,
      select,
      itemClasses,
      openDetails,
      resetConfirmed,
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
    text-decoration: none;
    color: white;
    border-radius: 20px;
    font-size: 0.9rem;
    background: $red;
    width: fit-content;
    padding: 4px 10px;

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

.avatar {
  width: 60px;
  height: auto;
}

//////////////////props class
.formItem {
  background: $dark-4;
}

@media (min-width: $breakpoint-xs-max) {
  a {
    &::before {
      content: 'Zobacz w' !important;
      margin-right: 5px;
    }
  }

  .avatar {
    width: 50px;
  }
}
</style>
