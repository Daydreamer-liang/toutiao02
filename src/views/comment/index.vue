<template>
  <!-- 这是评论内容 需要挂在到路由表上 -->
  <!--
   1.引入面包屑导航
   2.给面包屑导航slot="title" 这个坑填 值 -插槽
   3.slot="header" 给了  <el-card>
  -->
  <el-card>
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    //   获取评论数据
    getComment () {
      this.$axios({
        url: '/articles',
        // params 是传get参数 也就是query
        params: {
          response_type: 'comment' // 此参数用来控制获取数据类型
        }
      }).then(res => {
        // console.log(res)
        this.list = res.data.results
      })
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
