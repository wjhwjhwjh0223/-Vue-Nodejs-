import axios from '@/utils/request'


/**
 * 获取账号和列表
 */

// export const usersListReq = (params) => {
//   return axios.get('/users/list', {
//     params
//   })
// }

/**
 * 查询用户列表
 * @param {*} currentPage 当前页
 * @param {*} pageSize 每页多少条
 * @returns Promise（账号列表数组）
 */
export const usersListReq = (currentPage, pageSize) => { 
  return axios.get('/users/list', {
    params: {
      currentPage,
      pageSize
    }
  })
}

// 请求用户个人信息的api函数
export const usersInfoReq = () => { 
  // get会返回一个promise，
  return axios.get('/users/info')
}



/**
 * 功能： 添加账号
 * @param {*} data 对象 
 * @returns Promise
 */
export const usersAddReq = (data) => axios.post('/users/add', data)

export const usersDelReq = (id) => axios.get('/users/del', {
  params: {id}
})

// /users/batchdel
export const usersBatchdelReq = (ids) => axios.get('/users/batchdel', {
  params: {
    ids: ids,
  }
})

// /users/edit
export const usersEditReq = (data) => axios.post('/users/edit', data)

// /users/checkoldpwd
export const checkoldpwdReq = (oldPwd) => axios.get('/users/checkoldpwd', {
  params: { oldPwd }
})

// /users/avataredit

export const avatareditReq = (imgUrl) => axios.get('/users/avataredit', {
  params: {imgUrl}
})

