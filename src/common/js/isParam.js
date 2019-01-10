/*Created by macmzon@163.com*/

// 测试环境配置参数
export function PARAM_TEST () {
  let userLogin = localStorage.getItem('userLogin')
  let userLocalInfo = localStorage.getItem('userLocalInfo')
  let obj = {
    param: { // 接口默认必传参数
      project: 'ideajs-html', // 项目名称
      version: 'v1_101', // 项目版本号
      date: '2018-11-23', // 项目版本日期
      userLogin: userLogin, // 用户登录信息
      userLocalInfo: userLocalInfo // 用户缓存信息
    },
    http: { // http请求参数设置
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'appid': 'FI03-0861',
        'apptoken': '$2a$21$zW6nZAMh6dZd9xh13xVea6CcqehvW.Xv/GFKWo9kHT0QiRv./Qhye'
      },
      emulateJSON: true // 开启跨域
    }
  }
  return obj
}

// 生产环境配置参数
export function PARAM_PRODUCT () {
  let userLogin = localStorage.getItem('userLogin')
  let userLocalInfo = localStorage.getItem('userLocalInfo')
  let obj = {
    param: { // 接口默认必传参数
      project: 'ideajs-html', // 项目名称
      version: 'v1_101', // 项目版本号
      date: '2018-11-23', // 项目版本日期
      userLogin: userLogin, // 用户登录信息
      userLocalInfo: userLocalInfo // 用户缓存信息
    },
    http: { // http请求参数设置
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'appid': 'FI03-0861',
        'apptoken': '$2a$21$zW6nZAMh6dZd9xh13xVea6CcqehvW.Xv/GFKWo9kHT0QiRv./Qhye'
      },
      emulateJSON: true // 开启跨域
    }
  }
  return obj
}

// 测试环境打包专用
export const IS_PARAM = PARAM_TEST

// 生产环境打包专用
// export const IS_PARAM = PARAM_PRODUCT
