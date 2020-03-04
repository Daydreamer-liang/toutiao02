<template>
  <div class="layout-aside">
    <!-- 头部图片 -->
    <div class="title">
      <img src="../../assets/img/logo_admin.png" alt />
    </div>
    <!-- 导航菜单 -->
    <el-menu router background-color="#323745" text-color="#adafb5">
      <!-- 子菜单并且没有子菜单的 用el-menu-item -->
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <!-- 二级菜单用   <el-submenu> -->
      <el-submenu index='1'>
        <!-- 匿名插槽是二级菜单，具名插槽title是一级菜单 -->
        <!-- 二级菜单还是使用<el-menu-item> -->
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu  index='1'>
        <!-- 匿名插槽是二级菜单，具名插槽title是一级菜单 -->
        <!-- 二级菜单还是使用<el-menu-item> -->
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/home/picture">图文数据</el-menu-item>
        <el-menu-item index="/home/fansphoto">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fansinfo">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item>
        <i class="el-icon-user-solid"></i>
        <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.layout-aside {
  background-color: #2e2f32;
  height: 107vh;
  width: 230px;
  .title {
    text-align: center;
    padding: 10px;
    img {
      height: 35px;
    }
  }
  .el-menu {
    border-right: none;
  }
}
</style>
