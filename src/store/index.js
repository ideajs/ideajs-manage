// Created by macmzon@163.com

// 引入vue 和 vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 直接导出 一个 Store 的实例
export default new Vuex.Store({
  // 类似 vue 的 data
  state: {
    route: {},
    direction: 'slide-left',
    userinfo: {},
    count: 0
  },
  // 类似 vue 里的 mothods(同步方法)
  mutations: {
    UPDATE_DIRECTION (state, direction) {
      state.direction = direction
    },
    SET_USERINFO (state, userinfo) {
      state.userinfo = userinfo
    },
    increment (state) {
      state.count++
    }
  }
})
