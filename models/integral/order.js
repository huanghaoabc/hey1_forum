import {HTTP} from "../../utils/http.js"
class orderModel extends HTTP{
  // 订单预览
  preview(id){
    this.request({
      url:""
    })
  }
  // 下单
  placeAnOrder(params){
    return this.request({
      url:'small/order/placeAnOrder',
      data:params,
      method:"POST"
    })
  }
  // 订单列表
  orderList(params)
  {
    return this.request({
      url:"small/order/order",
      data:params
    })
  }
  // 确认收货
  confirm(id)
  {
    return this.request({
      url: "small/order/confirm",
      data: {id:id}
    })
  }
  // 取消订单
  cancel(id) {
    return this.request({
      url: "small/order/cancel",
      data: { id: id }
    })
  }
  // 订单详情
  details(id) {
    return this.request({
      url: "small/order/details",
      data: { id: id }
    })
  }
}
export {
  orderModel
}