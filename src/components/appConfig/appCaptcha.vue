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
  import captcha011 from '../../common/images/captcha/captcha011.jpg'
  import captcha012 from '../../common/images/captcha/captcha012.jpg'
  import captcha013 from '../../common/images/captcha/captcha013.jpg'
  import captcha014 from '../../common/images/captcha/captcha014.jpg'
  import captcha015 from '../../common/images/captcha/captcha015.jpg'
  import captcha016 from '../../common/images/captcha/captcha016.jpg'
  import captcha017 from '../../common/images/captcha/captcha017.jpg'
  import captcha018 from '../../common/images/captcha/captcha018.jpg'
  import captcha019 from '../../common/images/captcha/captcha019.jpg'
  import captcha020 from '../../common/images/captcha/captcha020.jpg'
  import captcha021 from '../../common/images/captcha/captcha021.jpg'
  import captcha022 from '../../common/images/captcha/captcha022.jpg'
  import captcha023 from '../../common/images/captcha/captcha023.jpg'
  import captcha024 from '../../common/images/captcha/captcha024.jpg'
  import captcha025 from '../../common/images/captcha/captcha025.jpg'
  import captcha026 from '../../common/images/captcha/captcha026.jpg'
  import captcha027 from '../../common/images/captcha/captcha027.jpg'
  import captcha028 from '../../common/images/captcha/captcha028.jpg'
  import captcha029 from '../../common/images/captcha/captcha029.jpg'
  import captcha030 from '../../common/images/captcha/captcha030.jpg'
  import captcha031 from '../../common/images/captcha/captcha031.jpg'
  import captcha032 from '../../common/images/captcha/captcha032.jpg'
  import captcha033 from '../../common/images/captcha/captcha033.jpg'
  import captcha034 from '../../common/images/captcha/captcha034.jpg'
  import captcha035 from '../../common/images/captcha/captcha035.jpg'
  import captcha036 from '../../common/images/captcha/captcha036.jpg'
  import captcha037 from '../../common/images/captcha/captcha037.jpg'
  import captcha038 from '../../common/images/captcha/captcha038.jpg'
  import captcha039 from '../../common/images/captcha/captcha039.jpg'
  import captcha040 from '../../common/images/captcha/captcha040.jpg'
  import captcha041 from '../../common/images/captcha/captcha041.jpg'
  import captcha042 from '../../common/images/captcha/captcha042.jpg'
  import captcha043 from '../../common/images/captcha/captcha043.jpg'
  import captcha044 from '../../common/images/captcha/captcha044.jpg'
  import captcha045 from '../../common/images/captcha/captcha045.jpg'
  import captcha046 from '../../common/images/captcha/captcha046.jpg'
  import captcha047 from '../../common/images/captcha/captcha047.jpg'
  import captcha048 from '../../common/images/captcha/captcha048.jpg'
  import captcha049 from '../../common/images/captcha/captcha049.jpg'
  import headerFace001 from '../../common/images/small-icon/headerFace001.png'
  require('../../common/js/isCaptcha.js')
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
          captcha010,
          captcha011,
          captcha012,
          captcha013,
          captcha014,
          captcha015,
          captcha016,
          captcha017,
          captcha018,
          captcha019,
          captcha020,
          captcha021,
          captcha022,
          captcha023,
          captcha024,
          captcha025,
          captcha026,
          captcha027,
          captcha028,
          captcha029,
          captcha030,
          captcha031,
          captcha032,
          captcha033,
          captcha034,
          captcha035,
          captcha036,
          captcha037,
          captcha038,
          captcha039,
          captcha040,
          captcha041,
          captcha042,
          captcha043,
          captcha044,
          captcha045,
          captcha046,
          captcha047,
          captcha048,
          captcha049
        ]
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.draw()
    }, 8)
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
      drawCaptcha.init({
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
