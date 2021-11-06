<template>
  <q-footer elevated class="footer row items-center justify-around">
    <div class="col-sm-12 col-md-6">
      <div class="flex justify-center items-end q-gutter-md">
        <img class="logo" src="../assets/logo-pł.png" alt="" />
        <div>
          <p class="name">Politechnika Łódzka</p>
          <p class="name-detail">
            Wydział Fizyki Technicznej,<br />
            Matematyki Stosowanej i Informatyki
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 text-center">
      <p>Copyright &copy; 2021/2022, Projekt inżynierski - Konrad Chojnacki</p>
    </div>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheFooter',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '/src/styles/quasar.variables.scss';

.footer {
  background: rgba(41, 42, 44, 0.7);
  height: 20vh;
}

.logo {
  height: 80px;
  width: auto;
}

.name {
  font-size: 1.5em;
  line-height: 150%;
  font-weight: 400;
  margin-bottom: 8px;
}

.name-detail {
  font-size: 1em;
  color: $red;
  line-height: 120%;
  margin-bottom: 0;
}
</style>
