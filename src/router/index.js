import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'// 用一种简写的方式 @ 代表 /src
import Login from '@/views/login'
// import Login from '@/views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
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
