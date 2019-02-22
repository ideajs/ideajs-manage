<!-- Created by macmzon@163.com-->
<template>
  <div class="appCaptcha">
    <div class="container">
      <div id="captcha"></div>
      <div id="msg"></div>
      <img id="captchaImg" style="display:none;" width="100px" height="40px" :src="data.captchaImg" />
    </div>
  </div>
</template>

<script>
  import { Button, Input, Form, FormItem, Icon } from 'iview'
  import {drawCaptcha} from '../../common/js/isCaptcha.js'
  import captcha001 from '../../common/images/captcha/captcha001.jpg'
  import captcha002 from '../../common/images/captcha/captcha002.jpg'
  import captcha003 from '../../common/images/captcha/captcha003.jpg'
  import captcha004 from '../../common/images/captcha/captcha004.jpg'
  import captcha005 from '../../common/images/captcha/captcha005.jpg'
  import captcha006 from '../../common/images/captcha/captcha006.jpg'
  import captcha007 from '../../common/images/captcha/captcha007.jpg'
  import captcha008 from '../../common/images/captcha/captcha008.jpg'
  import captcha009 from '../../common/images/captcha/captcha009.jpg'
  import captcha010 from '../../common/images/captcha/captcha010.jpg'
  import headerFace001 from '../../common/images/small-icon/headerFace001.png'
export default {
  name: 'appCaptcha',
  props: {
    appCaptchaInfo: {}
  },
  data () {
    return {
      show: false,
      data: {
        headerFace: headerFace001,
        captchaImg: captcha001,
        imgLists: [
          captcha001,
          captcha002,
          captcha003,
          captcha004,
          captcha005,
          captcha006,
          captcha007,
          captcha008,
          captcha009,
          captcha010
        ]
      }
    }
  },
  created () {
    setTimeout(() => {
      this.draw()
    }, 600)
  },
  methods: {
    start () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appIndex',
        query: {
          type: '3'
        }
      })
    },
    draw () {
      this.data.captchaImg = this.data.imgLists[Math.floor(Math.random()*this.data.imgLists.length)]
      drawCaptcha({
        el: document.getElementById('captcha'),
        onSuccess: () => {
//          document.getElementById('msg').innerHTML = '验证成功'
//          this.start()
          this.appCaptchaInfo.start && this.appCaptchaInfo.start()
        },
        onFail: () => {
          for (let i = 0; i < 100; i++) {
            let img = this.data.imgLists[Math.floor(Math.random()*this.data.imgLists.length)]
            if (this.data.captchaImg !== img) {
              this.data.captchaImg = img
              break
            }
          }
          document.getElementById('msg').innerHTML = '验证失败，请重试'
          setTimeout(() => {
            document.getElementById('msg').innerHTML = ''
          }, 1000)
        },
        onRefresh: () => {
          for (let i = 0; i < 100; i++) {
            let img = this.data.imgLists[Math.floor(Math.random()*this.data.imgLists.length)]
            if (this.data.captchaImg !== img) {
              this.data.captchaImg = img
              break
            }
          }
          document.getElementById('msg').innerHTML = ''
        }
      })
    },
  },
  components: {
    Button, Input, Form, FormItem, Icon
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./stylus/appCaptcha.styl"
</style>
