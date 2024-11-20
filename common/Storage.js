export const Store = {
  getItem: (key) => wx.getStorageSync(key),
  setItem: (key, val) => {
    try {
      wx.setStorageSync(key, val)
    } catch (e) {
      wx.setStorage({
        key,
        data: val,
      })
    }
  },
  clear: (key) => {
    key ? wx.removeStorageSync(key) : wx.clearStorageSync()
  },
}
