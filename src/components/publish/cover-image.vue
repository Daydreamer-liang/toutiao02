<template>
  <!-- 这是发布图片 -->
  <div class="cover-image">
    <div
      @click="openDialog(index)"
      v-for="(item,index) in list"
      :key="index"
      class="cover-image-item"
    >
      <img :src="item ? item : defaultImg" alt />
    </div>
    <!-- 点击弹出的图片图层 -->
    <el-dialog :visible="dialogVisible" @close="dialogVisible = false">
      <select-image @selectOneImg="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'), // 默认图片
      dialogVisible: false, // 控制弹层的显示与隐藏
      selectIndex: -1 // 用来记录点击的图片索引
    }
  },
  methods: {
    //   显示弹层
    openDialog (index) {
      this.dialogVisible = true // 显示弹层
      this.selectIndex = index // 记录点击了那张图片
    },
    // 接收子组件传递过来的数据
    receiveImg (url) {
      //   alert(url)
      //   这里不可直接修改 props的数据，因为是从父组件 传递过来 ，
      // 我们还得网上传递数据
      //   二次传递
      this.$emit('selectTwoImg', url, this.selectIndex)
      this.dialogVisible = false
    }
  }
}
</script>

<style  lang='less' scoped>
.cover-image {
  display: flex;
  margin: 20px 100px;
  .cover-image-item {
    border: 1px solid #ccc;
    width: 250px;
    height: 250px;
    padding: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
