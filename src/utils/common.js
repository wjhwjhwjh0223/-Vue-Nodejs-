// 项目的一些公共方法

// 导出一个服务器地址，供项目的各个地方使用
// export const BASE_URL = "http://127.0.0.1:3001"
// export const BASE_URL = "http://1.15.179.44:3001"
export const BASE_URL = process.env.VUE_APP_API_URL

/**
 * 接收一个对象，删除属性值为null、空字符串的属性（只考虑第一层）
 * @param {*} obj 
 */
export function clearObject (obj) { 
  for (let key in obj) { 
    if (obj[key] === '' || obj[key] === null) { 
      delete obj[key]
    }
  }
}