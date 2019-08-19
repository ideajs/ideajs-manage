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
            <Cell @click.native="goAddress()" class="p-address" title="收货地址" :extra="data.address">
              <Icon type="md-globe" slot="icon" />
              <Icon type="ios-arrow-forward" slot="icon" />
            </Cell>
            <Cell @click.native="goResetPass()" class="p-pass" title="密码重置" :extra="data.pass">
              <Icon type="ios-lock" slot="icon" />
              <Icon type="ios-arrow-forward" slot="icon" />
            </Cell>
          </CellGroup>
        </div>
    </div>
  </div>
</template>

<script>
import { Button, Input, Form, FormItem, Icon, Modal, CellGroup, Cell } from 'iview'
import { Popup, Datetime } from 'vux'
import appHeader from '@/components/appConfig/appHeader.vue'

export default {
  name: 'appSet',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        userLogin: '',
        headerInfo: this.$route.meta,
        formData: {
        },
      }
    }
  },
  created () {
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appMember',
        query: {
          type: '3'
        }
      })
    },
    goAddress () {
      if (this.data.userLogin) {
        this.$route.meta.isBack = false
        this.$push({
          path: '/appAddress',
          query: {
            type: '3'
          }
        })
      } else {
        this.userLogin('/appAddress?type=3')
      }
    },
    goResetPass () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appResetPass',
        query: {
          type: '3'
        }
      })
    },
    seeMyInfo () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appSeeInfo',
        query: {
          idex: '-1',
          url: '/appSet?type=3'
        }
      })
    },
  },
  components: {
    Datetime, appHeader, Button, Popup, Input, Form, FormItem, Icon, Modal, CellGroup, Cell
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appSet.styl"
</style>
