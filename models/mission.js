import { HTTP } from "../utils/http.js"
class missionModel extends HTTP {
  index(){
    return this.request({
      url:"task/index"
    })
  }
  // 经验明细
  exp(params){
    return this.request({
      url:"task/expLog",
      data: params,
      method: "POST"
    })
  }
  // 积分明细
  score(params) {
    return this.request({
      url: "task/scoreLog",
      data: params,
      method: "POST"
    })
  }
  // 签到
  signIn(){
    return this.request({
      url:"task/signIn"
    })
  }
}
export{
  missionModel
}