<template>
  <!-- 二级路由 -->
  <div class="secondhome">
    <!-- <el-calendar v-model="value"></el-calendar> -->
    <iframe
      src="//player.bilibili.com/player.html?aid=10757732&cid=17748434&page=1"
      scrolling="no"
      border="10"
      frameborder="1"
      framespacing="0"
      allowfullscreen="true"
      width="100%"
      height="100%"
    ></iframe>
    <div ref="myChart" class="eharts"></div>
  </div>
</template>

<script>
import ECharts from 'echarts'
export default {
  mounted () {
    // 图标实例化、
    ECharts.init(this.$refs.myChart)
  }
  //   data () {
  //     return {
  //       value: new Date()
  //     }
  //   }
}
</script>

<style lang='less' scoped>
.secondhome {
  height: calc(100vh - 60px);
  //   height:100vh;
  //   background-color: rgb(133, 32, 32);
}
</style>
