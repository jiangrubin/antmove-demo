export const TOKEN_KEY = 'token'

export function getToken () {
  return wx.getStorageSync(TOKEN_KEY)
}

export function setToken (value) {
  wx.setStorageSync(TOKEN_KEY, value)
}

export function removeToken () {
  wx.removeStorageSync(TOKEN_KEY)
}