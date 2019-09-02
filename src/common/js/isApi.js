// Created by macmzon@163.com
// 公共方法库

import router from '../../router'
let Base64 = require('js-base64').Base64

// 项目外页面跳转方法
export function goURL (url) {
  let app = window.navigator.appVersion.toLocaleLowerCase()
  try {
    if (app.indexOf('windows phone') > 0) {
      window.external.notify(url)
    } else if (app.indexOf('iphone') > 0) {
      window.location.href = url
    } else if (app.indexOf('android') > 0) {
      window.MyWebView.onJsOverrideUrlLoading(url)
    } else {
      window.location.href = url
    }
  } catch (e) {
    window.location.href = url
  }
}
// 项目内页面跳转方法：push
export function goPush (param) {
  router.push(param)
}
// 项目内页面返回方法：back
export function goBack (param) {
  router.push(param)
}
// 项目内页面跳转方法：replace
export function goReplace (param) {
  router.push(param)
}

// 数字四舍五入格式化2位小数+单位（元）
export function formatNum (num, str, dot) {
  str = str || ''
  dot = dot || 2
  if (num !== null && num !== '' && !isNaN(num)) {
    return parseFloat(num).toFixed(dot) + str
  } else {
    return (0).toFixed(dot) + str
  }
}

// 百分数舍掉多余小数格式化2位小数+单位（%）
export function formatNumDel (num, str, dot) {
  str = str || ''
  dot = dot || 2
  if (num !== null && num !== '' && !isNaN(num)) {
    return (parseInt(parseFloat(num) * Math.pow(10, dot)) * Math.pow(0.1, dot)).toFixed(dot) + str
  } else {
    return (0).toFixed(dot) + str
  }
}

// 数字千分位格式化，dot小数位
export function numToThousands (num, str, dot) {
  str = str || ''
  dot = dot || 2
  if (num !== null && num !== '' && !isNaN(num)) {
    return parseFloat(num).toFixed(dot).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + str
  } else {
    return (0).toFixed(dot).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + str
  }
}

// 8位日期格式化+单位符
export function formatDate (date, str) {
  if (date && date.length === 8) {
    if (str) {
      return date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1' + str + '$2' + str + '$3')
    } else {
      return date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1年$2月$3日')
    }
  } else {
    return date
  }
}
// 正则处理日期字符串日期单数前面补齐0
export function formatDateZero (date) {
  // date = '2016-6-25'
  return date.replace(/-(\d)(?!\d)/g, '-0$1')
}

// 获取日期并格式化8位
export function getNowDate (date, str) {
  date = date || new Date()
  date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  date = date.replace(/-(\d)(?!\d)/g, '-0$1')
  if (str) {
    return date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1' + str + '$2' + str + '$3')
  } else {
    return date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1年$2月$3日')
  }
}

// 获取时分秒并格式化6位
export function getHours (date, str) {
  date = date || new Date()
  str = str || ':'
  date = date.getHours() + str + date.getMinutes() + str + date.getSeconds()
  date = date.replace(/-(\d)(?!\d)/g, str + '0$1')
  return date
}

// url参数转对象 + 获取某个参数值(注：第一个字符非?)
export function urlToObject (url, item) {
  let reg = /([^=&\s]+)[=\s]*([^&\s]*)/g
  let obj = {}
  while (reg.exec(url)) {
    obj[RegExp.$1] = RegExp.$2
  }
  return item ? obj[item] : obj
}

// 对象转url参数
export function objectToUrl (obj) {
  let url = ''
  for (let i in obj) {
    url += '&' + i + '=' + obj[i]
  }
  return url ? url.slice(1) : ''
}

// 获取用户登录信息
export function getLocalItem (item) {
  let user = localStorage.getItem('userLogin')
  let obj = JSON.parse(localStorage.getItem(user)) || {}
  return (obj[item] || '')
}

// 设置用户登录信息
export function setLocalItem (item, val) {
  let user = localStorage.getItem('userLogin')
  let obj = JSON.parse(localStorage.getItem(user)) || {}
  obj[item] = val
  localStorage.setItem(user, JSON.stringify(obj))
}

// 登录退出登录 userLogin: 0未登录，1已登录
export function userLogout () {
  localStorage.setItem('userLogin', '')
}
