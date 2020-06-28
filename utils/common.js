// promise 封装 用于微信开放接口直接直接返回数据
const promisic = function (func) {
  console.log(func);
  return function (params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          reject(error)
        }
      })
      func(args)
    })
  }
}

export { promisic }