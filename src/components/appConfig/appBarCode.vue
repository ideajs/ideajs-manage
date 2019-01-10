<!-- Created by macmzon@163.com-->
<template>
  <div class="appBarCode">
    <div v-transfer-dom>
      <popup v-model="show"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="">
      <div>
        <vue-qr :autoColor="false" :logoMargin="data.logoMargin" :colorDark="data.colorDark" :bgSrc="data.bgSrc" :logoSrc="data.logoSrc" :margin="0" :callback="getCodeInfo" :text="data.codeValue" :logoScale="data.logoScale" :size="data.codeSize"></vue-qr>
      </div>
      <Button type="primary" round @click.active="back()">上一页</Button>
      <Button type="success" round @click.active="start()">下一页</Button>
    </div>
  </div>
</template>

<script>
  import VueQr from 'vue-qr'
  import {Button} from 'iview'
  import { Popup } from 'vux'
  import appHeader from'@/components/appConfig/appHeader.vue'
  import logoSrc from'@/common/images/small-icon/appBarCode001.png'
  import bgSrc from'@/common/images/small-icon/appBarCode014.jpg'

  export default {
    name: 'appBarCode',
    data () {
      return {
        show: false,
        data: {
          headerInfo: this.$route.meta,
          logoSrc: logoSrc, // 默认二维码中间图片
          bgSrc: bgSrc, // 默认二维码背景图片
          logoScale: 1,
          codeSize: 128, // 二维码宽高
          colorDark: '#0303A0', // 二维码颜色
          logoMargin: 0,
          codeValue: location.href // 扫码后跳转的链接地址
        }
      }
    },
    mounted () {
        /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
      this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
      this.$route.meta.header.rightFuc = this.getMenu             // header右侧菜单按钮事件
      this.$route.meta.touch.leftFuc = this.start                 // 页面向左滑动事件
      this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
    },
    methods: {
      start () {
        this.$route.meta.isBack = false
        this.$push({
          path: '/appSet',
          query: {
            type: '3'
          }
        })
      },
      back () {
        this.$route.meta.isBack = true
        this.$push({
          path: '/appIndex',
          query: {
            type: '3'
          }
        })
      },
      getMenu () {
        this.$route.meta.isBack = false
        this.$push({
          path: '/appMenu',
          query: {
            type: '3'
          }
        })
      },
      getCodeInfo (url, id){
//        console.log(url)
      }
    },
    components: {
      VueQr, appHeader, Button, Popup
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
