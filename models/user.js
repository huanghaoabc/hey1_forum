import {
  HTTP
} from "../utils/http.js";

class userModel extends HTTP {

  //用户个人中心信息
  getUserMsg(data) {
    return this.request({
      data: data,
      url: 'User/getUserMsg',
    })
  }

  //用户关注
  follows(data){
    return this.request({
      data: data,
      url: 'User/follows',
    })
  }

  //获取用户信息
  getData(){
    return this.request({
      url: 'User/editUserMsg',
    })
  }

  //保存用户信息
  saveData(data){
    return this.request({
      method: 'POST',
      data: data,
      url: 'User/editUserMsg',
    })
  }

  //举报用户
  report(data){
    return this.request({
      method: 'POST',
      data: data,
      url: 'User/report',
    })
  }

  //用户反馈
  feedback(data){
    return this.request({
      method: 'POST',
      data: data,
      url: 'User/feedback',
    })
  }

  //获取系统消息数量
  noticeCount(data){
    return this.request({
      data: data,
      url: 'Common/noticeCount',
    })
  }
}

export {
  userModel
}