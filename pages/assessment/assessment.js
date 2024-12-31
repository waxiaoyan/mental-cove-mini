// pages/assessment/assessment.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    showLoginModal: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    // if (app.globalData.loginModalVisible) {
    
    // }

  },
  mbtiQuestionnaire: function() {
    if (!app.isLoggedIn()) {
      wx.navigateTo({
        url: '/subPackages/pages/assessment/mbti-questionnaire/mbti-questionnaire'
      });
    }else {
      this.showLoginModal();
    }
  },
  handleLoginModalChange(e) {
    this.setData({
      showLoginModal: e.detail.showLoginModal
    });
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    if (app.isLoggedIn()) {
      // 显示登录模态框时隐藏 tabBar
      this.showLoginModal();
    }
  },
  showLoginModal() {
    wx.hideTabBar({
      animation: true, // 是否需要动画效果
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