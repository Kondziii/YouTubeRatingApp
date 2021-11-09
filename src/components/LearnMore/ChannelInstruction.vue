<template>
  <div>
    <ol>
      <li>
        Wybierz sposób wyszukania kanału - dostępne są dwie metody
        <ol>
          <li>
            <p>po tytule</p>
            <img src="../../assets/instruction_1.png" alt="" />
          </li>
          <li>druga</li>
        </ol>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChannelInstruction',

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
img {
  width: 80%;
  height: auto;
}
</style>
