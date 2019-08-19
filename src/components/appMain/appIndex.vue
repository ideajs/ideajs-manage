<!-- Created by macmzon@163.com-->
<template>
  <div class="appIndex">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
    </div>
  </div>
</template>
<script>
import { Row, Col, Button, Drawer, Tabs, TabPane, Icon } from 'iview'
import { Popup } from 'vux'
import { _getMenu } from '@/common/js/appMain/function'
import appHeader from '@/components/appConfig/appHeader.vue'
export default {
  name: 'appIndex',
  data () {
    return {
      showBack: false,
      showMenu: false,
      data: {
        user: {},
        headerInfo: this.$route.meta,
        loopVal: 0,
        userLogin: '',
        menuName: 'course',
        menuList: [],
        course: [],
        unlearn: [],
        learn: []
      }
    }
  },
  created () {
    this.data.menuName = this.$route.query.menuName || 'course'
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
    } else {
      this.data.user.course = {}
    }
    this.getCourse()
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.getMenu                 // header左侧返回按钮事件
    this.$route.meta.header.rightFuc = this.getMember             // header右侧菜单按钮事件
  },
  methods: {
    getMenu () {
      _getMenu((res) => {
        this.$route.meta.isBack = false
        this.data.menuList = res.course
        this.showMenu = true
      })
    },
    menuGo (data) {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appSign',
        query: {
          id: data.id,
          money: data.money
        }
      })
    },
    userLogin (url) {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appLogin',
        query: {
          fromUrl: '/appIndex',
          toUrl: url
        }
      })
    },
  },
  filters: {
  },
  components: {
    appHeader, Row, Col, Button, Popup, Drawer, Tabs, TabPane, Icon
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appIndex.styl"
</style>
