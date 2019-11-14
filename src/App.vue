<template xmlns:v-touch="http://www.w3.org/1999/xhtml">
  <div ref="appRef" class="app">
    <!--
    <transition :name="direction" keep-alive>
      <router-view v-if="!$route.meta.isReload"></router-view>
    </transition>
-->
    <v-touch ref="touch" v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight">
      <!-- 返回此页面不刷新 -->
      <transition :name="direction">
        <keep-alive>
          <router-view v-if="!$route.meta.isReload && $route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <!-- 返回此页面会刷新 -->
      <transition :name="direction">
        <router-view v-if="!$route.meta.isReload && !$route.meta.keepAlive"></router-view>
      </transition>
    </v-touch>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState({
      direction: state => state.direction
    })
  },
  data () {
    return {
      data: {
      }
    }
  },
  created () {
  },
  mounted () {
    window.scrollApp = this.scrollApp // app上下滚动
  },
  methods: {
    onSwipeLeft () { // 页面左滑-下一页
      this.$route.meta.touch.leftFuc && this.$route.meta.touch.leftFuc()
    },
    onSwipeRight () { // 页面右滑-上一页
      this.$route.meta.touch.rightFuc && this.$route.meta.touch.rightFuc()
    },
    scrollApp (x, y) {
      this.$refs.appRef.scrollTo(x, y)
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'common/css/iview.css'
  @import "common/stylus/reset.styl"
.app
  width: 100%
  height: 100vh
  overflow-y: auto
  background: #fff
  >div
    width: 100%
    touch-action: pan-y!important
    >div
      background: #FCFCFC
      min-height: 100vh
      width: 100%
      >.container
        padding-top: 5.5vh
        margin: 0 auto
  .x-button
      position: fixed
      bottom: 10px
      left: 25%
      font-size: 1.6rem
      color: #fff
      box-shadow: 0 0 5px 0 #dbdbdb
      width: 50%
      padding: 2px 15px 3px 15px
      text-align: center
      border-radius: 5rem
  .slide-out-enter-active,
  .slide-out-leave-active,
  .slide-in-enter-active,
  .slide-in-leave-active
    will-change: transform
    transition: all 300ms
    position: absolute
    height: 100%
    width: 100%
    perspective: 1000
    backface-visibility: hidden
  .slide-out-enter
    opacity: 0
    transform: translate3d(-100%, 0, 0)
  .slide-out-leave-active
    opacity: 0
    transform: translate3d(100%, 0, 0)
  .slide-in-enter
    opacity: 0
    transform: translate3d(100%, 0, 0)
  .slide-in-leave-active
    opacity: 0
    transform: translate3d(-100%, 0, 0)

</style>
