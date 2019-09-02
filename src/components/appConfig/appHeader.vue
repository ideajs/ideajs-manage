<!-- Created by macmzon@163.com-->
<template>
  <div class="appHeader">
    <div>
      <!--header左侧按钮left-->
      <div>
        <Icon :type="headerInfo.header.left" size="22" @click="headerInfo.header.leftFuc()" />
      </div>
      <!--header标题title-->
      <div @click="goIndex()">
        <Icon class="p-home" size="20" type="md-home" />
        <span>{{headerInfo.title}}</span>
      </div>
      <!--header右侧按钮right-->
      <div>
        <Icon :type="headerInfo.header.right" size="22" @click="headerInfo.header.rightFuc()" />
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Message } from 'iview'
export default {
  name: 'appHeader',
  props: {
    headerInfo: {}
  },
  data () {
    return {
    }
  },
  created () {
    Message.destroy()
  },
  methods: {
    goIndex () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appIndex',
        query: {
          menuName: 'course'
        }
      })
    }
  },
  components: {
    Icon, Message
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appHeader.styl"
</style>
