<!-- Created by macmzon@163.com-->
<template>
  <div class="appArticle">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="p-main">
        <div class="p-header">
          <div class="">
            <Row>
              <Col span="12">
                <div class="p-date">
                  {{data.news.date}}
                </div>
              </Col>
              <Col span="12">
                <div class="p-author">
                  <span>作者：{{data.news.author}}</span>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div class="p-article">
          <img class="p-img" :src="data.news.largeImg || data.largeImg" />
          <div class="p-text">
            {{data.news.article}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, Icon, Row, Col } from 'iview'
import { Popup } from 'vux'
import { _getNews } from '@/common/js/appMain/function'
import appHeader from '@/components/appConfig/appHeader.vue'
import qrcode from '@/common/images/small-icon/qrcode.jpg'
import largeImg from '@/common/images/banner/study01.png'
export default {
  name: 'appArticle',
  data () {
    return {
      showBack: false,
      data: {
        headerInfo: this.$route.meta,
        largeImg: largeImg,
        type: '',
        id: '',
        fromUrl: '',
        news: {}
      }
    }
  },
  created () {
    this.data.type = this.$route.query.type
    this.data.id = this.$route.query.id
    this.$route.meta.title = this.$route.query.title
    this.data.fromUrl = this.$route.query.fromUrl || '/appNews'
    this.getNews(this.data.type)
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: this.data.fromUrl,
        query: {
          type: '3'
        }
      })
    },
    getNews (item) {
      _getNews(item, (res) => {
        res.forEach((val, ix) => {
          if (val.id === this.data.id) {
            this.data.news = val
          }
        })
      })
    }
  },
  components: {
    Button, Icon, Popup, appHeader, Row, Col
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appArticle.styl"
</style>
