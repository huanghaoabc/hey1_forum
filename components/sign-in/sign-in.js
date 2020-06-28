// components/sign-in/sign-in.js
import {HTTP} from '../../utils/http.js'
const http = new HTTP()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type: Boolean,
      value:false
    },
    data:{
      type: Object,
      value:{
        score: 0,
        exp:0,
        lastScore:0,
        lastExp:0
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    signInImg: http.resourceUrl() + 'wxapp/sign-in.png?v=1.0'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _close(){
      this.setData({
        show:false
      })
      this.triggerEvent('myevent', {}, {})
    }
  }
})
