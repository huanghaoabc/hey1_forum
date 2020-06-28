import {
  HTTP
} from "../utils/http.js";

class articlesModel extends HTTP {
  //获取帖子列表
  getList(data) {
    return this.request({
      data: data,
      url: 'articles/Articles/index',
    })
  }

  //帖子点赞/取消点赞
  getGood(data) {
    return this.request({
      data: data,
      url: 'articles/Articles/getGood',
    })
  }

  //帖子收藏/取消收藏
  storeArt(data) {
    return this.request({
      data: data,
      url: 'articles/Articles/storeArt',
    })
  }

  //获取帖子详情
  getDes(data){
    return this.request({
      data: data,
      url: 'articles/Articles/getDes',
    })
  }

  //发帖
  subData(data){
    return this.request({
      method:'POST',
      data: data,
      url: 'articles/Articles/subData',
    })
  }

  //获取用户发帖
  userArt(data){
    return this.request({
      data: data,
      url: 'articles/Articles/userArt',
    })
  }

  //审核
  shangjia(data){
    return this.request({
      data: data,
      url: 'articles/Articles/shangjia',
    })
  }
  //获取用户收藏
  myColl(data){
    return this.request({
      data: data,
      url: 'articles/Articles/myColl',
    })
  }

  //根据圈子/话题id获取帖子
  getArtByTopicOrCir(data){
    return this.request({
      data: data,
      url: 'articles/Articles/getArtByTopicOrCir',
    })
  }

  //随机获取6篇文章
  randomArt(){
    return this.request({
      url: 'articles/Articles/randomArt',
    })
  }

  //获取用户关注的好友动态文章
  friendArt(data){
    return this.request({
      data: data,
      url: 'articles/Articles/friendArt',
    })
  }

  //删除帖子
  delArt(data){
    return this.request({
      data: data,
      url: 'articles/Articles/delAet',
    })
  }
  //清除历史记录
  deleteLishi(data){
    return this.request({
      data:data,
      url:'articles/Articles/deleteLishi'
    })
  }

  //红包帖支付
  payRed(data){
    return this.request({
      method: 'POST',
      data: data,
      url: 'articles/Articles/payOrder',
    })
  }
}

export {
  articlesModel
}