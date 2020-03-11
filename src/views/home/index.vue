<template>
  <!-- 先在外面放一个大容器 container -->
  <el-container>
    <!-- 根据折叠状态变成 64px -->
    <el-aside  :style="{width: collapse ? '64px' : '230px'}" style="width:230px;background: #2e2f32;">
      <layout-aside :collapse='collapse'></layout-aside>
    </el-aside>
    <!-- 右侧的也放一个大容器 -->
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main style="padding:0">
        <!-- 这里应该放一个二级容器 -->

        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '@/utils/eventBus' // 公共领域监听
// import LayoutAside from '@/components/home/layout-aside.vue'
// import LayoutHeader from '@/components/home/layout-header.vue'
export default {
  //   components: {
  //     'layout-aside': LayoutAside,
  //     'layout-header': LayoutHeader
  //   }
  data () {
    return {
      collapse: false// 默认展开的状态
    }
  },
  created () {
    //   监听到折叠状态，变化导航的大小
    eventBus.$on('changeCollapse', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style>
</style>
