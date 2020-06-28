// pages/chushou/chushou.js
Page({

  /**
   * 页面的初始数据
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    params: {
      type: Object,
      value: {
        key: '',
        id: 0,
        title: ''
      }
    }
  },
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },shouhao: function(e){
      this.setData({
        isShow: false
      })
      wx.removeStorageSync('cir')
      wx.removeStorageSync('topic')
      if(this.properties.params.id != 0){
        wx.setStorageSync(this.properties.params.key, this.properties.params)
      }
      let type = e.currentTarget.dataset.type;
      wx.navigateTo({
        url: '/pages/release/need?subType=11&params=' + this.properties.params,
      })
    },qita:function(e)
    {
      this.setData({
        isShow: false
      })
      wx.removeStorageSync('cir')
      wx.removeStorageSync('topic')
      if(this.properties.params.id != 0){
        wx.setStorageSync(this.properties.params.key, this.properties.params)
      }
      let type = e.currentTarget.dataset.type;
      wx.navigateTo({
        url: '/pages/release/otherneed?subType=12&params=' + this.properties.params,
      })
    }
})