// Created by macmzon@163.com
// 测试配置
import {DEV_CONFIG} from './isConfig-dev'
// 生产配置
import {PRO_CONFIG} from './isConfig-pro'

export const CONFIG = process.env.NODE_ENV === 'production' ? PRO_CONFIG : DEV_CONFIG
