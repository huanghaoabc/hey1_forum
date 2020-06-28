// pages/article/comment/index.js
const app = getApp()
import { articlesModel } from "../../../models/articles.js"
import { commentModel } from "../../../models/comment.js"
import { commonModel } from "../../../models/common.js"
import { followModel } from "../../../models/follow.js"
import { HTTP } from "../../../utils/http.js"
const http = new HTTP()
const articles = new articlesModel()
const comment = new commentModel()
const common = new commonModel()
const follow = new followModel()
var pageNum = 1;
const pageSize = 6;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: (app.globalData.height * 2 + 24) * 2,
    showLoading: true,
    isEmpty: false,
    list: [],
    one_id: 0,
    two_id: 0,
    post_id: 0,
    isShow: false,
    commentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageNum = 1
    let id = options.id
    this.setData({
      id: id,
      one_id: id
    })
    this.getComment()
    this.getCommDes()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isEmpty) {
      return
    }
    this.setData({
      showLoading: true,
    });
    if (this.data.totalPage < pageNum) {
      this.setData({
        showLoading: false,
        isEmpty: true,
      });
      return
    }
    this.getComment()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取当前评论详情
   */
  getCommDes: function(){
    let id = this.data.id
    comment.getCommDes({
      commentId: id
    }).then(res => {
      this.setData({
        comment: res
      })
      
    })
  },

  /**
  * 获取评论列表
  */
  getComment: function () {
    let id = this.data.id
    comment.getSonComment({
      commentId: id,
      pageNumber: pageNum,
      pageSize: pageSize
    }).then(res => {
      let list = this.data.list.concat(res.list)
      this.setData({
        list: list,
        totalNum: res.total,
        totalPage: res.total_page,
      });
      if (res.total_page <= pageNum) {
        this.setData({
          isEmpty: true,
          showLoading: false
        })
      }
      pageNum++
    })
  },

  /**
   * 前往用户中心
   */
  toUserDes: function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/user-center/index?user_id=' + id,
    })
  },

  /**
   * 用户关注/取消关注
   */
  followed: function (e) {
    let id = this.data.comment.user_id
    let comment = this.data.comment
    follow.followed({
      follow_id: id
    }).then(res => {
      comment.followed = comment.followed == 0 ? 1 : 0
      if (comment.followed == 1) {
        wx.showToast({
          title: '关注成功',
          icon: 'none',
          duration: 2000
        })

      }
      this.setData({
        comment
      })
    })
  },

  /**
   * 查看大图
   */
  viewImages: function (e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    let images = e.currentTarget.dataset.images
    wx.previewImage({
      current: images[index], // 当前显示图片的http链接
      urls: images // 需要预览的图片http链接列表
    })
  },

  /**
   * 点赞
   */
  goods: function (e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    comment.goods({
      id: id
    }).then(res => {
      if(index == 'my'){
        let comment = this.data.comment
        if (comment.goods == 1){
          comment.goods = 0
          comment.good_number--
        }else{
          comment.goods = 1
          comment.good_number++
        }
        this.setData({
          comment
        }) 
      }else{
        let data = this.data.list
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
      }
      
    })
  },

  toReport: function(){
    wx.navigateTo({
      url: '/pages/report/index?to_user_id=' + this.data.comment.user_id + '&type=3&to_id=' + this.data.comment.id
    })
  },

  upShow: function () {
    this.setData({
      isShow: true
    })
  },

  /**
   * 点击评论框
   */
  clickInput: function (e) {
    console.log(e)
    this.setData({
      isShow: true,
      two_id: e.currentTarget.dataset.index
    })
  },

  /**
   * 发表评论
   */
  putComment: function ({ detail }) {
    console.log(detail)
    if (detail.value == "") {
      wx.showModal({
        title: '提示',
        content: '请输入内容',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            return;
          }
        }
      });
      return;
    }
    wx.showLoading({
      mask: true,
      title: '发表中',
    })
    let data = {}
    data.post_id = detail.post_id
    data.one_id = detail.one_id
    data.two_id = detail.two_id
    data.value = detail.value
    if (detail.images.length > 0) {
      var index = 0
      var images = detail.images
      for (let i = 0; i < images.length; i++) {
        http.uploadFile({
          filePath: images[i]
        }).then(res => {
          images[i] = res
          index++
          if (index == images.length) {
            data.images = images
            comment.putComment({
              data
            }).then(res => {
              if(this.data.two_id == 0){
                var comment = this.data.comment
                comment.com_number++
                this.setData({
                  comment
                })
              }
              this.setData({
                isShow: false,
                list: [],
                isEmpty: false,
                showLoading: true,
              })
              pageNum = 1
              this.getComment()
              wx.hideLoading()
            })
          }
        })
      }
    } else {
      comment.putComment({
        data
      }).then(res => {
        if (this.data.two_id == 0) {
          var comment = this.data.comment
          comment.com_number++
          this.setData({
            comment
          })
        }
        this.setData({
          isShow: false,
          list: [],
          isEmpty: false,
          showLoading: true,
        })
        pageNum = 1
        this.getComment()
        wx.hideLoading()
      })
    }

  },

  /**
     * 删除评论
     */
  delComm: function (e) {
    var page = this
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let adminDel = e.currentTarget.dataset.admindel
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success(res) {
        if (res.confirm) {
          comment.delComm({
            id: id,
            adminDel: adminDel,
          }).then(res => {
            wx.showModal({
              title: '提示',
              content: '删除成功',
              showCancel:false,
              success(res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  /**
     * 删除评论
     */
  delCommSon: function (e) {
    var page = this
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let adminDel = e.currentTarget.dataset.admindel
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success(res) {
        if (res.confirm) {
          comment.delComm({
            id: id,
            adminDel: adminDel,
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
})