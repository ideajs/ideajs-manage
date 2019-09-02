<!-- Created by macmzon@163.com-->
<template>
  <div class="appAbout">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="p-main">
        <div class="p-about">
          <div class="p-content">
            “英语日记”是专为广大英语学习爱好者开发的APP，为了满足广大学员的学习要求，我们整理了详细的常用词汇、口语、阅读、写作等内容，并且按照年级从小学至大学安排课程，让学员更方便的在手机上学习。
          </div><br>
          <div class="p-content">
            “英语日记”全部课程都可以在线激活后进行学习，而且APP中还有朋友圈功能，朋友们可以将自己的好友们加进来，后期还会开放朋友圈聊天，信息分享等功能，让学员们在学习的同时，交到志同道合的朋友，和朋友们一起学习进步。
          </div>
          <div class="qrcode">
            <br><br>
            “英语日记”公众号：快来扫码关注我们吧！
          </div>
          <div class="qrImg">
            <img :src='data.qrcode' />
          </div>
          <div class="activeCode">
            关注“英语日记”公众号，发送“激活码”三个字，领取<br>
            免费课程
          </div>
        </div>
        <div class="x-cellgroup">
          <CellGroup>
            <Cell class="x-cell" title="工作日" extra="周一 - 周五 9:00 - 18:00">
              <Icon type="ios-cafe" slot="icon" />
            </Cell>
            <Cell class="x-cell" title="客服QQ" extra="1993239039">
              <Icon type="ios-call" slot="icon" />
            </Cell>
          </CellGroup>
        </div>
      </div>
      <div class="x-copyright">
        最终解释权归“英语日记”
      </div>
    </div>
  </div>
</template>
<script>
import { Button, Icon, CellGroup, Cell } from 'iview'
import { Popup } from 'vux'
import appHeader from '@/components/appConfig/appHeader.vue'
import qrcode from '@/common/images/small-icon/qrcode.jpg'
export default {
  name: 'appAbout',
  data () {
    return {
      showBack: false,
      data: {
        headerInfo: this.$route.meta,
        qrcode: qrcode
      }
    }
  },
  created () {
    this.data.fromUrl = this.$route.query.fromUrl || '/appMember'
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: this.data.fromUrl,
        query: {
          type: '3'
        }
      })
    }
  },
  components: {
    Button, Icon, Popup, appHeader, CellGroup, Cell
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appAbout.styl"
</style>
