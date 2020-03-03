import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission'// 引入权限模块
// import '@/permission' // 引入权限模块
import ElementUI from 'element-ui'// 引入
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import '@/styles/index.less'// 引入初始化样式
import axios from 'axios'// 引入axios
import Components from '@/components'// 组件引入
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 配置注册
Vue.prototype.$axios = axios// 将axios赋值给Vue对象的原型属性：全局
Vue.config.productionTip = false
Vue.use(ElementUI)// 全局注册
Vue.use(Components)// 组件全局注册
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
