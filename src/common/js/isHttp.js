// Created by macmzon@163.com
import {CONFIG} from './isConfig'
import {showLoading, hideLoading, showToast} from './isModel'
import Vue from 'vue'
// import md5 from 'js-md5'
let Base64 = require('js-base64').Base64

// console.log(md5('123')) // md5加密
// console.log(Base64.encode('123')) // base64加密
// console.log(Base64.decode('MTIz')) // base64解密
/*
 url,        服务地址
 param,      服务入参
 success,    成功函数
 fail,       失败函数
 http,       headers配置
*/
/*
vue-resource语法-使用$http对象

// 基于全局Vue对象使用http
Vue.http.get('/someUrl',[options]).then(successCallback, errorCallback);
Vue.http.post('/someUrl',[body],[options]).then(successCallback, errorCallback);
// 在一个Vue实例内使用$http
this.$http.get('/someUrl',[options]).then(sucessCallback, errorCallback);
this.$http.post('/someUrl',[body],[options]).then(successCallback, errorCallback);
 */
// 封装vue-resource 的post请求
export function HTTP_POST (url, param, success, fail, headers) {
  url = url || CONFIG.URL.XML
  let _headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'appid': CONFIG.PARAMS.appid,
    'apptoken': CONFIG.PARAMS.apptoken
  }
  _headers = headers ? Object.assign(_headers, headers) : _headers
  let options = { // http请求参数设置
    headers: _headers,
    emulateJSON: true // 开启跨域
  }
  param = Base64.encode(JSON.stringify(param))
  if (_headers['Content-Type'] === 'application/json;charset=UTF-8') {
    param = JSON.stringify({param: param})
  } else {
    param = {param: param}
  }
  showLoading()
  Vue.http.post(url, param, options).then((res) => {
    hideLoading()
    success && success(res)
  }, (err) => {
    hideLoading()
    showToast({text: err.error || '网络错误，请稍后重试'})
    fail && fail(err)
  })
}

// 封装vue-resource 的get请求
export function HTTP_GET (url, success, fail, headers) {
  url = url || CONFIG.URL.XML
  let _headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'appid': CONFIG.PARAMS.appid,
    'apptoken': CONFIG.PARAMS.apptoken
  }
  _headers = headers ? Object.assign(_headers, headers) : _headers
  let options = { // http请求参数设置
    headers: _headers,
    emulateJSON: true // 开启跨域
  }
  showLoading()
  Vue.http.get(url, options).then((res) => {
    hideLoading()
    success && success(res)
  }, (err) => {
    hideLoading()
    showToast({text: err.error || '网络错误，请稍后重试'})
    fail && fail(err)
  })
}
