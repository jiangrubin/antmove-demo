import { TOKEN_KEY, getToken } from './token'

const METHODS = ['GET', 'POST', 'PUT', 'DELETE']

const TASK_METHODS = ['abort', 'onHeadersReceived', 'offHeadersReceived', 'onChunkReceived', 'offChunkReceived']

class Request {
  constructor () {

  }

  static getInstance () {
    if (!Request._instance) {
      Request._instance = new Request()
    }
    return Request._instance
  }

  exec (options = {}) {
    let requestTask
    const { url, header, ...rest } = options
  
    const promise = new Promise((resolve, reject) => {
      requestTask = wx.request({
        ...rest,
        url: url,
        header: {
          ...header,
          [TOKEN_KEY]: getToken(),
        },
        success (res) {
          resolve(res)
        },
        fail (error) {
          reject(error)
        }
      })
    })

    TASK_METHODS.forEach(m => {
      promise.__proto__[m] = function () {
        requestTask[m](arguments)
      }
    })

    return promise
  }
}

METHODS.forEach(method => {
  Request.prototype[method.toLocaleLowerCase()] = function (options = {}) {
    return this.exec({ ...options, method })
  }
})

module.exports = Request.getInstance()