// pages/dream/dream-interepet.js
const app = getApp();

Page({
  /**
   * Page initial data
   */
  data: {
    showLoginModal: false,
    isAnalyzed:false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    wx.hideShareMenu();
    if (!app.isLoggedIn()) {
      this.showLoginModal();
    }
    
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  showLoginModal() {
    wx.hideTabBar({
      animation: false, // 是否需要动画效果
      success: function() {
        // 成功隐藏后，可以设置状态显示登录模态框
        this.setData({ showLoginModal: true });
      }.bind(this)
    });
  },
  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    if (!app.isLoggedIn()) {
      // 显示登录模态框时隐藏 tabBar
      this.showLoginModal();
    }
  },
  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})