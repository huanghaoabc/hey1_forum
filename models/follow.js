import {
  HTTP
} from "../utils/http.js";

class followModel extends HTTP {
  
  //用户关注/取消关注
  followed(data) {
    return this.request({
      data: data,
      url: 'Follow/follows',
    })
  }
  
}

export {
  followModel
}