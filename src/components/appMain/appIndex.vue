<!-- Created by macmzon@163.com-->
<template>
  <div class="appIndex">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="menuMain">
      </div>
    </div>
  </div>
</template>
<script>
let Base64 = require('js-base64').Base64
import { Row, Col, Button, Drawer, Carousel, CarouselItem, Tabs, TabPane, Icon } from 'iview'
import { Popup } from 'vux'
import { _getMenu } from '@/common/js/appMain/function'
import appHeader from '@/components/appConfig/appHeader.vue'
import loopImg01 from '@/common/images/banner/study01.png'
import loopImg03 from '@/common/images/banner/english01.png'
import courseImg01 from './images/course_01.png'
export default {
  name: 'appIndex',
  data () {
    return {
      showBack: false,
      showMenu: false,
      data: {
        user: {},
        headerInfo: this.$route.meta,
        userLogin: localStorage.getItem('userLogin'),     // 获取客户登录状态
        loopVal: 0
      }
    }
  },
  created () {
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.getMenu                 // header左侧返回按钮事件
    this.$route.meta.header.rightFuc = this.getMember             // header右侧菜单按钮事件
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
    } else {
    }
  },
  methods: {
    getMenu () {
      _getMenu((res) => {
        this.data.menuList = res.course
        this.showMenu = true
      })
    },
    getMember () {
      this.$push({
        path: '/appMember',
        query: {
          type: '3'
        }
      }, this)
    },
    getCourseFlag (flag) {
      flag = Base64.encode(flag)
      return !this.data.user.course[flag] ? 'unlearn' : 'learning'
    }
  },
  filters: {
  },
  components: {
    appHeader, Row, Col, Button, Popup, Drawer, Carousel, CarouselItem, Tabs, TabPane, Icon
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appIndex.styl"
</style>
