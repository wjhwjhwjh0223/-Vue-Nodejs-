import axios from "@/utils/request";


// 商品分类列表
export const catelistReq = (currentPage = 1, pageSize = 9999) => axios.get('/goods/catelist', {
  // 一定是一个对象
  // /goods/catelist?currentPage=1&pageSize=9999
  params: {
    currentPage,
    pageSize
  }
})

// 商品添加
export const goodsAddReq = (data) => axios.post('/goods/add', data)

// 商品查询: /goods/list
export const goodsListReq = (params) => axios.get('/goods/list', {
  params
})

// 修改商品： /goods/edit
export const goodsEditReq = (data) => axios.post('/goods/edit', data)


// 商品分类: /goods/catelist
export const goodsCatelistReq = (params) => axios.get('/goods/catelist', {
  params
})

/**
 * 编辑分类: /goods/editcate
 * @param {*} data 对象   {id： ，cateName： state：}
 */
export const goodsEditcateReq = (data) => axios.post('/goods/editcate', data)