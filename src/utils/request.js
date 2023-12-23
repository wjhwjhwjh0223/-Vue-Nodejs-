// 我把axios配置好之后，然后给项目中的组件使用
import axios from 'axios'
import Vue from 'vue'
import { Message } from 'element-ui'
// router是一个文件夹： 然后es6模块会去改文件夹下面找：index.js
import router from '@/router'
import { BASE_URL } from './common'
  

// 1. 配置服务器前缀
// axios.defaults.baseURL = 'http://1.15.179.44:3001'
axios.defaults.baseURL = BASE_URL

// 2. 有一个统一的地方设置token（每次发起请求的时候，都经过这个地方，就给请求头加上token）

// 请求拦截器（以后axios每发起一次请求，都要通过这里）
// axios.interceptors.request.use(config => { 
//   // config就是请求头的相关信息， url， 参数
//   // console.log(config)
//   // 从本地取出token，设置给config， config带给后端服务器
//   const token = localStorage.getItem('token')
//   // 设置token
//   config.headers.authorization = token
//   // 放行
//   return config
// })

// 响应拦截器
// axios.interceptors.response.use(res => {
//   // res: 服务器响应结果
//   // console.log('响应拦截的结果', res)
//   // 如果res.data下有code属性，且 res.data.code 不为 0 ， 我们就应该弹框提示
//   // 判断一个对象有没有某一个属性 hasOwnProperty
//   if ( res.data.hasOwnProperty('code') &&  res.data.code !== 0) { 
//     // Vue.prototype.$message.error(res.data.msg)
//     Message.error(res.data.msg)
//   }
//   return res
// }, err => { 
//   console.log('后端出错了！！')
//   // 拿到状态码，如果状态码是401，表示token出问题（有可能本地的token被篡改了，也有可能token过期了）， 回到登录页面，重新登录呀
//   if ( err.response && err.response.data.code === 401) { 
//     // 跳转到登录页面： this.$router.push('/login')
//     router.push('/login')
//   }
//   // return '网络出错！！！'
//   return Promise.reject('网络出错！！！')
// })

// 导出
export default axios