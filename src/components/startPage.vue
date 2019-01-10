<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      msg: 'Welcome'
    }
  },
  mounted () {
    this.getMsg()
  },
  methods: {
    getMsg () {
      this.$post('', {name: 'ideajs-html/welcome'}, {}, (res) => {
        console.log(res)
      })
    }
  },
  components: {
    Loading
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .hello
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    margin-top: 60px

</style>
