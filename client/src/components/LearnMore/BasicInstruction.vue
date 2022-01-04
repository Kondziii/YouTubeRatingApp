<template>
  <div class="instruction-container">
    <ol>
      <li>
        <p>Select search method for a {{ type }} - available two options</p>
        <ol type="a" class="nested">
          <li>
            <p>based on title</p>
            <slot name="title-img"></slot>
            <p class="warn">Warning!</p>
            <p>
              There isn't necessary to enter whole name of the {{ type }}.
              However, it's recommended because it increases the possibility to
              find the {{ type }} that you intend to find.
            </p>
          </li>
          <li>
            <p>based on url address</p>
            <slot name="url-img"></slot>
            <p class="warn">Warning!</p>
            <slot name="links"></slot>
          </li>
        </ol>
      </li>
      <li>
        <p>
          Enter the name or link to the {{ type }} according to chosen option
          and then press button "Search"
        </p>
      </li>
      <li>
        <p>
          You should see the window that contains one or more {{ type }}s that
          corresponds to the entered value. Just find your destination
          {{ type }} and confirm it.
        </p>
      </li>
      <li>
        <p>Now you can open advanced settings and modify its default values.</p>
        <slot name="advanced-settings"></slot>
      </li>
      <li>
        <p>
          Finally, press button "Evaluate" and wait for the evaluation result.
        </p>
        <p class="warn">Warning!</p>
        <slot name="time-warn"></slot>
      </li>
    </ol>

    <p>
      If you get to this section, you probably know everything you have to know
      about the app. Now is the time to evaluate something!
    </p>
    <q-card-actions class="flex justify-end">
      <q-btn
        :style="{ fontSize: '0.8rem !important' }"
        label="Move to evaluate"
        type="button"
        color="red"
        icon-right="arrow_forward"
        @click="directToApp"
      />
    </q-card-actions>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import Evaluate from '@/types/Evaluate';

export default defineComponent({
  name: 'BasicInstruction',

  props: {
    model: {
      type: String as PropType<Evaluate>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();

    const directToApp = () => {
      router.push('/');
    };
    const type = computed(() =>
      props.model === 'videos' ? 'video' : 'channel'
    );

    return {
      type,
      directToApp,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';
@import 'src/styles/instruction';

ol * {
  @include list();
}
</style>
