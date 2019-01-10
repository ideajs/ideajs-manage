<!-- Created by macmzon@163.com-->
<template>
  <div class="appStart">
    <div>
      <Button type="primary" shape="circle" :loading="data.loading" @click="start">
        <span v-if="!data.loading">开始</span>
      </Button>
    </div>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'
  import { Button } from 'iview'
export default {
  name: 'appStart',
  data () {
    return {
      show: false,
      data: {
        loading: false
      }
    }
  },
  mounted () {
//    this.$route.meta.touch.leftFuc = this.start // 页面向左滑动事件
//    this.$route.meta.touch.rightFuc = this.back // 页面向右滑动事件
  },
  methods: {
    start () {
//      this.$post('welcome', {name: 'welcome'}, (res) => {
//        console.log(res)
//      })
      this.data.loading = true
      this.$route.meta.isBack = false
      this.$push({
        path: '/appLogin',
        query: {
          type: '3'
        }
      })
    }
  },
  components: {
    Group, Cell, Button
  }
}
</script>
<style lang="stylus">
  @import "appStylus/appStart.styl"
</style>
