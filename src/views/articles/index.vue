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
          <!-- el-radio单选页 -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道类型:">
        <!-- 选择器 -->
        <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期范围:">
        <!-- 时间选择 -->
        <el-date-picker type="daterange" v-model="searchForm.dateRange"></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 文章的主题结构-内容~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <el-card type="flex" align="middle" class="total">
      <span>共找到1000条复合条件的内容</span>
    </el-card>
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
        <span>
          <i class="el-icon-edit"></i> 修改
        </span>
        <span>
          <i class="el-icon-delete"></i> 删除
        </span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        // 数据
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 / 先将 5 定义成 全部
        // 传值的是时候如果是5 就不传
        status: 5, // 默认为全部的状态
        channel_id: null, // 表示没有任何的频道
        dateRange: ''
      },
      channels: [],
      list: [], // 文章列表内容
      defaultImg: require('../../assets/img/shenqi01.jpg') // 地址对应的文件变成了变量 在编译的时候会被拷贝到对应位置
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
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // 获取频道接口返回的数据
        this.channels = result.data.results
      })
    },
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(res => {
        this.list = res.data.results
        //  this.list = result.data.results
        console.log(res.data.results)
      })
    }
  },
  created () {
    this.getChannels()
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
