// components/sub-buttom/index.js
import { commonModel } from "../../models/common.js"
const common = new commonModel()
Component({
  /**
   * 组件的属性列表
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

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    downShow: function () {
      this.setData({
        isShow: false
      })
    },

    upShow:function(){
      this.setData({
        isShow: true
      })
    },

    toSub: function(e){
      this.setData({
        isShow: false
      })
      wx.removeStorageSync('cir')
      wx.removeStorageSync('topic')
      if(this.properties.params.id != 0){
        wx.setStorageSync(this.properties.params.key, this.properties.params)
      }
      let type = e.currentTarget.dataset.type
      wx.navigateTo({
        url: '/pages/release/release?subType=' + type + '&params=' + this.properties.params,
      })
    },

    formSubmit: function (e) {
      console.log(e)
      let formId = e.detail.formId
      common.saveFormId({
        formId: formId,
        use_max: 1
      }).then(res => {

      })
    }
  }
})
