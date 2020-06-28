// components/topic-admin-list/index.js
import { followModel } from "../../models/follow.js"
const follow = new followModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value:{}
    },

    followed: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
       * 前往动态
       */
    tocenter: function (e) {
      let id = this.properties.data.id
      wx.navigateTo({
        url: '/pages/user-center/index?user_id=' + id,
      })
    },

    /**
   * 用户关注/取消关注
   */
    followed: function (e) {
      let id = this.properties.data.id
      let followed = this.properties.followed
      follow.followed({
        follow_id: id
      }).then(res => {
        followed = followed == 0 ? 1 : 0
        if (followed == 1) {
          wx.showToast({
            title: '关注成功',
            icon: 'none',
            duration: 2000
          })

        }
        this.setData({
          followed
        })
      })
    },
  }
})
