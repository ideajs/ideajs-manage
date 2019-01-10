<!-- Created by macmzon@163.com-->
<template>
  <div class="appRegiste">
    <div v-transfer-dom>
      <popup v-model="show"></popup>
    </div>
    <div class="container">
      <img width="100px" height="100px" class="headerFace" :src="data.headerFace" />

      <Form ref="formInline" :model="data.formInline" :rules="data.ruleInline" inline>
        <FormItem prop="user">
          <Input type="text" size="large" v-model.trim="data.formInline.user" clearable placeholder="用户名 (6-18位英文、数字)">
          <Icon type="ios-person" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="phone">
          <Input class="phone" type="text" size="large" v-model.trim="data.formInline.phone" clearable placeholder="手机号 (11位数字)">
          <Icon type="md-phone-portrait" slot="prepend"></Icon>
          </Input>
          <Button class="phoneCode" type="primary" @click="postCode()">发送验证码</Button>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" size="large" v-model.trim="data.formInline.password" clearable placeholder="密码 (6-18位英文、数字)">
          <Icon type="ios-lock" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
      <appCaptcha :appCaptchaInfo="data.appCaptchaInfo"></appCaptcha>
      <div class="onLogin">
        <span>已注册？马上去</span><span @click="onLogin">登录</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { Button, Input, Form, FormItem, Icon } from 'iview'
  import { Popup } from 'vux'
  import appCaptcha from'@/components/appConfig/appCaptcha.vue'
  import headerFace001 from '../../common/images/small-icon/headerFace001.png'
export default {
  name: 'appRegiste',
  data () {
    return {
      show: false,
      data: {
        headerFace: headerFace001,
        formInline: {
          user: '',
          phone: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '用户名错误', trigger: 'blur' },
            { pattern: /^\w{6,18}$/, message: '用户名应为6-18位英文、数字和_', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '手机号错误', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '手机号应为11位数字', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码错误', trigger: 'blur' },
            { pattern: /^\w{6,18}$/, message: '密码应为6-18位英文、数字和_', trigger: 'blur' }
          ]
        },
        appCaptchaInfo: {

        }
      }
    }
  },
  mounted () {
    this.data.appCaptchaInfo.start = this.start
  },
  methods: {
    start () {
      console.log(this.data.formInline)
//      this.$route.meta.isBack = false
//      this.$push({
//        path: '/appIndex',
//        query: {
//          type: '3'
//        }
//      })
    },
    onLogin () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appLogin',
        query: {
          type: '3'
        }
      })
    },
    postCode () {
      console.log('发送手机验证码')
    }
  },
  components: {
    appCaptcha, Button, Input, Form, FormItem, Icon, Popup
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appRegiste.styl"
</style>
