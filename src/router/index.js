import Vue from 'vue'
import Router from 'vue-router'

const AppHello = () => import('@/components/appStart')
const AppStart = () => import('@/components/appStart')
const AppRegiste = () => import('@/components/appConfig/appRegiste')
const AppLogin = () => import('@/components/appConfig/appLogin')
const AppMenu = () => import('@/components/appConfig/appMenu')
const AppSet = () => import('@/components/appConfig/appSet')
const AppCaptcha = () => import('@/components/appConfig/appCaptcha')
const AppScan = () => import('@/components/appConfig/appScan')
const AppBarCode = () => import('@/components/appConfig/appBarCode')
const AppHeadPhoto = () => import('@/components/appConfig/appHeadPhoto')

const AppIndex = () => import('@/components/appMain/appIndex')

// post请求：this.$post(url, param, success, fail, load, error, http)
// get请求：this.$get(url, success, fail, load, error, http)
// 项目外页面跳转：this.$goURL(url)
// 项目内页面跳转push：this.$push(param)
// 项目内页面返回back：this.$back(param)

/*
header参数说明：
ios-contact会员按钮，md-menu菜单按钮，ios-arrow-back左侧返回按钮，
*/

export default new Router({
  mode: 'history',
  history: true,
  transitionOnLoad:true,
  routes: [{
    path: '/',
    name: 'AppHello',
    component: AppHello,
    meta: {
      title: '欢迎',                                 // 页面标题
      header: {
        left: '',                                    // header左边按钮
        leftFuc: (fuc) => {fuc && fuc()},            // header左边按钮点击事件
        right: '',                                   // header右边按钮
        rightFuc: (fuc) => {fuc && fuc()}            // header右边按钮点击事件
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},            // vue-touch左滑页面事件-下一页
        rightFuc: (fuc) => {fuc && fuc()}            // vue-touch右滑页面事件-上一页
      },
      isBack: false                                  // 判断是否返回上一页
    }
  }, {
    path: '/appStart',
    name: 'AppStart',
    component: AppStart,
    meta: {
      title: '欢迎',                                 // 页面标题
      header: {
        left: '',                                    // header左边按钮
        leftFuc: (fuc) => {fuc && fuc()},            // header左边按钮点击事件
        right: '',                                   // header右边按钮
        rightFuc: (fuc) => {fuc && fuc()}            // header右边按钮点击事件
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},            // vue-touch左滑页面事件-下一页
        rightFuc: (fuc) => {fuc && fuc()}            // vue-touch右滑页面事件-上一页
      },
      isBack: false                                  // 判断是否返回上一页
    }
  }, {
    path: '/appRegiste',
    name: 'AppRegiste',
    component: AppRegiste,
    meta: {
      title: '注册',                                  // 页面标题
      header: {
        left: '',                                     // header左边按钮
        leftFuc: (fuc) => {fuc && fuc()},             // header左边按钮点击事件
        right: '',                                    // header右边按钮
        rightFuc: (fuc) => {fuc && fuc()}             // header右边按钮点击事件
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},             // vue-touch左滑页面事件-下一页
        rightFuc: (fuc) => {fuc && fuc()}             // vue-touch右滑页面事件-上一页
      },
      isBack: false                                   // 判断是否返回上一页
    }
  }, {
    path: '/appLogin',
    name: 'AppLogin',
    component: AppLogin,
    meta: {
      title: '登录',                                  // 页面标题
      header: {
        left: '',                                     // header左边按钮
        leftFuc: (fuc) => {fuc && fuc()},             // header左边按钮点击事件
        right: '',                                    // header右边按钮
        rightFuc: (fuc) => {fuc && fuc()}             // header右边按钮点击事件
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},              // vue-touch左滑页面事件-下一页
        rightFuc: (fuc) => {fuc && fuc()}              // vue-touch右滑页面事件-上一页
      },
      isBack: false                                   // 判断是否返回上一页
    }
  }, {
    path: '/appIndex',
    name: 'AppIndex',
    component: AppIndex,
    meta: {
      title: '首页',                                   // 页面标题
      header: {
        left: 'md-menu',                                  // header左边按钮
        leftFuc: (fuc) => {
          fuc && fuc()
        },                                             // header左边按钮点击事件
        right: 'ios-contact',                              // header右边按钮
        rightFuc: (fuc) => {
          fuc && fuc()
        }                                              // header右边按钮点击事件
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},              // vue-touch左滑页面事件-下一页
        rightFuc: (fuc) => {fuc && fuc()}              // vue-touch右滑页面事件-上一页
      },
      isBack: false,                                   // 判断是否返回上一页
      scrollToTop: true,                               // 是否滚动到顶部
      isReload: false,                                 // 控制是否刷新页面
      needLogin: true                                  // 进入页面需要登录
    }
  }, {
    path: '/appMenu',
    name: 'AppMenu',
    component: AppMenu,
    meta: {
      title: '菜单',                                   // 页面标题
      header: {
        left: 'ios-arrow-back',                            // header左边按钮
        leftFuc: (fuc) => {fuc && fuc()},              // header左边按钮点击事件
        right: 'md-menu',                                 // header右边按钮
        rightFuc: (fuc) => {fuc && fuc()}              // header右边按钮点击事件
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},              // vue-touch左滑页面事件-下一页
        rightFuc: (fuc) => {fuc && fuc()}              // vue-touch右滑页面事件-上一页
      },
      isBack: false,                                   // 判断是否返回上一页
      scrollToTop: true,                               // 是否滚动到顶部
      isReload: false,                                 // 控制是否刷新页面
      needLogin: true                                  // 进入页面需要登录
    }
  }, {
    path: '/appSet',
    name: 'AppSet',
    component: AppSet,
    meta: {
      title: '设置',                                   // 页面标题
      header: {
        left: 'ios-arrow-back',                            // header左边按钮
        leftFuc: (fuc) => {fuc && fuc()},              // header左边按钮点击事件
        right: 'md-menu',                                 // header右边按钮
        rightFuc: (fuc) => {fuc && fuc()}              // header右边按钮点击事件
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},              // vue-touch左滑页面事件-下一页
        rightFuc: (fuc) => {fuc && fuc()}              // vue-touch右滑页面事件-上一页
      },
      isBack: false,                                   // 判断是否返回上一页
      scrollToTop: true,                               // 是否滚动到顶部
      isReload: false,                                 // 控制是否刷新页面
      needLogin: true                                  // 进入页面需要登录
    }
  }, {
    path: '/appCaptcha',
    name: 'AppCaptcha',
    component: AppCaptcha,
    meta: {
      title: '验证',                                   // 页面标题
      header: {
        left: 'ios-arrow-back',                            // header左边按钮
        leftFuc: (fuc) => {fuc && fuc()},              // header左边按钮点击事件
        right: 'md-menu',                                 // header右边按钮
        rightFuc: (fuc) => {fuc && fuc()}              // header右边按钮点击事件
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},              // vue-touch左滑页面事件-下一页
        rightFuc: (fuc) => {fuc && fuc()}              // vue-touch右滑页面事件-上一页
      },
      isBack: false,                                   // 判断是否返回上一页
      scrollToTop: true,                               // 是否滚动到顶部
      isReload: false,                                 // 控制是否刷新页面
      needLogin: true                                  // 进入页面需要登录
    }
  }, {
    path: '/appScan',
    name: 'AppScan',
    component: AppScan,
    meta: {
      title: '扫描',                                   // 页面标题
      header: {
        left: 'ios-arrow-back',                            // header左边按钮
        leftFuc: (fuc) => {fuc && fuc()},              // header左边按钮点击事件
        right: 'md-menu',                                 // header右边按钮
        rightFuc: (fuc) => {fuc && fuc()}              // header右边按钮点击事件
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},              // vue-touch左滑页面事件-下一页
        rightFuc: (fuc) => {fuc && fuc()}              // vue-touch右滑页面事件-上一页
      },
      isBack: false,                                   // 判断是否返回上一页
      scrollToTop: true,                               // 是否滚动到顶部
      isReload: false,                                 // 控制是否刷新页面
      needLogin: true                                  // 进入页面需要登录
    }
  }, {
    path: '/appBarCode',
    name: 'AppBarCode',
    component: AppBarCode,
    meta: {
      title: '二维码',                                   // 页面标题
      header: {
        left: 'ios-arrow-back',                            // header左边按钮
        leftFuc: (fuc) => {fuc && fuc()},              // header左边按钮点击事件
        right: 'md-menu',                                 // header右边按钮
        rightFuc: (fuc) => {fuc && fuc()}              // header右边按钮点击事件
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},              // vue-touch左滑页面事件-下一页
        rightFuc: (fuc) => {fuc && fuc()}              // vue-touch右滑页面事件-上一页
      },
      isBack: false,                                   // 判断是否返回上一页
      scrollToTop: true,                               // 是否滚动到顶部
      isReload: false,                                 // 控制是否刷新页面
      needLogin: true                                  // 进入页面需要登录
    }
  }, {
    path: '/appHeadPhoto',
    name: 'AppHeadPhoto',
    component: AppHeadPhoto,
    meta: {
      title: '头像',                                   // 页面标题
      header: {
        left: 'ios-arrow-back',                            // header左边按钮
        leftFuc: (fuc) => {fuc && fuc()},              // header左边按钮点击事件
        right: 'md-menu',                                 // header右边按钮
        rightFuc: (fuc) => {fuc && fuc()}              // header右边按钮点击事件
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},              // vue-touch左滑页面事件-下一页
        rightFuc: (fuc) => {fuc && fuc()}              // vue-touch右滑页面事件-上一页
      },
      isBack: false,                                   // 判断是否返回上一页
      scrollToTop: true,                               // 是否滚动到顶部
      isReload: false,                                 // 控制是否刷新页面
      needLogin: true                                  // 进入页面需要登录
    }
  }]
})

Vue.use(Router)
