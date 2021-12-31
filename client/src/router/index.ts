import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
const Info = () => import('../views/Info.vue');
const EvaluateChannel = () => import('../views/EvaluateChannel.vue');
const EvaluateVideo = () => import('../views/EvaluateVideo.vue');
const EvaluateVideoResult = () => import('../views/EvaluateVideoResult.vue');
const History = () => import('../views/History.vue');
const EvaluateChannelResult = () =>
  import('../views/EvaluateChannelResult.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/learn-more',
    name: 'LearnMore',
    component: Info,
  },
  {
    path: '/evaluate/channels/:id',
    name: 'EvaluateChannel',
    component: EvaluateChannel,
    props: true,
    children: [
      {
        path: 'result',
        name: 'EvaluateChannelResult',
        component: EvaluateChannelResult,
      },
    ],
  },
  {
    path: '/evaluate/videos/:id',
    name: 'EvaluateVideo',
    component: EvaluateVideo,
    props: true,
    children: [
      {
        path: 'result',
        name: 'EvaluateVideoResult',
        component: EvaluateVideoResult,
        props: true,
      },
    ],
  },
  {
    path: '/history',
    name: 'History',
    component: History,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 });
      }, 100);
    });
  },
});

export default router;
