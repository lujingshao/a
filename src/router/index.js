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
        component: () => import('../view/basic/tables/index'),
        meta: {
          title: "表格"
        }
      }, {
        path: '/home/echars',
        name: "echars",
        component: () => import('../view/basic/echars/index'),
        meta: {
          title: "图表"
        }
      }, {
        path: '/home/greedySnake',
        name: 'greedySnake',
        component: () => import('../view/game/greedySnake/index'),
        meta: {
          title: '贪吃蛇'
        }
      }, {
        path: '/home/rversi',
        name: 'rversi',
        component: () => import('../view/game/rversi/index'),
        meta: {
          title: '黑白棋'
        },
      }, {
        path: '/home/gobang',
        name: 'gobang',
        component: () => import('../view/game/gobang/index'),
        meta: {
          title: '五子棋'
        },
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../view/Login/index'),
    meta: {
      title: '登录'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
