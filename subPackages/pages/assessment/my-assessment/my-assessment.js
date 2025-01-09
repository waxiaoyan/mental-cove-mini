// subPackages/pages/assessment/my-assessment/my-assessment.js
import {Store} from '../../../../common/Storage'
import {KEY_TOKEN} from '../../../../common/Constants'

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    assessmentResults: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.fetchAssessmentResults();
  },
  fetchAssessmentResults: function() {
    const that = this;
    const userId = app.globalData.userInfo.userId
    const token = Store.getItem(KEY_TOKEN); // 从本地存储获取token
    if (!token) {
        wx.showToast({
            title: '未登录或登录已过期',
            icon: 'none'
        });
        return;
    }
    wx.request({
      url:`${app.config.env.API_LOCAL}` +  '/questionnaires/assessment-results?userId=' + userId, 
      method: 'GET',
      header: {
        'Authorization': `Bearer ${token}` 
      },
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            assessmentResults: res.data
          });
        } else {
          wx.showToast({
            title: '获取数据失败',
            icon: 'none'
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        });
      }
    });
  },

  goToAssessment() {
     wx.switchTab({
            url: '/pages/assessment/assessment',
             success: function() {
              console.log("Navigation successful");
            },
            fail: function(error) {
              console.log("Navigation failed", error);
            }
        });
  },
  reassessment(){
     wx.switchTab({
            url: '/pages/assessment/assessment'
     });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

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