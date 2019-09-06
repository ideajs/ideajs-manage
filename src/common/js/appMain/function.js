// Created by macmzon@163.com
// 公共方法库

// let Base64 = require('js-base64').Base64
// this.$post('url', {}, res => { console.log(res) }, err => { console.log(err) })

// 获取消息
export function _getNews (param, func) {
  let news = []
  func && func(news)
}
// 获取菜单按钮
export function _getMenu (func) {
  let data = {}
  func && func(data)
}