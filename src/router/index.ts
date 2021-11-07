import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import TheForm from '../components/Home/TheForm.vue';
const TheInfo = () => import('../components/TheInfo.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/evaluate/channels',
        name: 'EvaluateChannelsForm',
        component: TheForm,
        alias: '/',
      },
      {
        path: '/evaluate/videos',
        name: 'EvaluateVideosForm',
        component: TheForm,
      },
    ],
  },
  {
    path: '/learn-more',
    name: 'LearnMore',
    component: TheInfo,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
