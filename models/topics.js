import {
  HTTP
} from "../utils/http.js";

class topicsModel extends HTTP {
  //获取热门话题
  hostTopics(data) {
    return this.request({
      data: data,
      url: 'articles/Topics/hostTopics',
    })
  }

  //获取话题列表
  topicsList(data) {
    return this.request({
      data: data,
      url: 'articles/Topics/topicsList',
    })
  }

  //获取话题详情
  topicsDet(data) {
    return this.request({
      data: data,
      url: 'articles/Topics/topicsDet',
    })
  }
}

export {
  topicsModel
}