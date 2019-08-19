// Created by macmzon@163.com
// 公共方法库

// let Base64 = require('js-base64').Base64
// this.$post('url', {}, res => { console.log(res) }, err => { console.log(err) })

// 获取消息
export function _getNews (param, func) {
  let news = []
  if (param === 'history') { // 历史消息
    let data = require('@/components/json/news/historyNews.json')
    news = data.news
  } else { // 最新消息
    let data = require('@/components/json/news/newNews.json')
    news = data.news
  }
  func && func(news)
}
// 获取菜单按钮
export function _getMenu (func) {
  let data = require('@/components/json/english/course.json')
  func && func(data)
}
// 获取首页课程
export function _getCourse (func) {
  let data = require('@/components/json/english/course.json')
  func && func(data)
}
