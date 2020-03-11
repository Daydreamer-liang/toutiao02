<template>
  <!-- 内容页 -->
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- 筛选 表单容器 -->
    <el-form style="padding-left:50px">
      <el-form-item label="文章状态:">
        <!-- el-radio-group单选框 -->
        <el-radio-group v-model="searchForm.status">
          <!-- <el-radio-group v-model="searchForm.status" @change="changeCondition"> -->
          <!-- el-radio单选页 -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道类型:">
        <!-- 频道选择器 -->
        <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
          <!-- <el-option v-for="item in channels" :key="item" :label="item.name" :value="item.id"></el-option> -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期范围:">
        <!-- 时间选择 -->
        <el-date-picker value-format="yyyy-MM-dd" type="daterange" v-model="searchForm.dateRange"></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 文章的主题结构-内容~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <el-row class="total" type="flex" align="middle">
      <span>共找到{{page.total}}条复合条件的内容</span>
    </el-row>
    <!-- 内容 -->
    <div class="article-item" v-for="item in list " :key="item.id.toString()">
      <div class="left">
        <img :src=" item.cover.images.length ? item.cover.images[0] : defaultImg" alt />
        <div class="info">
          <span>{{item.title}}</span>
          <el-tag :type=" item.status | filterType " class="tag">{{ item.status | filterStatus }}</el-tag>
          <span class="date">{{ item.pubdate }}</span>
        </div>
      </div>
      <div class="right">
        <span @click="$router.push(`/home/publish/${item.id.toString()}`)">
          <i class="el-icon-edit"></i> 修改
        </span>
        <span @click="delMaterial(item.id.toString())">
          <i class="el-icon-delete"></i> 删除
        </span>
      </div>
    </div>
    <!-- 分页组件 -->
    <el-row type="flex" justify="center" style="height:80px" align="middle">
      <el-pagination
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        background
        layout="prev,pager,next"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页10-50条数据
        total: 0 // 总数
      },
      searchForm: {
        // 数据
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 / 先将 5 定义成 全部
        // 传值的是时候如果是5 就不传
        status: 5, // 默认为全部的状态
        channel_id: null, // 表示没有任何的频道
        dateRange: '' // 时间
      },
      channels: [],
      list: [], // 文章列表内容
      defaultImg: require('../../assets/img/shenqi01.jpg') // 地址对应的文件变成了变量 在编译的时候会被拷贝到对应位置
    }
  },
  // 监听data中的数据变化  第二种解决方案  watch监听对象的深度检测方案
  watch: {
    searchForm: {
      deep: true,
      // handler也是一个固定写法 一旦数据发生任何变化 就会触发 更新
      handler () {
        this.page.currentPage = 1 // 只要条件变化 就回到第一页
        this.changeCondition() // this 指向当前组件实例
      }
    }
  },

  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }
  },
  methods: {
    toPublish () {
      // 编程式导航
      this.$router.push('/home/publish')
    },
    delMaterial (id) {
      //  先友好的提示一下
      this.$confirm('您确定删除此条数据?', '提示').then(() => {
        // 如果进入了then 表示点击了确定
        this.$axios({
          method: 'delete',
          url: `/articles/${id}` // 地址 是  /articles/:target target 是文章id
        })
          .then(() => {
            // 如果删除成功了
            // 重新获取数据
            //  this.getArticles() // 如果这么写 就意味着你 舍去了当前的页码和条件 不能这么写
            // 应该带着条件和页码去加载
            this.changeCondition() // 重新加载
          })
          .catch(() => {
            this.$message.error('删除文章失败')
          })
      })
    },
    //   改变页码，换页
    changePage (newPage) {
      // 先将最新的页码给到 当前页码
      this.page.currentPage = newPage // 最新页码
      this.changeCondition() // 直接调用改变事件的方法
    },
    //   按条件进行筛选 获取相应的内容changeCondition
    // 改变了条件
    changeCondition () {
      // 当触发此方法的时候 表单数据已经变成最新的了
      // 组装条件 params
      const params = {
        page: this.page.currentPage, // 如果条件改变 就回到第一页
        per_page: this.page.pageSize,
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 5 是我们前端虚构的
        channel_id: this.searchForm.channel_id, // 就是表单的数据
        begin_pubdate:
          this.searchForm.dateRange && this.searchForm.dateRange.length
            ? this.searchForm.dateRange[0]
            : null,
        end_pubdate:
          this.searchForm.dateRange && this.searchForm.dateRange.length > 1
            ? this.searchForm.dateRange[1]
            : null
      }
      // 通过接口传入
      this.getArticles(params) // 直接调用获取方法
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // 获取频道接口返回的数据
        this.channels = result.data.channels
      })
    },
    // 获取文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results // 获取文章列表
        // 将总数赋值给 tatal
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getChannels() // 获取频道数据
    this.getArticles() // 手动调用文章数据
  }
}
</script>

<style lang="less" scoped>
.articles {
  .total {
    height: 60px;
    border-bottom: 1px dashed #ccc;
  }
  .article-item {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    .left {
      display: flex;
      img {
        width: 180px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        display: flex;
        flex-direction: column;
        height: 100px;
        justify-content: space-around;
        margin-left: 10px;
        .date {
          color: #999;
          font-size: 12px;
        }
        .tag {
          width: 60px;
          text-align: center;
        }
      }
    }
    .right {
      span {
        font-size: 12px;
        margin-right: 8px;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
</style>
