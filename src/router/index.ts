import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import TheForm from '../components/Home/TheForm.vue';
import ChannelInstruction from '../components/LearnMore/ChannelInstruction.vue';
import VideoInstruction from '../components/LearnMore/VideoInstruction.vue';
const Info = () => import('../views/Info.vue');

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
    component: Info,
    children: [
      {
        path: 'channels',
        name: 'LearnMoreChannels',
        component: ChannelInstruction,
        alias: '/learn-more',
      },
      {
        path: 'videos',
        name: 'LearnMoreVideos',
        component: VideoInstruction,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
