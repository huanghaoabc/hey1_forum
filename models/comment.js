import {
  HTTP
} from "../utils/http.js";

class commentModel extends HTTP {
  //发表评论
  putComment(data) {
    return this.request({
      method: 'POST',
      data: data,
      url: 'articles/comment/putComment',
    })
  }

  //获取评论列表
  getComment(data){
    return this.request({
      data: data,
      url: 'articles/comment/getComment',
    })
  }

  //评论点赞
  goods(data){
    return this.request({
      data: data,
      url: 'articles/comment/goods',
    })
  }

  //获取当前用户评论列表
  myComments(data){
    return this.request({
      data: data,
      url: 'articles/Articles/myComments',
    })
  }

  //获取评论详情
  getCommDes(data){
    return this.request({
      data: data,
      url: 'articles/comment/getCommDes',
    })
  }

  //获取子评论
  getSonComment(data){
    return this.request({
      data: data,
      url: 'articles/comment/getSonComment',
    })
  }

  //删除评论
  delComm(data){
    return this.request({
      data: data,
      url: 'articles/comment/delComm',
    })
  }
}

export {
  commentModel
}