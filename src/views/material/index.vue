<template>
  <!-- 这是素材管理 -->
  <el-card>
    <!-- 放置面包屑  将 面包屑给到卡片的具名header-->
    <bread-crumb slot="header">
      <!-- 具名插槽 template不生成任何实质标签-->
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 防止一个上传的文件 -->
    <el-row type="flex" justify="end">
      <!-- 上传组件必须有 action -->
      <el-upload :show-file-list="false" action :http-request="uploadImg">
        <el-button type="primary " size="small">上传素材</el-button>
      </el-upload>
    </el-row>
    <!-- 放置标签页 v-model所绑定的值 就是当前所激活的页签-->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <!-- 放置标签 label表示标签显示的名称 name代表页签的选中的值-->
      <el-tab-pane label="全部素材" name="all">
        <!-- 内容 循环生成页面结构 -->
        <div class="img-list">
          <!-- 采用v-for对list数据进行循环 -->
          <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
            <!-- 放置图片 并且赋值 图片地址-->
            <img :src="item.url" alt @click=" selectImg (index)" />
            <!-- 操作栏 可以flex布局-->
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i
                @click="shoucang(item)"
                class="el-icon-star-on"
                :style="{color:item.is_collected?'red':'black'}"
              ></i>
              <i @click="del(item)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <!-- 内容 -->
        <div class="img-list">
          <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
            <img :src="item.url" alt @click="selectImg (index)" />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-row type="flex" justify="center" style="height:80px" align="middle">
      <!--
      total 总条数
      current-page 当前页码
      page-size 每页多少条-->

      <el-pagination
        background
        :total="page.total"
        :current-page="page.currentaPage"
        :page-size="page.pageSize"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
    <!-- 显示大图 -->
    <el-dialog @opened="openEnd" :visible="visibles" @close="visibles = false">
      <el-carousel ref="myCarousel" indicator-position="outside" height="400px">
        <el-carousel-item v-for="item in list" :key="item.id">
          <!-- 放置图片 -->
          <img style="width:100%;height:100%" :src="item.url" alt />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前激活的页签 默认选中全部素材
      list: [], // 全部素材的数据 接收全部素材
      page: {
        currentPage: 1, // 默认第一页
        total: 0, // 当前页数
        pageSize: 8 // 每页多少条
      },
      visibles: false,
      clickIndex: -1
    }
  },
  methods: {
    openEnd () {
      // 这个时候已经打开结束 ref已经有值 可以通过ref进行设置了
      this.$refs.myCarousel.setActiveItem(this.clickIndex) // 尝试通过这种方式设置index
    },
    selectImg (index) {
      this.clickIndex = index // 将索引赋值
      this.visibles = true // 打开索引
    },
    // 删除素材的方法
    del (row) {
      this.$confirm('删除吗？', '提示').then(() => {
        this.$axios({
          method: 'delete', // 请求类型 删除
          url: `/user/images/${row.id}` // 请求地址
        })
          .then(() => {
            this.getMaterial() // 重新加载数据
          })
          .catch(() => {
            this.$message.error('删除失败')
          })
      })
    },
    // 取消或者收藏素材
    shoucang (row) {
      this.$axios({
        method: 'put',
        url: `/user/images/${row.id}`,
        data: {
          collect: !row.is_collected
        }
      })
        .then(() => {
          this.getMaterial()
        })
        .catch(() => {
          this.$message.error('收藏失败')
        })
    },
    // 定义一个上传组件的方法
    uploadImg (params) {
      //  params.file 就是需要上传的图片文件
      // 接口参数类型要求是 formData
      const data = new FormData() // 实例化一个formData对象
      data.append('image', params.file) // 加入文件参数
      // 开始发送上传请求了
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'post', // 上传或者新增一般都是post类型
        data // es6简写
      })
        .then(() => {
          // 如果成功了 我们应该 重新来取数据啊
          this.getMaterial()
        })
        .catch(() => {
          this.$message.error('上传素材失败')
        })
    },
    changePage (newPage) {
      // 获取每一次的素材
      this.page.currentPage = newPage // 重新给默认页值
      this.getMaterial() // 得到的是新页面的数据
    },
    //   获取素材数据
    getMaterial () {
      this.$axios({
        url: '/user/images', // 请求地址
        params: {
          collect: this.activeName === 'collect', // 获取不是收藏的数据 就是获取全部的数据
          page: this.page.currentPage, // 取页码变量的值
          per_page: this.page.pageSize // 获取每页数量
        }, // get参数 也就是query参数
        data: {} // data参数 放的是body参数
      }).then(result => {
        // 将返回的数据 赋值到data中的数据
        this.list = result.data.results
        this.page.total = result.data.total_count // 总数 全部素材的总数 收藏素材的总数
      })
    },
    // 切换页签事件 全部素材/收藏素材
    changeTab () {
      this.page.currentPage = 1
      // 在切换事件中
      // 可以根据当前 activeName来决定是获取哪个方面 的数据
      // activeName === 'all' 获取所有的素材  activeName = 'collect' 获取收藏素材
      this.getMaterial() // 直接调用获取素材的方法
    }
  },
  created () {
    // 实例化之后 调用获取素材数据
    this.getMaterial() // 获取素材数据
  }
}
</script>

<style lang="less" scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-card {
    width: 220px;
    height: 240px;
    margin: 20px 40px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background: #f4f5f6;
      height: 30px;
      i {
        font-size: 20px;
      }
    }
  }
}
</style>
