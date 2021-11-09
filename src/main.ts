import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import BasicContainer from './components/UI/BasicContainer.vue';
import BasicTabs from './components/UI/BasicTabs.vue';

createApp(App)
  .component('basic-container', BasicContainer)
  .component('basic-tabs', BasicTabs)
  .use(Quasar, quasarUserOptions)
  .use(store, key)
  .use(router)
  .mount('#app');
