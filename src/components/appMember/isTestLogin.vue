<!-- Created by macmzon@163.com-->
<template>
  <div class="isLogin">
    <div v-if="!data.login" class="main">
      <div class="form">
        <div class="title">登 录</div>
        <div class="name">
          <span>用户名：</span>
          <input type="text" v-model.trim="data.name" placeholder="请输入用户名" />
        </div>
        <div class="password">
          <span>密&nbsp;&nbsp;&nbsp;码：</span>
          <input type="password" v-model.trim="data.password" placeholder="请输入密码" />
        </div>
      </div>
      <div class="error" v-if="data.error">{{data.error}}</div>
      <div class="button" @click="login()">确 定</div>
    </div>
    <div class="success" v-if="data.login && data.success === 1">登录成功</div>
    <div class="fail" v-if="data.login && data.success === 2">登录失败</div>
    <div v-if="data.login" class="button loadbtn" @click="reload()">确 定</div>
  </div>
</template>

<script>

export default {
  name: 'isLogin',
  data () {
    return {
      data: {
        login: false,
        success: 0,
        name: '',
        password: '',
        error: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    reload () {
      location.reload()
    },
    login () {
      if (!this.data.name.replace(/\s/g, '')) {
        this.data.error = '请输入用户名'
        setTimeout(() => {
          this.data.error = ''
        }, 1000)
        return
      }
      if (!this.data.password.replace(/\s/g, '')) {
        this.data.error = '请输入密码'
        setTimeout(() => {
          this.data.error = ''
        }, 1000)
        return
      }
      this.data.login = true
      this.$http.get('/api/getValue', {
          params: {
            username: this.data.name,
            password: this.data.password,
          }
        }).then((res) => {
        console.log(res)
        let data = res.data
        if (data.length > 0) {
          data = data[0]
          if (data.username === this.data.name && data.password === this.data.password) {
            this.data.success = 1
            console.log('登录成功')
          } else {
            this.data.success = 2
            console.log('登录失败1')
          }
        } else {
          this.data.success = 2
          console.log('登录失败2')
        }
      }, (err) => {
        this.data.success = 2
        console.log('登录失败3', err)
      })
    }
  },
  components: {
  }
}
</script>

<style lang="stylus">
.isLogin
  position: relative
  background: #fff
  height: 100vh
  .title
    padding: 30px 15px 60px
    text-align: center
    font-size: 20px
    color: #333
  .name,
  .password
    margin: 10px 8%
    border-bottom: 1px solid #f3f3f3
    span
      display: inline-block
      width: 60px
      color: #333
      text-align: right
      height: 40px
      line-height: 40px
    input
      display: inline-block
      width: calc(100% - 65px)
      color: #666
      height: 40px
      line-height: 40px
  .button
    position: absolute
    bottom: 20px
    left: 32%
    width: 36%
    height: 36px
    line-height: 36px
    color: #f3f3f3
    background: #1A72E6
    border-radius: 8px
    text-align: center
  .loadbtn
    background: red
  .success,
  .fail
    font-size: 30px
    text-align: center
    color: red
    padding: 150px 15px 0
  .error
    font-size: 12px
    color: red
    margin: 30px 8%
    text-align: center
    background: #FCBCBC
    height: 25px
    line-height: 25px
    border-radius: 5px

</style>
