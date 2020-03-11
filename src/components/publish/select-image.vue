<template>
  <!-- 这是上传文件 -->
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材管理" name="material">
      <!-- 遍历数据 显示图片 -->
      <div class="select-img-list">
        <el-card v-for="item in list" :key="item.id" class="img-card">
          <img @click="clickImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
      <!-- 分页 -->
      <el-row type="flex" justify="center" style="height:80px" align="middle">
        <el-pagination
          background
          layout="prev,pager,next"
          :total="page.total"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传素材" name="upload">
      <!-- 放置一个上传的组件 -->
      <el-upload action class="upload-img" :http-request="uploadImg">
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      page: {
        currentPage: 1, // 当前的页面
        pageSize: 8, // 每页多少条数据
        total: 0 // 总共多少条数据
      },
      activeName: 'first', // 当前激活的页
      list: [] // 素材列表数据
    }
  },
  methods: {
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 查询全部的素材 所以这里给一个false
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        // console.log(result.data.results)

        this.list = result.data.results // 获取全部素材的数据
        this.page.total = result.data.total_count
      })
    },
    // 改变页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    // 数据-子传父
    clickImg (url) {
      this.$emit('selectOneImg', url)
    },
    uploadImg (params) {
      const data = new FormData() // 实例化一个formData对象
      data.append('image', params.file) // 加入文件参数
      // 开始发送上传请求了
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'post', // 上传或者新增一般都是post类型
        data // es6简写
      })
        .then((result) => {
          // 如果成功了 我们应该
          this.$emit('selectOneImg', result.data.url)
        })
        .catch(() => {
          this.$message.error('上传素材失败')
        })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang='less' scoped>
.select-img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 150px;
    height: 150px;
    margin: 20px 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.upload-img {
  display: flex;
  justify-content: center;
  i {
    font-size: 20px;
    padding: 50px;
    border: 2px dashed #ccc;
    border-radius: 4px;
  }
}
</style>
