<template xmlns:v-touch="http://www.w3.org/1999/xhtml">
  <div class="app">
    <!--
    <transition :name="direction" keep-alive>
      <router-view v-if="!$route.meta.isReload"></router-view>
    </transition>
-->
    <v-touch ref="touch" v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight">
      <transition :name="direction" keep-alive>
        <router-view v-if="!$route.meta.isReload"></router-view>
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
  mounted () {
  },
  methods: {
    onSwipeLeft () { // 页面左滑-下一页
      this.$route.meta.touch.leftFuc && this.$route.meta.touch.leftFuc()
    },
    onSwipeRight () { // 页面右滑-上一页
      this.$route.meta.touch.rightFuc && this.$route.meta.touch.rightFuc()
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/reset.styl"
  @import "components/appStylus/App.styl"
</style>
