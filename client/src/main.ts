import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import BasicContainer from './components/UI/BasicContainer.vue';
import BasicTabs from './components/UI/BasicTabs.vue';
import BasicToolbar from './components/UI/BasicToolbar.vue';
import YouTube from 'vue3-youtube';
import { dragscrollNext } from 'vue-dragscroll';

createApp(App)
  .component('basic-container', BasicContainer)
  .component('basic-tabs', BasicTabs)
  .component('basic-toolbar', BasicToolbar)
  .component('youtube', YouTube)
  .use(Quasar, quasarUserOptions)
  .use(store, key)
  .use(router)
  .directive('dragscroll', dragscrollNext)
  .mount('#app');
