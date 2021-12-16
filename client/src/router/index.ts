import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
const Info = () => import('../views/Info.vue');
const EvaluateChannel = () =>
  import('../components/Evaluate/EvaluateChannel.vue');
const EvaluateVideo = () => import('../components/Evaluate/EvaluateVideo.vue');
const History = () => import('../views/History.vue');

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
  },
  {
    path: '/evaluate/videos/:id',
    name: 'EvaluateVideo',
    component: EvaluateVideo,
    props: true,
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
