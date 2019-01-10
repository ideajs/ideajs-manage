<!-- Created by macmzon@163.com-->
<template>
  <div class="appIndex">
    <div v-transfer-dom>
      <popup v-model="show"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="">
      <Button type="primary" round @click.active="back()">上一页</Button>
      <Button type="success" round @click.active="start()">下一页</Button>
    </div>
  </div>
</template>
<script>
  import { Button } from 'iview'
  import { Popup } from 'vux'
  import appHeader from'@/components/appConfig/appHeader.vue'
  export default {
    name: 'appIndex',
    data () {
      return {
        show: false,
        data: {
          headerInfo: this.$route.meta
        }
      }
    },
    mounted () {
      /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
      this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
      this.$route.meta.header.rightFuc = this.getMember             // header右侧菜单按钮事件
      this.$route.meta.touch.leftFuc = this.start                 // 页面向左滑动事件
      this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
    },
    methods: {
      start () {
        this.$route.meta.isBack = false
        this.$push({
          path: '/appMenu',
          query: {
            type: '3'
          }
        })
      },
      back () {
        this.$route.meta.isBack = true
        this.$back({
          path: '/appLogin',
          query: {
            type: '3'
          }
        })
      },
      getMember () {
        this.$route.meta.isBack = false
        this.$push({
          path: '/appMember',
          query: {
            type: '3'
          }
        })
      }
    },
    components: {
      appHeader, Button, Popup
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appIndex.styl"
</style>
