<template>
  <el-card>
    <!-- 账户信息  -->
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- 放置表单 -->
    <el-form ref="myForm" :model="formData" :rules="rules" label-width="150px">
      <el-form-item label="用户名" prop="name">
        <el-input style="width:30%" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input style="width:30%" v-model="formData.intro"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input style="width:30%" v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" disabled>
        <!-- disabled 手机号只能看不能改 -->
        <el-input style="width:30%" v-model="formData.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- 头像 -->
    <!-- 做一个上传 el-upload    上传之后不显示show-file-list="false-->
    <el-upload action :http-request="uploadImg" :show-file-list="false">
      <img class="head-upload" :src="formData.photo ? formData.photo : img" alt />
    </el-upload>
  </el-card>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 8,
            message: '长度在1-8个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱的格式不正确',
            trigger: 'blur'
          }
        ]
      },
      img: require('../../assets/img/peien.jpg')
    }
  },
  methods: {
    //   上传图片
    uploadImg (params) {
      console.log(params)
      const data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.formData.photo = result.data.photo
      })
    },
    //   保存用户信息
    saveUser () {
      // 手动校验
      this.$refs.myForm.validate().then(() => {
        //   校验成功 进入then、
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        })
          .then(() => {
            this.$message.success('保存成功')
            eventBus.$emit('updateUser')
          })
          .catch(() => {
            this.$message.error('保存失败')
          })
      })
    },
    //   获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.head-upload {
  position: absolute;
  right: 350px;
  top: 160px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
