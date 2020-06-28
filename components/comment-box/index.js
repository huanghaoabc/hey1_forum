// components/comment-box/index.js
import { ciradminModel } from "../../models/ciradmin.js"
const ciradmin = new ciradminModel()
import { commonModel } from "../../models/common.js"
const common = new commonModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    artid: {
      type: Number,
      value: 0
    },
    commentNumber: {
      type: Number,
      value: 0
    },
    goodsNumber: {
      type: Number,
      value: 0
    },
    goods: {
      type: Number,
      value: 0
    },
    stored: {
      type: Number,
      value: 0
    },
    showStore: {
      type: Boolean,
      value: true
    },
    showMore: {
      type: Boolean,
      value: true
    },
    showAdmin: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showI: false,
    actions: [
      {
        name: '置顶/取消置顶',
      },
      {
        name: '加精/取消加精',
      },{
        name: '删除',
        className: 'delArt'
      }
    ],
    showPop:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    comment: function(){
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('click-comment', myEventDetail, myEventOption)
    },

    input: function(){
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('click-input', myEventDetail, myEventOption)
    },

    good: function(){
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('click-good', myEventDetail, myEventOption)
    },

    formSubmit: function (e) {
      console.log(e)
      let formId = e.detail.formId
      common.saveFormId({
        formId: formId,
        use_max: 1
      }).then(res => {

      })
    },

    commentIcod: function(){
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('click-icod', myEventDetail, myEventOption)
    },

    store: function(){
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('click-store', myEventDetail, myEventOption)
    },

    more: function(){
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('click-more', myEventDetail, myEventOption)
    },

    onClose() {
      this.setData({ showI: false });
    },

    onSelect(event) {
      console.log(event.detail);
      this.setData({
        showI: false
      })
      var page = this
      this.setData({ show: false });
      if (event.detail.name == '置顶/取消置顶') {
        ciradmin.tops({
          id: this.properties.artid
        }).then(res => {
          wx.showToast({
            title: res.mss,
            icon: 'success',
            duration: 2000
          })

        })
      }

      if (event.detail.name == '加精/取消加精') {
        ciradmin.isEss({
          id: this.properties.artid
        }).then(res => {
          wx.showToast({
            title: res.mss,
            icon: 'success',
            duration: 2000
          })

        })
      }

      if (event.detail.name == '删除') {

        wx.showModal({
          title: '提示',
          content: '确定删除吗',
          success(res) {
            if (res.confirm) {
              ciradmin.delArt({
                id: page.properties.artid
              }).then(res => {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 1
                  })
                },2000)
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    },

    upShow: function () {
      this.setData({
        showI: true
      })
    },showQrcoden:function ()
    {
      let randQrcoden = "http://jh.juhuchuanmei.cn/addons/hey1_forum/user"+Math.floor(Math.random() * 5+1)+".png";
      this.setData({
        showPop:true,
        randQrcoden:randQrcoden
      })
    },closePop:function ()
    {
      this.setData({
        showPop:false,
        
      })
    }
  }
  
})
