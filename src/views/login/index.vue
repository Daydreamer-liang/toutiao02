<template>
  <div class="login">
    <!-- 表单 -->
    <el-card class="login-card">
      <div class="title">
        <!-- <img src="../../assets/img/logo_index.png" alt /> -->
        <audio
          class="success"
          autoplay="autoplay"
          src="../../static/Hans Zimmer&Junkie XL-Is She With You-.mp3"
        ></audio>
      </div>
      <el-form ref="loginForm" :model="loginform" :rules="loginrules">
        <el-form-item prop="mobile">
          <el-input v-model="loginform.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginform.code" style="width:60%" placeholder="请输入验证码"></el-input>
          <el-button style="float:right" type="primary">点击发送</el-button>
        </el-form-item>
        <el-form-item prop="checkbox">
          <el-checkbox checked="checked" v-model="loginform.checkbox">我已经同意了，行了吧</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表单 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginform: {
        mobile: '', // 手机号
        code: '', // 验证码
        checkbox: false // 同意
      },
      loginrules: {
        mobile: [
          // required 为true 为该字段必填
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          //   1为开头第二位是 3-9 后面9个数随机
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'blur' }
        ],
        checkbox: [
          {
            validator: function (rule, value, callback) {
              value
                ? callback()
                : callback(new Error('您必须同意我们的霸王条款'))
            }
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // 登陆：手动校验 点击的时候 调用validate方法
      //   第一种 传入一个回调函数
      //   this.$refs.loginForm.validate(function (isOK) {
      //     if (isOK) {
      //       console.log('通过')
      //     } else {
      //       console.log('未通过')
      //     }
      //   })
      // 第二种方法
      this.$refs.loginForm.validate().then(() => {
        this.$axios({
          url: '/authorizations',
          data: this.loginform,
          method: 'post'
        })
          .then(res => {
            // window.localStorage.setItem('user-token', res.data.data.token)因为统一token 返回数据减少一层嵌套
            window.localStorage.setItem('user-token', res.data.token)
            this.$router.push('/home')
          })
          .catch(() => {
            //   this.$message({
            //     message: '错误',
            //     type: 'warning'
            //   })
            //   this.$message.error('账户或密码错误')
            this.$alert('账户或密码错误')
          })
      })
    }
    // play () {
    //   var music = document.getElementById('music') // 判断如果音乐停止播放中，就让他播放。。。
    //   if (music.paused) {
    //     music.paused = false
    //     music.play()
    //   }
    // } // 调用函数
    // setInterval(play(), 1);
  }
  //   created () {
  //     setInterval(this.play(), 1)
  //   }
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh; //当前可视区域分成100份

  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: "123"; //必须有
    height: 100%;
    width: 100%;
    background-image: url("../../assets/img/shenqi01.jpg");
    // background-image: url("../../assets/img/shanhe.jpg");
    background-size: cover; //自适应
    position: absolute; //脱离文档
    // filter: blur(5px);//毛玻璃效果（模糊）
  }
  .login-card {
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
    width: 400px;
    height: 300px;
    /deep/.el-input__inner {
      background: rgba(0, 0, 0, 0.3);
    }
    /deep/.el-button--primary {
      color: rgb(165, 164, 164);
      background: rgba(0, 0, 0, 0.3);
      border-color: #f56c6c;
      //   border-color: #409eff;
    }
    /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background: rgba(0, 0, 0, 0.3);
      border-color: #409eff;
    }
    /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
      color: rgb(165, 164, 164);
    }
    /deep/.el-checkbox__inner {
      background: rgba(0, 0, 0, 0.3);
    }
  }
  .title {
    text-align: center;
    height: 30px;
    img {
      height: 40px;
    }
  }
}
</style>>
