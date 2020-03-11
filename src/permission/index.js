// 专门 处理路由权限

import router from '@/router'
import progerss from 'nprogress'// 进度条
import 'nprogress/nprogress.css'
// import router from '@/router'
// 注册全局的权限守卫
router.beforeEach(function (to, from, next) {
  // 开启进度条
  // progress.start()
  progerss.start()
  // 如果页面地址 以 home开头 就进行token判断
  if (to.path.startsWith('/home')) {
    // 你要去主页 看看你有钥匙吗
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    //   不是去主页 就放过
    next()
  }
})

// 进度条：应该在全局守卫的后置位置 关闭-此时已完成了路由的跳转
router.afterEach(() => {
  // 处理 进度条关闭的问题
  // setTimeout(() => progress.done(), 300)
  progerss.done()
})

// router.beforeEach(function (to, from, next) {
//   //   next() // 表示放过
//   // 首先应该判断 你需要拦截哪些页面 如果页面的地址以 /home为开头, 就需要进行token的判断
//   // 判断你要去的页面是不是以 /home为开头
//   if (to.path.startsWith('/home')) {
//     //   表示你要去主页相关的页面 我要看看你有没有钥匙 你没有钥匙我把你一脚踢回 登录页
//     const token = window.localStorage.getItem('user-token')
//     if (token) {
//       next() // 放过
//     } else {
//       next('/login') // 回登录页 去拿钥匙
//     }
//   } else {
//     //   如果我不是去主页相关
//     next() // 直接放过
//   }
// })
