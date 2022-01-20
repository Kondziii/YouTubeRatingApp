import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
const Info = () => import('../views/Info.vue');
const EvaluateChannel = () => import('../views/EvaluateChannel.vue');
const EvaluateVideo = () => import('../views/EvaluateVideo.vue');
const EvaluateVideoResult = () => import('../views/EvaluateVideoResult.vue');
const History = () => import('../views/History.vue');
const EvaluateChannelResult = () =>
  import('../views/EvaluateChannelResult.vue');
const NotFound = () => import('../views/NotFound.vue');

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
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition);
        } else if (to.path != from.path) {
          resolve({ left: 0, top: 0 });
        }
      }, 100);
    });
  },
});

export default router;
