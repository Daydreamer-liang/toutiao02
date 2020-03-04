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
import axios from 'axios'
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
export default axios
