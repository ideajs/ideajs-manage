import Vue from 'vue'
import Router from 'vue-router'

const AppStart = () => import('@/components/appStart')
const AppRegiste = () => import('@/components/appConfig/appRegiste')
const AppLogin = () => import('@/components/appConfig/appLogin')
const AppSet = () => import('@/components/appConfig/appSet')
const AppCaptcha = () => import('@/components/appConfig/appCaptcha')
const AppBarCode = () => import('@/components/appConfig/appBarCode')
const AppResetPass = () => import('@/components/appConfig/appResetPass')
const AppPhotoImg = () => import('@/components/appConfig/appPhotoImg')

const AppIndex = () => import('@/components/appMain/appIndex')
const AppMember = () => import('@/components/appMain/appMember')

/*
title 页面标题，

header 参数说明：
left或right参数设定：ios-contact 会员按钮，md-menu 菜单按钮，ios-arrow-back 左侧返回按钮，
left 左边按钮，leftFuc 左边按钮点击事件，right 右边按钮，rightFuc右边按钮点击事件，

touch 参数说明：
leftFuc 左滑页面事件-下一页，rightFuc 右滑页面事件-上一页，

isBack 判断是否返回上一页，scrollToTop 是否滚动到顶部，isReload 控制是否刷新页面，needLogin 进入页面需要登录
*/

export default new Router({
  base: '',
  transitionOnLoad: true,
  routes: [{
    path: '',
    name: 'AppStart',
    component: AppStart,
    meta: {
      title: '欢迎',
      header: {
        left: '',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appStart',
    name: 'AppStart',
    component: AppStart,
    meta: {
      title: '欢迎',
      header: {
        left: '',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appRegiste',
    name: 'AppRegiste',
    component: AppRegiste,
    meta: {
      title: '注册',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appLogin',
    name: 'AppLogin',
    component: AppLogin,
    meta: {
      title: '登录',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appIndex',
    name: 'AppIndex',
    component: AppIndex,
    meta: {
      title: '首页',
      header: {
        left: 'md-menu',
        leftFuc: (fuc) => { fuc && fuc() },
        right: 'ios-contact',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appMember',
    name: 'AppMember',
    component: AppMember,
    meta: {
      title: '会员',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: 'ios-settings',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appSet',
    name: 'AppSet',
    component: AppSet,
    meta: {
      title: '设置',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appPhotoImg',
    name: 'AppPhotoImg',
    component: AppPhotoImg,
    meta: {
      title: '图片上传',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appResetPass',
    name: 'AppResetPass',
    component: AppResetPass,
    meta: {
      title: '密码重置',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appCaptcha',
    name: 'AppCaptcha',
    component: AppCaptcha,
    meta: {
      title: '验证',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: 'md-menu',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appBarCode',
    name: 'AppBarCode',
    component: AppBarCode,
    meta: {
      title: '二维码',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: 'md-menu',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }]
})

Vue.use(Router)
