<!-- Created by macmzon@163.com-->
<template>
  <div class="appNews">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="loopImg">
        <Carousel :autoplay-speed="4000" autoplay v-model="data.loopVal" loop>
          <CarouselItem v-for="item in data.loopImg" :key="item.link" >
            <img class="carousel" @click="goImgLink(item)" :src="item.img" />
          </CarouselItem>
        </Carousel>
      </div>
      <div class="tabBtns">
        <Tabs @on-click="getNews">
          <TabPane name="new" label="最新消息" icon="ios-book">
            <div class="new">
              <div @click="goArticle(item)" v-for="item in data.newNews" :key="item.id" class="course-list">
                <Row type="flex" align="middle">
                  <Col span="6">
                    <Icon type="md-clock" />
                    <span class="p-date">
                      {{item.date | filtersDate}}
                    </span>
                  </Col>
                  <Col class="newMsg-title" span="16">
                    <span>
                      {{item.title}}
                    </span>
                  </Col>
                  <Col span="2">
                    <Icon style="float: right" type="ios-arrow-forward" />
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                    <div class="newMsg-img">
                      <img :src="item.smallImg || data.smallImg" />
                    </div>
                  </Col>
                  <Col span="18">
                    <div class="newMsg-brief">
                      {{item.brief}}
                    </div>
                  </Col>
                </Row>
              </div>
              <div class="x-unData" v-if="data.newNews.length === 0">
                <Icon type="md-walk" />
                <div>暂无数据</div>
              </div>
            </div>
          </TabPane>
          <TabPane name="history" label="历史消息" icon="ios-bookmarks">
            <div class="history">
              <div @click="goArticle(item)" v-for="item in data.historyNews" :key="item.id" class="course-list learn-list">
                <Row type="flex" align="middle">
                  <Col span="6">
                    <Icon type="md-clock" />
                    <span class="p-date">
                      {{item.date | filtersDate}}
                    </span>
                  </Col>
                  <Col class="newMsg-title" span="16">
                    <span>
                      {{item.title}}
                    </span>
                  </Col>
                  <Col span="2">
                    <Icon style="float: right" type="ios-arrow-forward" />
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                    <div class="newMsg-img">
                      <img :src="item.smallImg || data.smallImg" />
                    </div>
                  </Col>
                  <Col span="18">
                    <div class="newMsg-brief">
                      {{item.brief}}
                    </div>
                  </Col>
                </Row>
              </div>
              <div class="x-unData" v-if="data.historyNews.length === 0">
                <Icon type="md-walk" />
                <div>暂无数据</div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { Row, Col, Button, Drawer, Carousel, CarouselItem, Tabs, TabPane, Icon } from 'iview'
import { Popup } from 'vux'
import { _getNews } from '@/common/js/appMain/function'
import appHeader from '@/components/appConfig/appHeader.vue'
import loopImg01 from '@/common/images/banner/study01.png'
import loopImg03 from '@/common/images/banner/english01.png'
import smallImg from '@/common/images/banner/study01.png'
export default {
  name: 'appNews',
  data () {
    return {
      showBack: false,
      showMenu: false,
      data: {
        user: {},
        id: '',
        userLogin: '',
        headerInfo: this.$route.meta,
        loopVal: 0,
        news: [],
        newNews: [],
        historyNews: [],
        smallImg: smallImg,
        loopHeight: '20vh',
        loopImg: [
          {
            img: loopImg01,
            link: '1'
          },
          {
            img: loopImg03,
            link: '3'
          }
        ]
      }
    }
  },
  created () {
    this.getNews()
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appMember',
        query: {
          type: '3'
        }
      })
    },
    getNews (item) {
      _getNews(item, (res) => {
        if (item === 'history') {    // 历史消息
          this.data.historyNews = res
        } else {                    // 最新消息
          this.data.newNews = res
        }
      })
    },
    goArticle (data) {
      if (data.link) {
        this.$route.meta.isBack = false
        this.$push({
          path: data.link,
          query: {
            fromUrl: '/appNews?type=3'
          }
        })
      } else {
        this.$route.meta.isBack = false
        this.$push({
          path: '/appArticle',
          query: {
            title: data.title,
            type: data.type,
            id: data.id
          }
        })
      }
    },
    goImgLink (data) {
    }
  },
  filters: {
    filtersDate: (date) => {
      if (date) {
        date = date.split(' ')[0]
      } else {
        date = '--'
      }
      return date
    }
  },
  components: {
    appHeader, Row, Col, Button, Popup, Drawer, Carousel, CarouselItem, Tabs, TabPane, Icon
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appNews.styl"
</style>
