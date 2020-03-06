<template>
  <!-- 二级路由 -->
  <div class="secondhome">
    <!-- <el-calendar v-model="value"></el-calendar> -->
    <iframe
      src="//player.bilibili.com/player.html?aid=10757732&cid=17748434&page=1"
      scrolling="no"
      border="10"
      frameborder=1
      framespacing="0"
      allowfullscreen="true"
      width="100%"
      height="100%"
    ></iframe>
    <!-- <iframe
      src="http://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=58d6db0ff46ef123c79bb138180e95e6&tvId=7981103109&accessToken=2.f22860a2479ad60d8da7697274de9346&appKey=3955c3425820435e86d0f4cdfe56f5e7&appId=1368&height=100%&width=100%"
      frameborder="0"
      allowfullscreen="true"
      width="100%"
      height="100%"
    ></iframe> -->
  </div>
</template>

<script>
export default {
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
