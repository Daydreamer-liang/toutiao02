// 目标：统一axios  我们不可能每次都获取token ？注册统一拦截器 注入token
// 封装请求 request。js
// 1.引入axios
// 2.导出axios
// 3.把 main.js 的axios.defaults.baseURL 拿过来
// 4.把 main.js 的“引入axios文件 改成 本文件”
// 5.配置拦截器 axios.interceptors.request.use(函数1，函数2)成功执行函数1，失败执行函数2
// 6.函数1里: config 是一个对象 传进来 在传出去，函数2：Promise.reject(error)抛出错误
// 7.第一个函数内 获取token 并 统一注入token： config.headers.Authorization = `Bearer ${token}`
// 8.components/home/layout-hearder.vue 删掉：获取的token 和axios里的hearders
// -----------------------------------------------------
// 封装相应拦截器
// 1.相应拦截器 是服务器返回的数据，到达 axios .then之前的数据 我们要对数据进行结构return response.data
// 2.layout - heaser.vue 里面 读取的返回参数 必须减少一层，res.data.data 变成res.data
// 3.当请求的状态码 不是200.201.204 就会进入响应拦截器的第二个参数
// 4.之前的导航守卫已经验证了是否有token 我们这里401报错 就清空错误的token 并跳回登录页
// 5.window.location.href 不可以 这是强制刷新页面，我们这里用router 引用import router 才可以用router
import axios from 'axios'
import router from '@/router'// 路由实例对象
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 配置公共请求地址注册

// 请求拦截器的开发
axios.interceptors.request.use(function (config) {
  // 成功时 执行第一个函数，第一个参数 会有一个config，config就是所有axios请求的信息
  //   需要将配置返回 返回的配置，会作为请求参数进行请求
  const token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 失败时 执行第二个函数 axios是一个支持 promise 失败了 就直接reject
  // reject会直接进入到axios 的catch中
  return Promise.reject(error)
})

// 相应拦截器开发
axios.interceptors.response.use(function (response) {
  // 回调函数第一个参数是响应体，在拦截器中 需要将参数返回 response里的data
  //   而有的接口没有返回参数 就需要判断
  return response.data ? response.data : {}
}, function (error) {
  // error是错误对象 包含错误状态码和相应信息
  if (error.response.status === 401) {
    localStorage.removeItem('user-token')// 删除钥匙
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
