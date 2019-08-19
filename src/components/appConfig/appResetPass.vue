<!-- Created by macmzon@163.com-->
<template>
  <div class="appResetPass">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div v-if="data.formData" class="p-main">
        <Form ref="formData" :model="data.formData" inline>
          <FormItem prop="user">
            <Input type="text" :maxlength="30" size="large" v-model.trim="data.formData.user" clearable placeholder="请输入用户名(必填)">
              <span slot="prepend">用户名</span>
            </Input>
          </FormItem>
          <FormItem prop="phone">
            <Input class="phone" number :maxlength="11" size="large" v-model.trim="data.formData.phone" clearable placeholder="请输入手机号(必填)">
              <span slot="prepend">手机号</span>
            </Input>
            <!-- <Button class="phoneCode" type="primary" @click="postCode()">发送验证码</Button> -->
          </FormItem>
          <FormItem prop="pass" class="p-pass">
            <Input :type="data.passType" :maxlength="12" size="large" v-model.trim="data.formData.pass" clearable placeholder="设置密码(6-12位英文、数字)">
              <span slot="prepend">新密码</span>
              <span slot="append" @click="seePass()">
                <Icon v-if="!data.seePass" type="md-eye" />
                <Icon v-if="data.seePass" type="md-eye-off" />
              </span>
            </Input>
          </FormItem>
          <FormItem prop="copyPass">
            <Input :type="data.passType" :maxlength="12" size="large" v-model.trim="data.formData.copyPass" clearable placeholder="请再次输入密码">
              <span slot="prepend">验密码</span>
            </Input>
          </FormItem>
        </Form>
      </div>
      <div class="p-bottom">
        <Button type="warning" round @click="confirmBtn()">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Input, Form, FormItem, Icon, Modal, Message } from 'iview'
import { Popup } from 'vux'
import appHeader from'@/components/appConfig/appHeader.vue'

export default {
  name: 'appResetPass',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        userLogin: '',
        seePass: false,
        passType: 'password',
        headerInfo: this.$route.meta,
        formData: {
          user: '',
          phone: '',
          pass: '',
          copyPass: ''
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
          pass: {
            pattern: /^[a-zA-Z0-9]{6,12}$/,
            message: '密码应为6-12位英文、数字'
          },
          copyPass: {
            pattern: /^[a-zA-Z0-9]{6,12}$/,
            message: '密码应为6-12位英文、数字'
          },
        }
      }
    }
  },
  created () {
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      Message.destroy()
      this.$route.meta.isBack = true
      this.$back({
        path: '/appSet',
        query: {
          type: '3'
        }
      })
    },
    seePass () {
      Message.destroy()
      this.data.seePass = !this.data.seePass
      this.data.passType = this.data.seePass ? 'text' : 'password'
    },
    confirmBtn () {
      Message.destroy()
      let rule = this.data.formRule
      if (!rule.user.pattern.test(this.data.formData.user)) {
        Message.info({
          content: rule.user.message + '，请重新输入！',
          duration: 6,
          closable: true
        })
        return
      }
      if (!rule.phone.pattern.test(this.data.formData.phone)) {
        Message.info({
          content: rule.phone.message + '，请重新输入！',
          duration: 6,
          closable: true
        })
        return
      }
      if (!rule.pass.pattern.test(this.data.formData.pass)) {
        Message.info({
          content: rule.pass.message + '，请重新输入！',
          duration: 6,
          closable: true
        })
        return
      }
      if (this.data.formData.pass !== this.data.formData.copyPass) {
        Message.info({
          content: '两次输入的密码不一致，请重新输入！',
          duration: 6,
          closable: true
        })
        return
      }
      this.data.user = JSON.parse(localStorage.getItem(this.data.formData.phone))       // 获取客户信息
      if (this.data.user) {
        if (this.data.user.userInfo.user === this.data.formData.user) {
          this.data.user.userInfo.pass = this.data.formData.pass
          localStorage.setItem(this.data.formData.phone, JSON.stringify(this.data.user))
          localStorage.setItem('userLogin', this.data.formData.phone)
          Modal.warning({
            title: '信息提示',
            content: '密码修改成功！',
            okText: '确定',
            onOk: () => {
              this.back()
            }
          })
        } else {
          Message.info({
            content: '用户名：' + this.data.formData.user + '错误，请重新输入！',
            duration: 6,
            closable: true
          })
        }
      } else {
        Message.info({
          content: '手机号：' + this.data.formData.phone + '错误，请重新输入！',
          duration: 6,
          closable: true
        })
      }
    }
  },
  components: {
    appHeader, Button, Popup, Input, Form, FormItem, Icon, Modal, Message
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appResetPass.styl"
</style>
