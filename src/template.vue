<!-- Created by macmzon@163.com-->
<!--vue页面初始化模板-->
<template>
  <div class="appMenu">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <Button type="primary" round @click.active="back()">上一页</Button>
      <Button type="success" round @click.active="start()">下一页</Button>
    </div>
  </div>
</template>

<script>
import { Button } from 'iview'
import { Popup } from 'vux'
import appHeader from '@/components/appConfig/appHeader.vue'
export default {
  name: 'appMenu',
  data () {
    return {
      showBack: false,
      data: {
        headerInfo: this.$route.meta
      }
    }
  },
  created () {
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.header.rightFuc = this.getMenu             // header右侧菜单按钮事件
    this.$route.meta.touch.leftFuc = this.start                 // 页面向左滑动事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    start () {
      this.$push({
        path: '/appSet',
        query: {
          type: '3'
        }
      }, this)
    },
    back () {
      this.$back({
        path: '/appIndex',
        query: {
          type: '3'
        }
      }, this)
    },
    getMenu () {
      this.$push({
        path: '/appMenu',
        query: {
          type: '3'
        }
      }, this)
    }
  },
  components: {
    appHeader, Button, Popup
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
