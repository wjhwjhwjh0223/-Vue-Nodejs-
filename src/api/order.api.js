import axios from '@/utils/request'



export const orderListReq = params => axios.get('/order/list', {
  params
})

// /order/edit

export const orderEditReq = (data) => axios.post('/order/edit', data)

// /order/ordertotal
export const ordertotalReq = (date) => axios.get('/order/ordertotal', {
  params: {
    date
  }
})