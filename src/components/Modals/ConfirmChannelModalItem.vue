<template>
  <div :class="itemClasses" @click="select">
    <div class="col-9 flex items-center justify-start no-wrap">
      <q-avatar>
        <q-img :src="img" />
      </q-avatar>
      <p>{{ title }}</p>
    </div>
    <div class="col-3">
      <a
        :href="urlLink"
        target="_blank"
        class="flex items-center justify-center"
        @click.stop
      >
        <q-icon name="fab fa-youtube"></q-icon>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ConfirmChannelModalItem',

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
  },

  emits: ['onClick'],

  setup(props, context) {
    const urlLink = computed(
      () => `https://www.youtube.com/channel/${props.id}`
    );

    const select = () => {
      context.emit('onClick', props.id);
    };

    const itemClasses = computed(() => {
      return [
        'row',
        'justify-between',
        'items-center',
        { selected: props.selected },
      ];
    });

    return {
      urlLink,
      select,
      itemClasses,
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
  border-radius: 30px;
  box-shadow: 1px 8px 9px -5px rgba(75, 75, 75, 0.46);
  cursor: pointer;

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

@media (min-width: $breakpoint-xs-max) {
  a {
    &::before {
      content: 'Zobacz w' !important;
      margin-right: 5px;
    }
  }
}
</style>
