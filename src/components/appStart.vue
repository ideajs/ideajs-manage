<!-- Created by macmzon@163.com-->
<template>
  <div class="appStart">
    <div>
      <div class="appName">日 记 本</div>
      <img :src='data.startPage001' />
      <div class="appTips">
        朝着你心中的方向，
        把握每一分每一秒，<br>
        生活便不会辜负你
      </div>
      <div class="datetime">
        <div>
          <div class="dateweek">
            {{data.date.week}}
          </div>
          <div class="dateyear">
            <div>
              {{data.date.year}}
            </div>
            <div>
              {{data.date.date}} / {{data.date.month}}
            </div>
          </div>
        </div>
      </div>
      <Button type="primary" shape="circle" :loading="data.loading" @click="start">
        <span v-if="!data.loading">开始</span>
      </Button>
    </div>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'
  import { Button } from 'iview'
	import startPage001 from '../common/images/startPage/startPage001.png'
export default {
  name: 'appStart',
  data () {
    return {
      show: false,
      data: {
        loading: false,
        date: {
          year: '',
          month: '',
          date: '',
          week: ''
        },
				startPage001: startPage001
      }
    }
  },
  mounted () {
      this.getDate()
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
    },
    getDate () {
      let week = ['日', '一', '二', '三', '四', '五', '六']
      this.data.date.year = new Date().getFullYear()
      this.data.date.month = new Date().getMonth() + 1
      this.data.date.date = new Date().getDate()
      this.data.date.week = '星期' + week[new Date().getDay()]
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
