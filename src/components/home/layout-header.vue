<template>
  <!-- 换成element-ui的 el-row el-col  -->
  <el-row type="flex" align="middle" class="layout-header">
    <el-col :span="12" class="left">
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col class="right" :span="12">
      <el-row type="flex" justify="end" align="middle">
        <img :src="userInfo.photo" alt />
        <!-- trigger是点击是 显示下拉菜单 -->
        <el-dropdown trigger="click" @command="clickmenu">
          <span class="el-dropdown-link">
            {{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- 点击菜单项 会触发command事件 -->
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">地址</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      // 用户个人信息
      userInfo: {}
    }
  },
  //   获取用户个人信息
  created () {
    // const token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile'
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    }).then(res => {
      // 加载成功，赋值给userInfo
      this.userInfo = res.data.data
      //   console.log(res.data.data)
    })
  },
  methods: {
    clickmenu (command) {
      if (command === 'info') {
      } else if (command === 'git') {
        window.location.href = 'https://xuexi.boxuegu.com/'
      } else {
        localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  height: 60px;
  //   line-height: 60px;
  .left {
    i {
      font-size: 20px;
    }
  }
  .right {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
