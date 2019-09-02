<!-- Created by macmzon@163.com-->
<template>
  <div class="appIdCard">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="x-title">——请拍摄并上传身份证照片——</div>
      <Form ref="formData" :model="data.formData" inline>
        <FormItem prop="idPhotoA">
          <div class="x-title">身份证正面</div>
          <div @click="changePhoto('idPhotoA')" class="idPhoto idPhotoA">
            <Icon type="ios-camera" />
            <img class="x-img" :src="data.formData.idPhotoA || data.idPhotoA" />
          </div>
        </FormItem>
        <FormItem prop="idPhotoB">
          <div class="x-title">身份证背面</div>
          <div @click="changePhoto('idPhotoB')" class="idPhoto idPhotoB">
            <Icon type="ios-camera" />
            <img class="x-img" :src="data.formData.idPhotoB || data.idPhotoB" />
          </div>
        </FormItem>
      </Form>
      <div class="x-title">——拍摄身份证要求——</div>
      <div class="x-msg">要求持有的身份证真实有效，拍摄时</div>
      <div class="x-msg">确保身份证<span>边框完整、字体清晰、亮度均匀。</span></div>
      <div class="x-prove">
        <Button class="x-button" type="error" size="large" @click="submit()">提交</Button>
      </div>
    </div>
  </div>
</template>

<script>
let Base64 = require('js-base64').Base64
import { Button, Input, Form, FormItem, Icon, Modal, Message } from 'iview'
import { Popup } from 'vux'
import appHeader from '@/components/appConfig/appHeader.vue'
import idPhotoA from './images/idcard01_03.png'
import idPhotoB from './images/idcard01_06.png'
export default {
  name: 'appIdCard',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        email: '',
        headerInfo: this.$route.meta,
        idPhotoA: idPhotoA,           // 默认，身份证正面照片
        idPhotoB: idPhotoB,           // 默认，身份证背面照片
        formData: {
          name: '',              // 姓名
          idCode: '',            // 身份证号码
          phone: '',             // 手机号
          idPhotoA: '',           // 身份证正面照片
          idPhotoB: '',           // 身份证背面照片
          status: '0',           // 认证状态，0 未认证，1 认证失败，2 认证成功 3 认证中
          error: '',             // 认证失败原因
          date: ''               // 认证成功日期
        },
        formRule: {
          name: {
            pattern: /^[a-zA-Z0-9\u4E00-\u9FA5]{2,30}$/,
            message: '姓名应为2-30位英文、数字、中文等'
          },
          idCode: {
            pattern: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
            message: '身份证号码应为15/18位数字和X'
          }
        }
      }
    }
  },
  created () {
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      this.data.formData = this.data.user.prove
      this.data.formData.idPhotoA = localStorage.getItem('idPhotoA') || this.data.formData.idPhotoA
      this.data.formData.idPhotoB = localStorage.getItem('idPhotoB') || this.data.formData.idPhotoB
    }
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$push({
        path: '/appProve',
        query: {
          type: '3'
        }
      })
    },
    changePhoto (type) {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appPhotoImg',
        query: {
          type: type,
          fromUrl: '/appIdCard'
        }
      })
    },
    submit () {
      Message.destroy()
      if (!this.data.formData.idPhotoA.replace(/\s/g, '')) {
        Message.info({
          content: '请上传身份证照片(正面)',
          duration: 3,
          closable: true
        })
        return
      }
      if (!this.data.formData.idPhotoB.replace(/\s/g, '')) {
        Message.info({
          content: '请上传身份证照片(背面)',
          duration: 3,
          closable: true
        })
        return
      }
      this.data.formData.date = new Date().getTime()
      this.data.formData.status = '2'
      this.data.user.prove = this.data.formData          // 客户信息
      localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
      localStorage.removeItem('idPhotoA')
      localStorage.removeItem('idPhotoB')
      this.data.email = 'mailto:macmzon@163.com?subject=身份信息认证&body=' + Base64.encode(JSON.stringify(this.data.user))
      this.nextStep()
    },
    nextStep () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appProveResult',
        query: {
          type: '3'
        }
      })
    }
  },
  components: {
    appHeader, Button, Input, Form, FormItem, Icon, Popup, Modal, Message
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appIdCard.styl"
</style>
