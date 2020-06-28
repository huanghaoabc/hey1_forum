// pages/group-circle/into-table/index.js
const app = getApp()
import { circlesModel } from "../../../models/circles.js"
const circles = new circlesModel()
import Toast from '../../../vant-weapp/dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: (app.globalData.height * 2 + 34) * 2,
    currentDate: '12:00',
    minHour: 9,
    maxHour: 23
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let id = options.id;
    circles.getTable({
      id: id
    }).then(res => {
      console.log(res)
      if(res.length <= 0){
        wx.showModal({
          title: '提示',
          content: '还未开放申请',
          showCancel:false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 2
              })
            }
          }
        })
      }
      var data = res;
      for (let i = 0; i < data.length; i++) {
        data[i]['value'] = '';
        data[i]['act_id'] = options.id;
        if (data[i]['type'] == 7) {
          console.log(data[i])
          var items = [];
          for (let k = 0; k < data[i]['params'].length; k++) {
            let item = {};
            item.name = data[i]['params'][k];
            item.checked = false;
            items[k] = item;
          }
          data[i]['items'] = items;
        }
      }
      this.setData({
        data: data
      })
      wx.hideLoading()
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
     * 绑定input值/时间选择值/日期选择值
  */
  enterText: function (e) {
    console.log(e)
    let type = e.currentTarget.dataset.type;
    let index = e.currentTarget.dataset.index;

    if (type == "1" || type == "2" || type == "3") {
      var value = e.detail
    } else {
      var value = e.detail.value
    }
    let data = this.data.data;
    data[index]['value'] = value;
    this.setData({
      data: data
    })
  },

  /**
   * 绑定单选值
   */
  enterCheck: function (e) {
    let index = e.currentTarget.dataset.index;
    let data = this.data.data;
    let value = data[index]['params'][e.detail.value];
    data[index]['value'] = value;
    this.setData({
      data: data
    })
  },

  /**
   * 绑定多选值
   */
  enterRadio: function (e) {
    let index = e.currentTarget.dataset.index;
    let data = this.data.data;
    let value = e.detail.value;
    let items = data[index]['items'];
    for (let i = 0; i < items.length; i++) {
      items[i].checked = false;
      for (let k = 0; k < value.length; k++) {
        if (items[i].name == value[k]) {
          items[i].checked = true;
        }
      }
    }
    var thisData = '';
    for (let i = 0; i < items.length; i++) {
      if (items[i].checked) {
        thisData += items[i].name + ' ';
      }
    }
    data[index]['value'] = thisData;
    this.setData({
      data: data
    })
  },

  /**
   * 选择相册
   */
  chooseImage: function(e){
    let index = e.currentTarget.dataset.index
    var page = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        var data = page.data.data
        data[index]['value'] = tempFilePaths
        page.setData({
          data: data
        })
      }
    })
  },

  /**
   * 提交申请
   */
  signAct: function(e){
    var data = this.data.data;
    var images = []
    for(let i = 0; i < data.length; i++){
      if (data[i].isrequire == 1 && data[i].value == ''){
        Toast('请填写' + data[i].title)
        return
      }
      if (data[i].type == 8 && data[i].value != ''){
        var tpm = []
        tpm['index'] = i;
        tpm['url'] = data[i].value
        images.push(tpm)
      }
      // if(i == data.length - 1){
      //   wx.showLoading({
      //     title: '正在提交',
      //     mask: true
      //   })
      //   //提交数据
      //   circles.subTable({
      //     data: data
      //   }).then(res => {
      //     wx.showLoading({
      //       title: '正在上传图片',
      //       mask: true
      //     })
      //     circles.uploadFile({
      //       filePath: data[i].value
      //     }).then(res => {
      //       data[i].value = res
      //     })
      //     console.log(res)
      //     wx.hideLoading()
      //   })
      // }
    }
    if(images.length > 0){
      wx.showLoading({
        title: '正在上传图片',
        mask: true
      })
      var index = 0
      for(let i = 0; i < images.length; i++){
        
        circles.uploadFile({
          filePath: images[i].url
        }).then(res => {
          data[images[i].index].value = res
          index++
          if (index == images.length) {
            wx.showLoading({
              title: '正在提交',
              mask: true
            })
            //提交数据
            circles.subTable({
              data: data
            }).then(res => {
              wx.hideLoading()
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 1000
              });
              setTimeout(function () {
                wx.navigateBack({
                  delta: 2
                })
              }, 1000)
            })
          }
        })
        
      } 
    }else{
      //提交数据
      circles.subTable({
        data: data
      }).then(res => {
        wx.hideLoading()
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000
        });
        setTimeout(function () {
          wx.navigateBack({
            delta: 2
          })
        }, 1000)
      })
    }
  }
})