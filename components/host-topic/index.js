// components/host-topic/index.js
import { commonModel } from "../../models/common.js"
const common = new commonModel()
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
    onClickNav: function (e) {
      let dataset = e.currentTarget.dataset
      var myEventDetail = { dataset } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('click-nav', myEventDetail, myEventOption)
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
