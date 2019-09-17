<!-- Created by macmzon@163.com-->
<template>
  <div class="appRegiste">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <Form ref="formData" :model="data.formData.userInfo" inline>
        <FormItem prop="user">
          <Input type="text" :maxlength="30" size="large" v-model.trim="data.formData.userInfo.user" clearable placeholder="请输入用户名(必填)">
          <Icon type="ios-person" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="phone">
          <Input class="phone" number :maxlength="11" size="large" v-model.trim="data.formData.userInfo.phone" clearable placeholder="请输入手机号(必填)">
          <Icon type="md-phone-portrait" slot="prepend"></Icon>
          </Input>
          <!-- <Button class="phoneCode" type="primary" @click="postCode()">发送验证码</Button> -->
        </FormItem>
        <FormItem prop="key">
          <Input type="password" :maxlength="12" size="large" v-model.trim="data.formData.userInfo.key" clearable placeholder="设置密码(6-12位英文、数字)">
          <Icon type="ios-lock" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
      <appCaptcha :appCaptchaInfo="data.appCaptchaInfo"></appCaptcha>
      <div class="onLogin">
        <span>已注册？马上去</span><span @click="back">登录</span>
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
  name: 'appRegiste',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        headerFace: headerFace001,
        headerInfo: this.$route.meta,
        fromUrl: this.$route.query.fromUrl || '/appMember',
        toUrl: this.$route.query.toUrl,
        formData: {
          userInfo: {
            type: ['家人'],           // 朋友圈类型
            id: new Date().getTime(), // 学号
            headImg: '',              // 头像
            user: '',                 // 用户名
            sex: ['男'],              // 性别
            birthday: '',             // 生日
            label: '',                // 标签
            phone: '',                // 手机号
            weixin: '',               // 微信
            qq: '',                   // QQ
            key: '',                 // 通行证
            company: '',              // 公司
            work: '',                 // 职业
            title: '',                // 职称
            email: '',                // 邮箱
            address: '',              // 地址
            sign: ''                  // 签名
          },
          course: {},               // 已激活课程
          collectEnWords: {},       // 英语词汇收藏
          learn: {},                // 在学小课程
          money: {                  // 钱包
            total: '0.00',          // 充值总额
            balance: '0.00',        // 余额
            list: []                // 充值历史记录
          },
          jifen: 0,                 // 课程积分(1元兑换1积分)
          order: [],                // 订单
          prove: {                 // 认证
            name: '',              // 姓名
            idCode: '',            // 身份证号码
            phone: '',             // 手机号
            idPhotoA: '',           // 身份证正面照片
            idPhotoB: '',           // 身份证背面照片
            status: '0',           // 认证状态，0 未认证，1 认证失败，2 认证成功
            error: '',             // 认证失败原因
            date: ''               // 认证成功日期
          },
          friends: [],              // 朋友圈
          message: [],              // 消息
          video: [],                // 视频课程
          chat: [],                 // 聊天
          kefu: []                  // 客服聊天
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
        path: '/appLogin',
        query: {
          fromUrl: this.data.fromUrl,
          toUrl: this.data.toUrl
        }
      }, this)
    },
    start () {
      Message.destroy()
      let rule = this.data.formRule
      if (!rule.user.pattern.test(this.data.formData.userInfo.user)) {
        Message.info({
          content: rule.user.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (!rule.phone.pattern.test(this.data.formData.userInfo.phone)) {
        Message.info({
          content: rule.phone.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (!rule.key.pattern.test(this.data.formData.userInfo.key)) {
        Message.info({
          content: rule.key.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (localStorage.getItem(this.data.formData.userInfo.phone)) {
        Message.info({
          content: '手机号：' + this.data.formData.userInfo.phone + '已经注册！',
          duration: 3,
          closable: true
        })
        return
      }
      this.data.user =  this.data.formData          // 客户信息
      localStorage.setItem(this.data.formData.userInfo.phone, JSON.stringify(this.data.user))
      localStorage.setItem('userLogin', this.data.formData.userInfo.phone)
      Modal.warning({
        title: '信息提示',
        content: '用户注册成功！',
        okText: '确定',
        onOk: () => {
          this.$back({
            path: '/appMember',
            query: {
              type: '3'
            }
          }, this)
        }
      })
    },
    postCode () {
      // console.log('发送手机验证码')
    }
  },
  components: {
    appHeader, appCaptcha, Button, Input, Form, FormItem, Icon, Popup, Modal, Message
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appRegiste.styl"
</style>
