import Vue from 'vue';
import VueRouter from 'vue-router';

import preview from '@/views/preview.vue';
import information from '@/views/information.vue';
import imgbox from '@/components/imgbox.vue';
import validate from '@/components/validate.vue';
import success from '@/components/success.vue';
import error from '@/components/error.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: preview,
  },
  {
    path: '/',
    name: 'preview',
    component: preview,
  },
  {
    path: '/information',
    name: 'information',
    component: information,
    children: [
      {
        path: '/information/imgbox',
        name: 'imgbox',
        component: imgbox,
      },
      {
        path: '/information/validate',
        name: 'validate',
        component: validate,
      },
      {
        path: '/information/success',
        name: 'success',
        component: success,
      },
      {
        path: '/information/error',
        name: 'error',
        component: error,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
