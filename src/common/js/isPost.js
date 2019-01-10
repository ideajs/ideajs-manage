/*Created by macmzon@163.com*/
import {IS_URL} from '../../common/js/isUrl'
import {IS_PARAM} from '../../common/js/isParam'
import Vue from 'vue'
// import md5 from 'js-md5'
let Base64 = require('js-base64').Base64

// console.log(md5('123')) // md5加密
// console.log(Base64.encode('123')) // base64加密
// console.log(Base64.decode('MTIz')) // base64解密
/*
 url,        服务地址
 param,      服务入参
 http,       服务配置
 success,    成功函数
 fail,       失败函数
 load,       是否禁用loading动画：是true,否false
 error       报错提示
*/
// 封装vue-resource 的post请求
export function HTTP_POST (url, param, success, fail, load, error, http) {
  if (!load) { // 是否禁用loading动画：是true,否false
    // var loading = Loading.service({background: 'rgba(0,0,0,0.6)'}) // 开启loading动画
  }
  url = url === '' ? IS_URL.XML : url
  let _param = IS_PARAM().param
  let _http = IS_PARAM().http
  param = Base64.encode(JSON.stringify(Object.assign(param, _param)))
  Vue.http.options = Object.assign(Vue.http.options, _http, http)
  Vue.http.post(url, {param: param}).then((res) => {
    // loading.close()
    success && success(res)
  }, (res) => {
    // loading.close()
    // Message.closeAll()
    // Message({type: 'error', message: error || '网络错误，请稍后重试！', duration: 2000})
    fail && fail(res)
  })
}

// 封装vue-resource 的get请求
export function HTTP_GET (url, success, fail, load, error, http) {
  if (!load) { // 是否禁用loading动画：是true,否false
    // var loading = Loading.service({background: 'rgba(0,0,0,0.6)'}) // 开启loading动画
  }
  url = url === '' ? IS_URL.XML : url
  let _http = IS_PARAM().http
  Vue.http.options = Object.assign(Vue.http.options, _http, http)
  Vue.http.get(url).then((res) => {
    // loading.close()
    success && success(res)
  }, (res) => {
    // loading.close()
    // Message.closeAll()
    // Message({type: 'error', message: error || '网络错误，请稍后重试！', duration: 2000})
    fail && fail(res)
  })
}
