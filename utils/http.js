let site = require('../siteinfo.js')
let siteroot = site.siteroot;
siteroot = siteroot.replace('app/index.php', '');
// siteroot += 'addons/hey1_demo/core/public/index.php/api/';
const rootUrl = siteroot + 'addons/hey1_forum/core/public/index.php/api/';
const publicUrl = siteroot + 'addons/hey1_forum/core/public/';
const resultRoot = siteroot + 'addons/hey1_forum/core/public/';
siteroot += 'addons/hey1_forum/core/public/index.php/api/';
const acid = site.acid;
class HTTP {
  request({
    url,
    data = {},
    method = "GET"
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method);
    })
  }
  _request(url, resolve, reject, data = {}, method = "GET") {
    let token = wx.getStorageSync('token');
    wx.request({
      url: rootUrl + url + "?acid=" + acid + "&token=" + token,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        let status = res.statusCode;
        if (status == 200 && res.data.code == 1) {
          resolve(res.data.data);
        } else if (status == 200 && res.data.code == 2) {
          // 本地token有问题
          wx.removeStorageSync('token');
          wx.removeStorageSync('user');
          this.showFial("未登陆");
          let path = getCurrentPages()[getCurrentPages().length - 1].route
          const query = getCurrentPages()[getCurrentPages().length - 1].options
          var parameter = ''

          for (var i in query) {
            parameter += "&" + i + "=" + query[i];
          }
          if (parameter.substr(1) == "") {
            var url = '/' + path
          } else {
            var url = '/' + path + "?" + parameter.substr(1)
          }
          wx.setStorageSync('before_path', url)
          setTimeout(function () {
            if (getCurrentPages().length > 1) {
              wx.setStorageSync('redirect', false)
              wx.redirectTo({
                url: '/pages/login/login',
              })
            } else {
              wx.setStorageSync('redirect', true)
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          }, 1000)
          reject('未登录');
          // resolve(res.data.data);
        } else if (status == 200 && res.data.code == 11){
          reject(res.data.msg);
          this.showModalFial(res.data.msg)
        }else {
          reject(res.data.msg);
          this.showFial(res.data.msg);
        }
      },
      fial: (err) => {
        reject(err);
        this.showFial();
      }
    })
  }
  /**
   * 文件上传
   */
  uploadFile({
    filePath,
    url = 'Common/upload'
  }) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token');
      wx.uploadFile({
        url: rootUrl + url + "?acid=" + acid + "&token=" + token,
        filePath: filePath,
        name: 'file',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          var res = JSON.parse(res.data);
          console.log(res);
          if (res.code == 1) {
            resolve(res.data.url);
          } else {
            reject();
            this.showFial(res.msg);
          }
        },
        fail: e => {
          reject();
          this.showFial();
        },
      })
    })
  }

  downFile(path){
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: path,
        success: function (res) {
          if (res.statusCode === 200) {
            resolve(res.tempFilePath);
          } else {
            reject(res);
          }
        },
        fial: (err) => {
          reject(err);
        }
      })
    })
  }

  showFial(title = "抱歉，出了个错") {
    let length = this.getBLen(title);
    if (length > 14) {
      wx.showToast({
        title: title,
        icon: "none",
        mask: true,
        duration: 1500,
      });
    } else {
      wx.showToast({
        title: title,
        image: '/images/fial.png',
        mask: true,
        duration: 1500,
      });
    }
  }

  showModalFial(title = "抱歉，出了个错"){
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: title,
      success(res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })

  }

  getBLen(str) {
    if (str == null) return 0;
    if (typeof str != "string") {
      str += "";
    }
    return str.replace(/[^\x00-\xff]/g, "01").length;
  }
  // 小程序码scene 字符串 转 对象
  scene_decode(o) {
    var n = (o + "").split(","),
      r = {};
    for (var t in n) {
      var e = n[t].split(":");
      e.length > 0 && e[0] && (r[e[0]] = e[1] || null)
    }
    return r
  }
  resourceUrl()
  {
    return resultRoot
  }

  /**
   * 文本换行
   */
  textByteLength(text, num) {  // text为传入的文本  num为单行显示的字节长度
    return new Promise((resolve, reject) => {
      let strLength = 0;
      let rows = 1;
      let str = 0;
      let arr = [];
      for (let j = 0; j < text.length; j++) {
        if (text.charCodeAt(j) > 255) {
          strLength += 2;
          if (strLength > rows * num) {
            strLength++;
            arr.push(text.slice(str, j));
            str = j;
            rows++;
          }
        } else {
          strLength++;
          if (strLength > rows * num) {
            arr.push(text.slice(str, j));
            str = j;
            rows++;
          }
        }
      }
      arr.push(text.slice(str, text.length));
      resolve([strLength, arr, rows]);
    })
  }

  getPublicUrl(){
    return publicUrl
  }

}
export {
  HTTP
}