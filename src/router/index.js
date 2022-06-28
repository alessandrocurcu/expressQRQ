import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/Patient/:id',
    name: 'PatientDetail',
    props: true,
    component: () => import('@/views/PatientDetail.vue'),
    // children: [
    //   {
    //     path: ':observation',
    //     name: 'PatientDetail',
    //     props: true,
    //     component: () => import('@/views/PatientDetail.vue'),
    //   },
    // ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue'),
  },

];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from) => {
//   if (to.meta.requiredAuth && !window.user) {
//     return {name: 'Login'}
//     // need to login in
//   }
// })

export default router;
