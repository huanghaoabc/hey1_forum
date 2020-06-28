// components/comment-list/index.js
import { commentModel } from "../../models/comment.js"
const comment = new commentModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
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
    goods: function(e){
      let id = e.currentTarget.dataset.id
      let index = e.currentTarget.dataset.index
      comment.goods({
        id: id
      }).then(res => {
        let data = this.properties.list
        let goods = data[index].goods
        if (goods == 1) {
          data[index].goods = 0
          data[index].good_number--
        } else {
          data[index].goods = 1
          data[index].good_number++
        }
        this.setData({
          list: data
        })
      })
    },

    /**
   * 前往用户中心
   */
    toUserDes: function (e) {
      console.log(e)
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/user-center/index?user_id=' + id,
      })
    },

    /**
     * 前往评论详情
     */
    toDes: function(e){
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/article/comment/index?id=' + id,
      })
    },

    /**
     * 删除评论
     */
    delComm: function(e){
      var page = this
      console.log(e)
      let id = e.currentTarget.dataset.id
      let index = e.currentTarget.dataset.index
      let adminDel = e.currentTarget.dataset.admindel
      wx.showModal({
        title: '提示',
        content: '确定删除吗',
        success(res) {
          if (res.confirm) {
            comment.delComm({
              adminDel: adminDel,
              id: id
            }).then(res => {
              let list = page.properties.list
              list.splice(index, 1)
              page.setData({
                list
              })
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })

            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    }
  }
})
