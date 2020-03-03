<template>
  <!-- 先在外面放一个大容器 container -->
  <el-container>
    <el-aside style="width:230px">
      <layout-aside></layout-aside>
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
// import LayoutAside from '@/components/home/layout-aside.vue'
// import LayoutHeader from '@/components/home/layout-header.vue'
export default {
//   components: {
//     'layout-aside': LayoutAside,
//     'layout-header': LayoutHeader
//   }
}
</script>

<style>
</style>
