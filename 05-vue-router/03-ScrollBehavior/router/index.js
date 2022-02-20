import { el } from 'date-fns/locale';
import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/03-ScrollBehavior'),

  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/PageMeetups'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      redirect: { name: 'index' },
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      props: true,
      redirect: (to) => ({ name: 'meetup.description', params: to.params }),
      component: () => import('../views/PageMeetup'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup.description',
          props: true,
          component: () => import('../views/PageMeetupDescription'),
        },
        {
          path: 'agenda',
          name: 'meetup.agenda',
          props: true,
          component: () => import('../views/PageMeetupAgenda'),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    let position = {};
    if (to.hash) {
      position = {
        el: to.hash,
      };
      // const el = window.location.href.split('#')[1];
      // if (el.length) {
      //   document.getElementById(el).scrollIntoView({ behavior: 'smooth' });
      // }
      // https://stackoverflow.com/questions/54535838/scroll-behaviour-vuejs-not-working-properly
      // return { el: to.hash };
    } else if (savedPosition) {
      position = {
        savedPosition,
      };
      // return savedPosition;
    } else {
      position = { left: 0, top: 0 };
    }
    return position;
  },
});
