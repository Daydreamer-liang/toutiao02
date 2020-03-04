// 这是公共的全局注册文件
import LayoutAside from './home/layout-aside'
import LayoutHeader from './home/layout-header'
import BreadCrumb from './common/bread-crumb'

export default {
  install: function (Vue) {
    //   注册全局组件
    Vue.component('layout-aside', LayoutAside)// 注册左侧导航
    Vue.component('layout-header', LayoutHeader)//  注册头部组件
    Vue.component('bread-crumb', BreadCrumb)// 注册面包屑导航
  }

}
