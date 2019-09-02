<!-- Created by macmzon@163.com-->
<template>
  <div class="appMenu">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="menuMain container">
      <div class="">
        <div v-for="item in data.Menu" class="menuList" @click="menuGo(item)">{{item.title}}</div>
      </div>
      <div class="">
      </div>
    </div>
  </div>
</template>

<script>
let Base64 = require('js-base64').Base64
import { Button } from 'iview'
import { Popup } from 'vux'
import { _getMenu } from '@/common/js/appMain/function'
import appHeader from'@/components/appConfig/appHeader.vue'
export default {
  name: 'appMenu',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        headerInfo: this.$route.meta,
        menuShow: false,
        curMenu: {
          title: '英语',
          list: []
        },
        Menu: []
      }
    }
  },
  created () {
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
    }
    this.getEnMenu()
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appIndex',
        query: {
          type: '3'
        }
      })
    },
    menuGo (data) {
      this.$route.meta.isBack = false
      if (this.getCourseFlag(data.id) === 'learning') {
        // 学习课程
        this.$push({
          path: '/appEnDetail',
          query: {
            title: data.title,
            id: data.id
          }
        })
      } else {
        // 报名课程
        this.$push({
          path: '/appSign',
          query: {
            id: data.id,
            money: data.money
          }
        })
      }
    },
    getEnMenu () {
      _getMenu((res) => {
        this.data.Menu = res.course
      })
    },
    getCourseFlag (flag) {
      flag = Base64.encode(flag)
      return !this.data.user.course[flag] ? 'unlearn' : 'learning'
    }
  },
  components: {
    appHeader, Button, Popup
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "stylus/appMenu.styl"
</style>
