import {
  HTTP
} from "../utils/http.js";

class ciradminModel extends HTTP {
  //置顶/取消
  tops(data) {
    return this.request({
      data: data,
      url: 'articles/Ciradmin/tops',
    })
  }

  //加精/取消
  isEss(data) {
    return this.request({
      data: data,
      url: 'articles/Ciradmin/isEss',
    })
  }

  //删除帖子
  delArt(data){
    return this.request({
      data: data,
      url: 'articles/Ciradmin/delArt',
    })
  }
}

export {
  ciradminModel
}