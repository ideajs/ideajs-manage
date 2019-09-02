<!-- Created by macmzon@163.com-->
<template>
  <div class="appMoney">
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
            <Button class="p-recharge" type="error" @click="recharge()">
              充值
            </Button>
          </div>
        </div>
        <Row>
          <Col span="12">
            <div class="active-money">
              <div>
                {{data.money.balance || '0.00'}}
              </div>
              <div>
                <Icon type="logo-yen" />余额
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
          <TabPane label="充值记录" icon="ios-ribbon">
            <div class="money">
              <div class="p-list" v-for="(item, idex) in data.money.list" :key="idex">
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
                  备注：{{item.info}}
                </div>
              </div>
              <div v-if="!data.money.list || data.money.list.length === 0" class="x-unData">
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
  name: 'appMoney',
  data () {
    return {
      showBack: false,
      data: {
        showModel: false,
        user: {},
        userLogin: '',
        headerInfo: this.$route.meta,
        courseLen: 0,
        money: {
          total: '297.00',
          balance: '0.00',
          list: [
            {
              date: '2019-4-3 12:21',
              money: '99.00',
              info: '购买小学英语课程'
            },
            {
              date: '2019-5-3 13:15',
              money: '99.00',
              info: '购买高中英语课程'
            },
            {
              date: '2019-6-3 14:08',
              money: '99.00',
              info: '购买大学英语课程'
            }
          ]
        }
      }
    }
  },
  created () {
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      this.data.money = this.data.user.money
      this.data.courseLen = Object.keys(this.data.user.course).length
    }
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.header.rightFuc = this.recharge            // header右侧返回按钮事件
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
    recharge () {
      Modal.warning({
        title: '信息提示',
        content: '在线充值功能暂未开放，详情请联系在线客服！',
        okText: '确定',
        onOk: () => {
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
  @import "stylus/appMoney.styl"
</style>
