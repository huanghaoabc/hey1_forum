import {
  HTTP
} from "../utils/http.js";

class circlesModel extends HTTP {
  //获取推荐圈子
  recommend() {
    return this.request({
      url: 'articles/Circles/recommend',
    })
  }

  //入圈/退圈
  follow(data) {
    return this.request({
      data: data,
      url: 'articles/Circles/follow',
    })
  }

  //获取圈子列表
  circlesList(data){
    return this.request({
      data: data,
      url: 'articles/Circles/circlesList',
    })
  }

  //获取圈子详情
  circlesDet(data){
    return this.request({
      data: data,
      url: 'articles/Circles/circlesDet',
    })
  }
  //获取圈子详情2
  circlesDetDt(data){
    return this.request({
      data: data,
      url: 'articles/Circles/circlesDetDt',
    })
  }
  //获取圈子自定义表单
  getTable(data){
    return this.request({
      data: data,
      url: 'articles/Circles/getTable',
    })
  }

  //提交圈主申请表单
  subTable(data){
    return this.request({
      data: data,
      url: 'articles/Circles/subTable',
      method:'POST'
    })
  }

  //获取圈主列表
  adminList(data){
    return this.request({
      data: data,
      url: 'articles/Circles/adminList'
    })
  }

  //获取我关注的圈子
  myCir(data){
    return this.request({
      data: data,
      url: 'articles/Circles/myCir'
    })
  }
  

  //获取用户最近逛的圈子
  latelyCir(){
    return this.request({
      url: 'articles/Circles/latelyCir'
    })
  }
}

export {
  circlesModel
}