<!-- Created by macmzon@163.com-->
<template>
  <div class="appScan">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="scan">
        <div id="bcid">
          <div style="height:40%;margin-top:2.3rem"></div>
          <div class="tip">...载入中...</div>
        </div>
        <div class="footer">
          <Button type="primary" @click="startRecognize">开始扫描</Button>
          <Button type="error" @click="cancelScan">结束扫描</Button>
        </div>
      </div>
      <!--<Button type="success" round @click.active="back()">上一页</Button>
      <Button type="success" round @click.active="start()">下一页</Button>-->
    </div>
  </div>
</template>

<script>
import { Button } from 'iview'
import { Popup } from 'vux'
import appHeader from '@/components/appConfig/appHeader.vue'

let scan = null
export default {
  name: 'appScan',
  data () {
    return {
      showBack: false,
      data: {
        headerInfo: this.$route.meta,
        codeUrl: '',
        codeType: ''
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
      this.$route.meta.isBack = true
      this.$push({
        path: '/appIndex',
        query: {
          type: '3'
        }
      })
    },
    //创建扫描控件
    startRecognize() {
      if (!window.plus) return
      scan = new plus.barcode.Barcode('bcid')
      scan.onmarked = (type, result, file) => {
        switch (type) {
          case plus.barcode.QR:
            type = 'QR'
            break
          case plus.barcode.EAN13:
            type = 'EAN13'
            break
          case plus.barcode.EAN8:
            type = 'EAN8'
            break
          default:
            type = '其它' + type
            break
        }
        this.codeUrl = result.replace(/\n/g, '')
        this.codeType = type
      }
      this.startScan()
    },
    //开始扫描
    startScan() {
      if (!window.plus) return
      scan.start()
    },
    //关闭扫描
    cancelScan() {
      if (!window.plus) return
      scan.cancel()
      this.closeScan()
    },
    //关闭条码识别控件
    closeScan() {
      if (!window.plus) return
      scan.close()
    }
  },
  components: {
    appHeader, Button, Popup
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./stylus/appScan.styl"
</style>
