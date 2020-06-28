// components/group-circle/index.js
import { circlesModel } from "../../models/circles.js"
const circles = new circlesModel()
import { commonModel } from "../../models/common.js"
const common = new commonModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type:String,
      value: '小圈子'
    },
    hostCircles: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    follow: function(e){
      this.setData({
        loading: true
      })
      let id = e.currentTarget.dataset.id
      let index = e.currentTarget.dataset.index
      circles.follow({id}).then(res => {
        let hostCircles = this.properties.hostCircles
        hostCircles[index].followed = hostCircles[index].followed == 1 ? 0 : 1
        this.setData({
          loading: false,
          hostCircles
        })
      })
    },

    toCircle:function(e){
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/group-circle/details/index?id=' + id,
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
