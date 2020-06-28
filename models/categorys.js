import {
  HTTP
} from "../utils/http.js";

class categorysModel extends HTTP {
  //获取精选分类
  index(data) {
    return this.request({
      data: data,
      url: 'articles/Categorys/index',
    })
  }
}

export {
  categorysModel
}