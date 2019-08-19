// Created by macmzon@163.com

// router路由，页面切换动画：in进入新页面，out返回上一页
// 视图切换动画逻辑
export function routerSlide (store, to, from) {
  let direction = 'slide-in' // 下一页
  if (from.meta.isBack && !to.meta.isBack) {
    direction = 'slide-out' // 上一页
  }
  to.meta.isBack = false
  from.meta.isBack = false
  store.commit('UPDATE_DIRECTION', direction)
}
