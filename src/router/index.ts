import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import  App from '../App.vue';
import  PageNotFound from '../views/PageNotFound.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/access/:code',
    name: 'App',
    component: App
  },
  {
    name: 'PageNotFound',
    path: '/404',
    component: PageNotFound
  },
  {
  path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
    redirect: '/404',
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
