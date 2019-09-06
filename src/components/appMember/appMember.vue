<!-- Created by macmzon@163.com-->
<template>
  <div class="appMember">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="">
      </div>
    </div>
  </div>
</template>

<script>
let Base64 = require('js-base64').Base64
import { Button, Row, Col, Modal, Icon, CellGroup, Cell } from 'iview'
import { Popup } from 'vux'
import appHeader from'@/components/appConfig/appHeader.vue'
import headImg from './images/headImg.png'
export default {
  name: 'appMember',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        userLogin: localStorage.getItem('userLogin'),     // 客户登录状态
        headerInfo: this.$route.meta,
        headImg: headImg,
        newDate: '-年-月-日',
        newWeek: '周-'
      }
    }
  },
  created () {
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.header.rightFuc = this.getSet             // header右侧菜单按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      this.data.money = this.data.user.money.ballance || this.data.money
    }
    this.getNewDate()
  },
  methods: {
    back () {
      this.$back({
        path: '/appIndex',
        query: {
          menuName: 'course'
        }
      }, this)
    },
    getNewDate () {
      let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let week = date.getDay()
      this.data.newDate = year + '年' + month + '月' + day + '日'
      this.data.newWeek = weeks[week]
    },
    goService () {
      this.$push({
        path: '/appService',
        query: {
          type: '3'
        }
      }, this)
    },
    userLogin (url) {
      this.$push({
        path: '/appLogin',
        query: {
          fromUrl: '/appMember',
          toUrl: url
        }
      }, this)
    },
    getSet () {
      this.$push({
        path: '/appSet',
        query: {
          type: '3'
        }
      }, this)
    },
    quit () {
      if (this.data.userLogin) {
        this.data.userLogin = ''
        localStorage.setItem('userLogin', '')
        this.data.user = {}
        Modal.warning({
          title: '信息提示',
          content: '成功退出登录！',
          okText: '确定',
          onOk: () => {
          }
        })
      } else {
        Modal.warning({
          title: '信息提示',
          content: '已经退出登录！',
          okText: '确定',
          onOk: () => {
          }
        })
      }
    }
  },
  components: {
    Button, Popup, appHeader, Row, Col, Modal, Icon, CellGroup, Cell
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appMember.styl"
</style>
