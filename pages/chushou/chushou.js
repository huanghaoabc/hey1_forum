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

  },toSub: function(e){
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
        url: '/pages/release/release?subType=' + type + '&params=' + this.properties.params,
      })
    },toSub2: function(e){
      this.setData({
        isShow: false
      })
      wx.removeStorageSync('cir')
      wx.removeStorageSync('topic')
      if(this.properties.params.id != 0){
        wx.setStorageSync(this.properties.params.key, this.properties.params)
      }
      let type = e.currentTarget.dataset.type;
      if (type == 3)
      {
        wx.navigateTo({
          url: '/pages/release/sell?subtype=' + type + '&params=' + this.properties.params,
        })
      }else if (type == 4)
      {
        wx.navigateTo({
          
          url: '/pages/release/douyin?subtype=' + type + '&params=' + this.properties.params,
        })        
      }else if(type=="5")
      {
        wx.navigateTo({
          url: '/pages/release/fabu?subtype=' + type,
        })
      }
      
    },toXuqiu:function ()
    {
      wx.navigateTo({
        url: '/pages/chushou2/chushou',
      })
    }
})