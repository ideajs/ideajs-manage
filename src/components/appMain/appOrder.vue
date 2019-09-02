<!-- Created by macmzon@163.com-->
<template>
  <div class="appOrder">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="p-active">
        <div class="active-title">
          <div class="">
            <Icon type="ios-contact" />
            {{data.user.userInfo.user}}
          </div>
        </div>
        <Row>
          <Col span="12">
            <div class="active-money">
              <div>
                {{data.order.length}}
              </div>
              <div>
                <Icon type="md-basket" />订单数
              </div>
            </div>
          </Col>
          <Col span="12" style="text-align:right;">
            <div class="active-jifen">
              <div>
                {{data.user.jifen || '0'}}
              </div>
              <div>
                <Icon type="ios-leaf" />积分
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div class="tabBtns">
        <Tabs>
          <TabPane label="历史订单" icon="ios-ribbon">
            <div class="money">
              <div class="p-list" v-for="(item, idex) in data.order" :key="idex">
                <Row>
                  <Col span="16">
                    <div class="p-user">
                      <Icon type="md-clock" />
                      {{item.date}}
                    </div>
                  </Col>
                  <Col span="8" style="text-align:right;">
                    <div class="p-money">
                      <Icon type="logo-yen" />
                      {{item.money}}
                    </div>
                  </Col>
                </Row>
                <div class="p-info">
                  备注：购买{{item.title}}课程
                </div>
              </div>
              <div v-if="!data.order || data.order.length === 0" class="x-unData">
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
import { Row, Col, Button, Tabs, TabPane, Icon, Modal } from 'iview'
import { Popup } from 'vux'
import appHeader from '@/components/appConfig/appHeader.vue'
export default {
  name: 'appOrder',
  data () {
    return {
      showBack: false,
      data: {
        showModel: false,
        user: {},
        userLogin: '',
        headerInfo: this.$route.meta,
        courseLen: 0,
        order: [                 // 订单
          {
            date: '2019-08-20 18:09',
            brief: '',
            id: 'small_phrase',
            img: '',
            link: '3',
            menu: 'english',
            money: '99',
            page: 'phrase',
            size: '100',
            title: '英语-小学-短语',
            type: 'small'
          },
          {
            date: '2019-08-20 18:09',
            brief: '',
            id: 'small_phrase',
            img: '',
            link: '3',
            menu: 'english',
            money: '99',
            page: 'phrase',
            size: '100',
            title: '英语-小学-短语',
            type: 'small'
          },
          {
            date: '2019-08-20 18:09',
            brief: '',
            id: 'small_phrase',
            img: '',
            link: '3',
            menu: 'english',
            money: '99',
            page: 'phrase',
            size: '100',
            title: '英语-小学-短语',
            type: 'small'
          }
        ]
      }
    }
  },
  created () {
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      this.data.order = this.data.user.order
      this.data.courseLen = Object.keys(this.data.user.course).length
    }
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
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
    }
  },
  filters: {
  },
  components: {
    appHeader, Row, Col, Button, Popup, Tabs, TabPane, Icon, Modal
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appOrder.styl"
</style>
