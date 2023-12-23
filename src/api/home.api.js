import axios from "@/utils/request"

// /order/totaldata
export const orderTotaldataReq = () => axios.get('/order/totaldata')