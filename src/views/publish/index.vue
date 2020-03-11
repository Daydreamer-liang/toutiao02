<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单组件  标题宽度设置于 el-form组件-->
    <el-form
      ref="myForm"
      :model="publishForm"
      :rules="publishRules"
      style="margin-left:50px"
      label-width="100px"
    >
      <el-form-item label="标题" prop="title">
        <!-- 输入框 -->
        <el-input v-model="publishForm.title" placeholder="请输入您的标题" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <!-- 多行输入 -->
        <!-- <el-input v-model="publishForm.content" placeholder="请输入您的内容" type="textarea" :rows="4"></el-input> -->
        <quill-editor v-model="publishForm.content" style="height:300px"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="cover" style="margin-top:120px">
        <!-- 单选框组 -->
        <el-radio-group v-model="publishForm.cover.type" @change="changeType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 封面组件 -->
      <cover-image :list="publishForm.cover.images" @selectTwoImg="receiveImg"></cover-image>
      <el-form-item label="频道" prop="channel_id">
        <!-- select选择器 -->
        <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
          <!-- <el-option v-for="item in channels" :value="item.id" :label="item.name" :key="item.id"></el-option> -->
          <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- 放置两个按钮 -->
        <el-button @click="publish(false)" type="primary">发表</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据
      //   发布表单数据
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // -1 是自动 0是无图  1 是单图 3 是三图
          images: [] // 字符串数组 对应type  假如 type 为1 images中应该有一个值 假如为3 images应该有三个值 0 images为空
        },
        channel_id: null // 频道id
      },
      // 发布表单的校验规则
      publishRules: {
        title: [
          { required: true, message: '文章标题不能为空', trigger: 'blur' },
          {
            min: 5,
            max: 30,
            message: '标题应该在5-30字符之间',
            trigger: 'blur'
          }
        ],
        content: [
          { required: true, message: '文章内容不能为空', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '频道内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  // 如果你想要捕捉路由参数的变化, 我们可以采用watch来监听 $route
  //   解决从修改跳转内容页面 不会刷新的BUG
  watch: {
    // 监听router articleId
    $route: function (to, from) {
      //   console.log(to)
      if (to.params.articleId) {
        this.getArticleById(to.params.articleId)
      } else {
        this.publishForm = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // -1 是自动 0是无图  1 是单图 3 是三图
            images: [] // 字符串数组 对应type  假如 type 为1 images中应该有一个值 假如为3 images应该有三个值 0 images为空
          },
          channel_id: null // 频道id
        }
      }
    }
  },
  methods: {
    //   监听-从子组件传递过来的 图片数据
    receiveImg (url, index) {
      //   alert(index)
      //   this.publishForm.cover.images.splice(1, 1, url)
      this.publishForm.cover.images.splice(index, 1, url)
    },
    //   传送数据-图片
    changeType () {
      // -1 是自动 0是无图  1 是单图 3 是三图
      //   console.log(this.publishForm.cover.type)
      if (this.publishForm.cover.type === 1) {
        this.publishForm.cover.images = ['']
      } else if (this.publishForm.cover.type === 3) {
        this.publishForm.cover.images = ['', '', '']
      } else {
        this.publishForm.cover.images = []
      }
    },
    //   获取文章数据
    getArticleById (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then(result => {
        this.publishForm = result.data
      })
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels' // 获取频道数据
      }).then(result => {
        this.channels = result.data.channels // 将频道数据赋值给本地数据
      })
    },
    // 发布文章
    publish (draft) {
      //  发布正式文章 发布草稿文章
      //  修改正式文章  修改草稿文章
      const { articleId } = this.$route.params // ID: 有就是修改 没有就是新增
      this.$axios({
        url: articleId ? `/articles/${articleId}` : '/articles',
        method: articleId ? 'put' : 'post',
        params: { draft },
        data: this.publishForm
      })
        .then(() => {
          this.$message.success('发布成功')
          this.$router.push('/home/articles')
        })
        .catch(() => {
          this.$message.error('发布失败')
        })
      //   if (articleId) {
      //     //   修改
      //     this.$axios({
      //       url: `/articles/${articleId}`,
      //       method: "put",
      //       params: {
      //         draft
      //       },
      //       data: this.publishForm
      //     })
      //       .then(() => {
      //         this.$message.success("发布成功");
      //         this.$router.push("/home/articles");
      //       })
      //       .catch(() => {
      //         this.$message.error("发布失败");
      //       });
      //   } else {
      //     //   新增
      //     // 用ref 获取el-form的实例 validate校验方法
      //     this.$refs.myForm.validate().then(() => {
      //       //   验证完成 调用接口 添加文章
      //       this.$axios({
      //         url: "/articles",
      //         method: "post",
      //         params: {
      //           draft
      //         },
      //         data: this.publishForm
      //       })
      //         .then(() => {
      //           this.$message.success("发布成功");
      //           // 跳转到文章列表
      //           this.$router.push("/home/articles");
      //         })
      //         .catch(() => {
      //           this.$message.error("发布失败");
      //         });
      //     });
      //   }
    }
  },
  //   判断是否存在文章ID
  created () {
    // 调用获取频道数据的方法
    this.getChannels()
    const { articleId } = this.$route.params
    // if(articleId){
    // this.getArticleById(articleId)
    // }
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>
</style>
