import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DataCapture',
    component: () => import('../views/DataCapture.vue')
  },
  {
    path: '/programs',
    name: 'Programs',
		component: () => import('../views/Programs.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
