<!-- Created by macmzon@163.com-->
<template>
  <div class="appHeader">
    <div>
      <!--header左侧按钮left-->
      <div>
        <Icon :type="headerInfo.header.left" size="24" @click="headerInfo.header.leftFuc()" />
      </div>
      <!--header标题title-->
      <div><span>{{headerInfo.title}}</span></div>
      <!--header右侧按钮right-->
      <div>
        <Icon :type="headerInfo.header.right" size="24" @click="headerInfo.header.rightFuc()" />
      </div>
    </div>
  </div>
</template>

<script>
  import { Icon } from 'iview'
  export default {
    name: 'appHeader',
    props: {
      headerInfo: {}
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
      start () {
        console.log('start')
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appHeader.styl"
</style>
