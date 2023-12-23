import axios from "@/utils/request";

///shop/info

export const shopInfoReq = () => axios.get('/shop/info')

// 编辑店铺/shop/edit
export const shopEditReq = (data) => axios.post('/shop/edit', data)