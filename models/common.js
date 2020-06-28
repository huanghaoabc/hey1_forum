import {
  HTTP
} from "../utils/http.js";

class commonModel extends HTTP {
  //用户登陆
  login(data){
    return this.request({
      data: data,
      url: 'User/wxLogin',
    })
  }

  //获取小程序码
  getIcode(data){
    return this.request({
      data: data,
      url: 'Common/getIcode',
    })
  }

  //获取轮播图
  getImageNav(data){
    return this.request({
      data: data,
      url: 'Common/getImageNav',
    })
  }

  //获取系统消息列表
  getNoticeList(data){
    return this.request({
      data: data,
      url: 'Common/getNoticeList',
    })
  }

  //搜索关键字
  search(data){
    return this.request({
      data: data,
      url: 'Common/search',
    })
  }
  
  //获取热搜关键字
  hostKey(){
    return this.request({
      url: 'Common/hostKey',
    })
  }
  // 获取富文本内容
  explain(id) {
    return this.request({
      url: 'common/explain',
      data:{id:id}
    })
  }

  //获取公司配置
  getCopay(data){
    return this.request({
      data: data,
      url: 'Common/getCopay',
    })
  }

  //获取视频文件大小限制
  videoLim(data){
    return this.request({
      data: data,
      url: 'Common/videoLim',
    })
  }

  //存储formId
  saveFormId(data){
    return this.request({
      data: data,
      url: 'Common/saveFormId',
    })
  }

  //获取用户余额
  getUserMoney(data){
    return this.request({
      data: data,
      url: 'User/userMoney',
    })
  }

  //用户账单
  getUserOrder(data) {
    return this.request({
      data: data,
      url: 'User/userOrder',
    })
  }

  //提现配置
  getWidhSet(data){
    return this.request({
      data: data,
      url: 'Common/widthSetting',
    })
  }

  //提现
  postWith(data){
    return this.request({
      data: data,
      url: 'User/postWith',
    })
  }

  //营销功能配置
  getMarkCheck(){
    return this.request({
      url: 'Common/getMarkCheck',
    })
  }

  //获取用户访问权限
  userAuth(){
    return this.request({
      url: 'Common/userAuth',
    })
  }
}

export {
  commonModel
}