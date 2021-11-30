<template>
  <q-footer elevated class="footer row items-center justify-around">
    <div class="col-sm-12 col-md-6">
      <div class="flex justify-center items-end q-gutter-md">
        <a href="https://p.lodz.pl/" target="_blank"
          ><img class="logo" src="../assets/logo-pł.png" alt=""
        /></a>
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
      <p class="rights">
        Copyright &copy; 2021/2022, Projekt inżynierski - Konrad Chojnacki
      </p>
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
  background: $dark-2;
  height: 25vh;
}

.logo {
  height: 70px;
  width: auto;
}

.name {
  font-size: 1.1rem;
  line-height: 150%;
  font-weight: 400;
  margin-bottom: 8px;
}

.name-detail {
  font-size: 0.9rem;
  color: $red;
  line-height: 120%;
  margin-bottom: 0;
}

.rights {
  font-size: 0.8rem;
}

body a {
  line-height: 1;
}

@media (min-width: $breakpoint-xs-max) {
  .footer {
    height: 25vh;
    font-size: 16px;
  }

  .logo {
    height: 70px;
    width: auto;
  }
}

@media (min-width: $breakpoint-md-max) {
  .footer {
    height: 20vh;
    font-size: 18px;
  }

  .logo {
    height: 80px;
    width: auto;
  }
}
</style>
