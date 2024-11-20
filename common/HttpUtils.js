function apiRequest(url, method, data, callback) {
  const token = wx.getStorageSync('authToken'); 
  if (!token) {
    wx.showToast({
      title: '未授权或授权失效',
      icon: 'none'
    });
    return; 
  }

  wx.request({
    url: url,
    method: method,
    data: data,
    header: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    success: callback,
    fail: function(err) {
      wx.showToast({
        title: '系统异常',
        icon: 'none'
      });
      console.error('API请求失败:', err);
    }
  });
}