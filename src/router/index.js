import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'// 用一种简写的方式 @ 代表 /src
import Login from '@/views/login'
import SecondHome from '@/views/home/second_home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '', // 什么都不写 表示二级路由的默认
        component: SecondHome
      },
      {
        path: 'comment', // 评论列表的地址，不要写/
        component: () => import('@/views/comment')// 评论列表的组件。按需加载
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  }
  //   {
  //     path: '/about',
  //     name: 'About',
  //     // route level code-splitting按需加载
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
]

const router = new VueRouter({
  routes
})

export default router
