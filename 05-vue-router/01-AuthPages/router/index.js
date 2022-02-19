import { createRouter, createWebHistory } from 'vue-router';
import PageIndex from '../views/PageIndex.vue';
import PageLogin from '../views/PageLogin.vue';
import PageRegister from '../views/PageRegister.vue';
import UiFormGroup from '../components/UiFormGroup';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/PageIndex.vue'),
      // component: PageIndex,
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/PageLogin.vue'),
      // component: PageLogin,
      // redirect: { path: '/login/:form' },
    },
    {
      path: '/login/:form',
      name: 'loginForm',
      component: UiFormGroup,
      // redirect: { name: 'login' },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/PageRegister.vue'),
      // component: PageRegister,
    },
  ],
});
