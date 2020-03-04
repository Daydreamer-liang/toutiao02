<template>
  <!-- 这是一个面包屑 封装完毕 -->
  <el-breadcrumb separator=">">
    <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <slot name="title"></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>

</template>

<script>
export default {}
</script>

<style>
</style>
