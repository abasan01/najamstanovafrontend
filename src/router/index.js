import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/oglasi',
    name: 'home',
    component: HomeView
  }, {
    path: '/oglasi/:id',
    name: 'detail',
    component: () => import('../views/DetailView.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('../views/UploadView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  }, {
    path: '/messages',
    name: 'messages',
    component: () => import('../views/MessagesView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router