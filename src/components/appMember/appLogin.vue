<!-- Created by macmzon@163.com-->
<template>
  <div class="appLogin">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <img width="100px" height="100px" class="headerFace" :src="data.headerFace" />
      <Form ref="formData" :model="data.formData" inline>
        <FormItem prop="phone">
          <Input number :maxlength="11" size="large" v-model="data.formData.phone" clearable placeholder="请输入手机号(必填)">
          <Icon type="md-phone-portrait" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="key">
          <Input type="password" :maxlength="12" size="large" v-model="data.formData.key" clearable placeholder="密码(6-12位英文、数字)">
          <Icon type="ios-lock" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
      <appCaptcha :appCaptchaInfo="data.appCaptchaInfo"></appCaptcha>
      <div class="onRegiste">
        <span>未注册？马上去</span><span @click="onRegiste">注册</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, Input, Form, FormItem, Icon, Modal, Message } from 'iview'
import { Popup } from 'vux'
import appHeader from'@/components/appConfig/appHeader.vue'
import appCaptcha from'@/components/appConfig/appCaptcha.vue'
import headerFace001 from '@/common/images/small-icon/headerFace001.png'
export default {
  name: 'appLogin',
  data () {
    return {
      showBack: false,
      data: {
        headerFace: headerFace001,
        headerInfo: this.$route.meta,
        fromUrl: this.$route.query.fromUrl || '/appMember',
        toUrl: this.$route.query.toUrl,
        formData: {
          user: '',
          phone: '',
          key: ''
        },
        formRule: {
          user: {
            pattern: /^[a-zA-Z0-9\u4E00-\u9FA5]{2,30}$/,
            message: '姓名应为2-30位英文、数字、中文等'
          },
          phone: {
            pattern: /^1[1-9]\d{9}$/,
            message: '手机号应为11位数字'
          },
          key: {
            pattern: /^[a-zA-Z0-9]{6,12}$/,
            message: '密码应为6-12位英文、数字'
          }
        },
        appCaptchaInfo: {
        }
      }
    }
  },
  created () {
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.data.appCaptchaInfo.start = this.start
  },
  methods: {
    back () {
      Message.destroy()
      this.$back({
        path: this.data.fromUrl,
        query: {
          type: '3'
        }
      }, this)
    },
    start () {
      Message.destroy()
      let rule = this.data.formRule
      // if (!rule.user.pattern.test(this.data.formData.user)) {
      //   Message.info({
      //     content: rule.user.message + '，请重新输入！',
      //     duration: 3,
      //     closable: true
      //   })
      //   return
      // }
      if (!rule.phone.pattern.test(this.data.formData.phone)) {
        Message.info({
          content: rule.phone.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (!rule.key.pattern.test(this.data.formData.key)) {
        Message.info({
          content: rule.key.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      let usermsg = JSON.parse(localStorage.getItem(this.data.formData.phone))
      if (usermsg) {
        if (usermsg.userInfo.key === this.data.formData.key) {
          localStorage.setItem('userLogin', this.data.formData.phone)
          document.getElementById('msg').innerHTML = ''
          if (this.data.toUrl) {
            this.forward()
          } else {
            this.back()
          }
        } else {
          Message.info({
            content: '密码错误，请重试',
            duration: 3,
            closable: true
          })
        }
      } else {
        Message.info({
          content: '手机号：' + this.data.formData.phone + '错误，请重试！',
          duration: 3,
          closable: true
        })
      }
    },
    forward () {
      Message.destroy()
      this.$push({
        path: this.data.toUrl,
        query: {
          type: '3'
        }
      }, this)
    },
    onRegiste () {
      Message.destroy()
      this.$push({
        path: '/appRegiste',
        query: {
          fromUrl: this.data.fromUrl,
          toUrl: this.data.toUrl
        }
      }, this)
    }
  },
  components: {
    appHeader, appCaptcha, Button, Input, Form, FormItem, Icon, Popup, Modal, Message
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appLogin.styl"
</style>
