<template>
  <!-- 二级路由 -->
  <div class="secondhome">
    <el-calendar v-model="value"></el-calendar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: new Date()
    }
  }
}
</script>

<style lang='less' scoped>
.secondhome {
  height: calc(100vh - 60px);
  //   background-color: rgb(133, 32, 32);
}
</style>
