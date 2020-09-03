import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/view/index/index.vue'

const original = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return original.call(this, location).catch(err => err)
}

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
        component: () => import('../view/basic/tables/index.vue'),
        meta: {
          title: "表格"
        }
      }, {
        path: '/home/splicing',
        name: 'splicing',
        component: () => import('../view/game/splicing/index.vue'),
        meta: {
          title: '拼接怪物'
        },
      }, {
        path: '/home/echars',
        name: "echars",
        component: () => import('../view/basic/echars/index.vue'),
        meta: {
          title: "图表"
        }
      }, {
        path: '/home/greedySnake',
        name: 'greedySnake',
        component: () => import('../view/game/greedySnake/index.vue'),
        meta: {
          title: '贪吃蛇'
        }
      }, {
        path: '/home/rversi',
        name: 'rversi',
        component: () => import('../view/game/rversi/index.vue'),
        meta: {
          title: '黑白棋'
        },
      }, {
        path: '/home/gobang',
        name: 'gobang',
        component: () => import('../view/game/gobang/index.vue'),
        meta: {
          title: '五子棋'
        },
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../view/Login/index.vue'),
    meta: {
      title: '登录'
    }
  },{
    path:'/404',
    name: '404',
    component: () => import('../view/Login/404.vue'),
    meta: {
      title: '页面找不到'
    }
  },{
    path:'*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
