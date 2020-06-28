// pages/article/details/index.js
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
    userShow: false,
    isShow:false,
    showLoading: true,
    isEmpty: false,
    list: [],
    moreShow: false,
    show: false,
    time:60,
    actions: [
      {
        name: '分享',
        openType: 'share'
      },
      {
        name: '举报',
      }
    ]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageNum = 1
    let id = options.id
    this.setData({
      id: id
    })
    var markCheck = wx.getStorageSync('markCheck')
    this.setData({
      markCheck
    })
    this.getDes()
    this.getComment()
    var page = this
    setInterval(function(){
      let time = page.data.time
      if(time <=0 ){
        time = 0
      }else{
        time = time - 1;
      }
      page.setData({
        time
      })
    },1000)
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
    // pageNum = 1
    // this.setData({
    //   list: [],
    //   arrange: false,
    //   isEmpty: false,
    //   showLoading: true,
    // })
    // this.getComment()
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
   * 用户滑动事件的处理函数
   */
  onPageScroll: function (option) {
    let scrollTop = option.scrollTop
    let userShow = false
    if (scrollTop > 100) {
      userShow = true
    }
    this.setData({
      userShow
    })
  },

  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
    var page = this
    this.setData({ show: false });
    if (event.detail.name == '举报'){
      wx.navigateTo({
        url: '/pages/report/index?to_user_id=' + this.data.data.user_id + '&type=2&to_id=' + this.data.data.id
      })
    }

    if (event.detail.name == '删除'){
      wx.showModal({
        title: '提示',
        content: '确定删除吗',
        success(res) {
          if (res.confirm) {
            articles.delArt({
              id: page.data.data.id
            }).then(res => {
              wx.navigateBack({
                delta: 1
              })
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  /**
   * 获取帖子详情
   */
  getDes: function(){
    articles.getDes({
      id: this.data.id
    }).then(res => {
      console.log(res)
      if (res.isDelete == 1){
        let actions = this.data.actions
        actions.push({
          name: '删除',
          className: 'delArt'
        })
        this.setData({
          actions
        })
      }
      this.setData({
        data: res
      })
    })
  },

  upShow: function () {
    this.setData({
      isShow: true
    })
  },

  /**
   * 获取评论列表
   */
  getComment: function(){
    let id = this.data.id
    comment.getComment({
      id: id,
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
   * 发表评论
   */
  putComment: function ({ detail}){
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
      mask:true,
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
   * 点击评论框
   */
  clickInput: function(){
    this.setData({
      isShow: true
    })
  },

  /**
   * 点赞文章
   */
  clickGood: function(){
    let data = this.data.data
    articles.getGood({
      id: data.id
    }).then(res => {
      if (data.goods == 1) {
        data.goods = 0
        data.good_count--
      } else {
        data.goods = 1
        data.good_count++
      }
      this.setData({
        data
      })
    })
  },

  /**
   * 收藏/取消收藏帖子
   */
  clickStore: function(){
    let data = this.data.data
    articles.storeArt({
      id: data.id
    }).then(res => {
      if (data.stored == 1) {
        data.stored = 0
      } else {
        data.stored = 1
      }
      this.setData({
        data
      })
    })
  },

  /**
   * 点击更多
   */
  more: function(){
    this.setData({
      show: true
    })
  },

  /**
   * 生成海报
   */
  poster: function(){
    var page = this
    common.getIcode({
      page: '/pages/article/details/index',
      scene: 'id:' + page.data.data.id
    }).then(res => {
      console.log(res)
    })
    return
    console.log(http.getPublicUrl())
    var publicUrl = http.getPublicUrl()
    var context = wx.createCanvasContext('mycanvas');
    context.setFillStyle('#fff');
    context.fillRect(0, 0, 300, 600);
    var data = {
      icod: 'https://w7.hey1.net/addons/hey1_demo/core/public/uploads/20190715/2b3ae9f3fc367cb26c06f2aa18ffcfb7.jpg',
      avatar: page.data.data.user.avatar,
      content: page.data.data.title,
      nickname: page.data.data.user.nickname,
      time: page.data.data.createtime
    }
    if (page.data.data.sub_type == 2){
      data.bgimage = publicUrl + '/assets/img/qrcode-dst1.png'
    } else if (page.data.data.images == ''){
      data.bgimage = publicUrl + '/assets/img/qrcode-dst.png'
    }else{
      data.bgimage = page.data.data.images[0]
    }
    //下载图片
    http.downFile(data.bgimage).then(res => {
      var bgimage = res
      http.downFile(data.icod).then(res => {
        var icod = res
        http.downFile(data.avatar).then(res => {
          var avatar = res
          var content = data.content
          if (data.content.length > 55) {
            content = data.content.substr(0, 55) + '...';
          }
          http.textByteLength('"' + content + '"', 41).then(res => {
            var [contentLeng, contentArray, contentRows] = res
            //画图
            context.drawImage(bgimage, 0, 0, 300, 300);

            context.setFillStyle('#000');
            context.setTextAlign('left');
            context.setFontSize(14);
            let contentHh = 20 * 1.3;
            for (let m = 0; m < contentArray.length; m++) {
              console.log(contentArray[m])
              context.fillText(contentArray[m], 10, 330 + contentHh * m);
            }

            //昵称
            context.setFontSize(12);
            context.drawImage(avatar, 10, 400, 40, 40);
            context.fillText(data.nickname, 58, 415)

            //发布时间
            context.setFillStyle('#9C9A9A');
            context.fillText('发布于.' + data.time, 58, 435)

            //二维码
            context.drawImage(icod, 110, 450, 80, 80);

            //提示
            context.setTextAlign('center')
            context.fillText('长按小程序码', 150, 550)
            context.fillText('查看详情', 150, 565)

            context.draw();
            wx.canvasToTempFilePath({
              canvasId: 'mycanvas',
              success: function (res) {
                console.log(res.tempFilePath);
                page.setData({
                  tpmImg: res.tempFilePath
                })
              },
              fail: function (res) {
                console.log(res);
              }
            });
          })
          
        })
      })
    })
    
  },

  /**
   * 用户关注/取消关注
   */
  follow: function(){
    let data = this.data.data
    follow.followed({
      follow_id: data.user.id
    }).then(res => {
      data.followed = data.followed == 0 ? 1 : 0
      if(data.followed == 1){
        wx.showToast({
          title: '关注成功',
          icon: 'none',
          duration: 2000
        })

      }
      this.setData({
        data
      })
    })
  },

  //倒计时
  setTime: function(){
    let time = this.data.time
    time -= 1;
    this.setData({
      time
    })
  },

  //领取红包
  getRed: function(){
    if(this.data.time>0){
      wx.showModal({
        content: '还没到时间哦，先看看内容逛逛评论吧~',
        showCancel:false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return
    }

    wx.navigateTo({
      url: '/pages/red-view/index?id=' + this.data.data.id,
    })
  },clickTitle: function (e) {
    let id = e.currentTarget.dataset.id
    var sub_type = e.currentTarget.dataset.subtype
    console.log("click",e);
    if (sub_type==3)
    {
      wx.navigateTo({
        url: '/pages/article/details/kuaishou?id=' + id
      })

    }else if (sub_type==4)
    {
      wx.navigateTo({
        url: '/pages/article/details/douyin?id=' + id
      })
    }else if (sub_type==5)
    {
      wx.navigateTo({
        url: '/pages/article/details/shangjia?id=' + id
      })
    }else
    {
      wx.navigateTo({
        url: '/pages/article/details/index?id=' + id
      })
    }
  }
})