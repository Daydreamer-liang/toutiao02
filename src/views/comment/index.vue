<template>
  <!-- 这是评论显示内容 需要挂在到路由表上 -->
  <!--
   1.引入面包屑导航
   2.给面包屑导航slot="title" 这个坑填 值 -插槽
   3.slot="header" 给了  <el-card>
  -->
  <el-card v-loading="loading">
    <!-- 评论头 -->
    <bread-crumb slot="header">
      <template slot="title">评论管理</template>
    </bread-crumb>
    <!-- 评论内容 -->
    <el-table :data="list">
      <el-table-column prop="title" width="600" label="标题"></el-table-column>
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button
            @click="openorclose(obj.row)"
            size="small"
            type="text"
          >{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" align="middle" style="height:80px">
      <!-- 分页组件 total 总页码  每页多少条-->
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0, // 默认总数是0
        currentPage: 1, // 默认的页码 是第一个页  决定了当前页码是第几页
        pageSize: 10 // page-size的默认值是10
      },
      loading: false
    }
  },
  methods: {
    //   获取评论数据
    getComment () {
      this.loading = true // 打开遮罩层
      this.$axios({
        url: '/articles',
        // params 是传get参数 也就是query
        params: {
          response_type: 'comment', // 此参数用来控制获取数据类型
          page: this.page.currentPage, // 查对应页码
          per_page: this.page.pageSize // 查10条
        }
      }).then(results => {
        // console.log(res)
        this.list = results.data.results
        this.page.total = results.data.total_count // 将总数赋值
        this.loading = false // 请求完毕 关闭遮罩层
      })
    },
    // 页码改变事件  newPage就是点击切换的最新页码
    changePage (newPage) {
      // newPage是最新的切换页码
      // 将最新的页码 设置给 page下的当前页码
      this.page.currentPage = newPage // 赋值最新页码
      // 重新拉取数据
      this.getComment() // 获取评论
    },
    //  定义一个格式化的函数
    formatterBool (row, column, cellValue, index) {
      //  row 代表当前的一行数据
      // column 代表当前的列信息
      // cellValue 代表当前单元格的值
      // index 代表当前的索引
      // 该函数需要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
    },
    openorclose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否确定${mess}评论`, '提示').then(() => {
        this.$axios({
          url: '/comments/status', // 请求地址
          method: 'put', // 请求类型
          // query参数
          params: {
            article_id: row.id.toString() // 要求参数的文章id
          },
          data: {
            //  body参数
            allow_comment: !row.comment_status // 是打开还是关闭  此状态和评论状态相反
          }
        })
          .then(() => {
            //   成功了 提示个消息 然后 重新拉取数据4
            this.$message.success(`${mess}评论成功`)
            //  重新拉取数据
            this.getComment() // 调用重新拉取数据的方法
          })
          .catch(() => {
            //   表示失败了 会进入到catch
            this.$message.error(`${mess}评论失败`)
          })
      })
    }
  },
  created () {
    //   在钩子函数中获取数据
    this.getComment()
  }
}
</script>

<style>
</style>
