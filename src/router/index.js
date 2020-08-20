import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../view/index/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'Home'
  }, {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home/tables',
    children: [
      {
        path: '/home/tables',
        name: "tables",
        component: () => import('../view//basic/tables/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../view/Login/index')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
