import {
  HTTP
} from "../utils/http.js";

class redevnModel extends HTTP {

  //获取红包记录
  getRedEnv(data) {
    return this.request({
      data: data,
      url: 'RedEnv/getRedEnv',
    })
  }
}

export {
  redevnModel
}