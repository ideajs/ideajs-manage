import Vue from 'vue'
import Router from 'vue-router'

const AppStart = () => import('@/components/appStart')
const AppCaptcha = () => import('@/components/appConfig/appCaptcha')
const AppBarCode = () => import('@/components/appConfig/appBarCode')
const AppPhotoImg = () => import('@/components/appConfig/appPhotoImg')

const AppIndex = () => import('@/components/appMain/appIndex')

const AppRegiste = () => import('@/components/appMember/appRegiste')
const AppLogin = () => import('@/components/appMember/appLogin')

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
