<!-- Created by macmzon@163.com-->
<template>
  <div class="appMenu">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="menuMain container">
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
import appHeader from '@/components/appConfig/appHeader.vue'
export default {
  name: 'appMenu',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        headerInfo: this.$route.meta,
        userLogin: localStorage.getItem('userLogin'),     // 获取客户登录状态
        menuShow: false,
        Menu: []
      }
    }
  },
  created () {
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
    }
    this.getMenu()
  },
  methods: {
    back () {
      this.$back({
        path: '/appIndex',
        query: {
          type: '3'
        }
      }, this)
    },
    getMenu () {
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
