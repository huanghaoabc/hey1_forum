import {HTTP} from "../../utils/http.js"

class productModel extends HTTP{
  classify(){
    return this.request({
      url:"small/product/classify"
    })
  }
  product(params){
    return this.request({
      url:"small/product/getList",
      data:params
    })
  }
  details(id){
    return this.request({
      url: "small/product/details",
      data: {id:id}
    })
  }
  userCenter(){
    return this.request({
      url:'small/product/userCenter'
    })
  }
}
export {
  productModel
}