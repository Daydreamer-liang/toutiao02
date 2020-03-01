<template>
 <div class="login">
     <!-- 表单 -->
    <el-card class="login-card">
        <div class="title">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <el-from>
            <el-from-item>
                <el-input placeholder="请输入手机号"></el-input>
            </el-from-item>
            <el-from-item>
                <el-input style="width:60%" placeholder="请输入验证码"></el-input>
                <el-button style="float:right" type="primary">点击发送</el-button>
            </el-from-item>
            <el-from-item>
                <el-checkbox>我已经同意了，行了吧</el-checkbox>
            </el-from-item>
            <el-from-item>
                <el-button  type="primary" style="width:100%">登录</el-button>
            </el-from-item>
        </el-from>
   </el-card>
    <!-- 表单 -->
 </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.login{
  background-image: url('../../assets/img/login_bg.jpg');
  height: 100vh;//当前可视区域分成100份
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card{
     width: 400px;
     height: 300px;

  }
  .title{
      text-align: center;
      img{
       height: 40px;
    }
  }
}

</style>>
