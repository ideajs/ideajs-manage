<!-- Created by macmzon@163.com-->
<template>
  <div class="appSet">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
        <div class="p-main">
          <CellGroup>
            <Cell @click.native="seeMyInfo()" class="p-myInfo" title="个人信息" :extra="data.myInfo">
              <Icon type="ios-contact" slot="icon" />
              <Icon type="ios-arrow-forward" slot="icon" />
            </Cell>
            <Cell @click.native="goResetkey()" class="p-key" title="密码重置" :extra="data.key">
              <Icon type="ios-lock" slot="icon" />
              <Icon type="ios-arrow-forward" slot="icon" />
            </Cell>
          </CellGroup>
        </div>
    </div>
  </div>
</template>

<script>
import { Button, Icon, Modal, CellGroup, Cell } from 'iview'
import { Popup, Datetime } from 'vux'
import appHeader from '@/components/appConfig/appHeader.vue'

export default {
  name: 'appSet',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        userLogin: localStorage.getItem('userLogin'),     // 获取客户登录状态
        headerInfo: this.$route.meta
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
  },
  methods: {
    back () {
      this.$back({
        path: '/appMember',
        query: {
          type: '3'
        }
      }, this)
    },
    userLogin (url) {
      this.$push({
        path: '/appLogin',
        query: {
          fromUrl: '/appSet',
          toUrl: url
        }
      }, this)
    },
    goResetkey () {
      this.$push({
        path: '/appResetkey',
        query: {
          type: '3'
        }
      }, this)
    },
    seeMyInfo () {
      if (this.data.userLogin) {
        this.$push({
          path: '/appSeeInfo',
          query: {
            idex: '-1',
            url: '/appSet?type=3'
          }
        }, this)
      } else {
        this.userLogin('/appAddress?idex=-1&url=/appSet?type=3')
      }
    },
  },
  components: {
    Datetime, appHeader, Button, Popup, Icon, Modal, CellGroup, Cell
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appSet.styl"
</style>
