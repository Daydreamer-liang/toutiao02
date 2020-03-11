// 这是公共的全局注册文件
import LayoutAside from './home/layout-aside'
import LayoutHeader from './home/layout-header'
import BreadCrumb from './common/bread-crumb'
import VueQuillEditor from 'vue-quill-editor'
import CoverImage from './publish/cover-image'// 发布页-图片图层
import SelectImage from './publish/select-image'// 发布页-图片图层-上传文件

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install: function (Vue) {
    //   注册全局组件
    Vue.component('layout-aside', LayoutAside)// 注册左侧导航
    Vue.component('layout-header', LayoutHeader)//  注册头部组件
    Vue.component('bread-crumb', BreadCrumb)// 注册面包屑导航
    Vue.component('cover-image', CoverImage)// 注册发布页面，图片组件
    Vue.component('select-image', SelectImage)// 注册发布页面，图片组件
    // 注册 富文本编辑器
    Vue.use(VueQuillEditor)
  }

}
