<!-- Created by macmzon@163.com-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container"></div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { Button } from 'iview'
export default {
  name: 'Welcome',
  data () {
    return {
      show: false,
      data: {

      }
    }
  },
  created () {
  },
  methods: {
    start () {
      this.$post('welcome', {name: 'welcome'}, {}, (res) => {
        console.log(res)
      })
      setTimeout(() => {
        this.$push({
          path: '/login',
          query: {
            type: '3'
          }
        })
      }, 3000)
    }
  },
  components: {
    Group, Cell, Button
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .hello
    background: #fff
</style>
