// subPackages/pages/assessment/mbti-result/mbti-result.js
Page({

  /**
   * Page initial data
   */
  data: {
    mbtiType:'',
    personality : '',
    desc: '',
    percentages: [],
    progressColors:['#3c3ff0da','#20ca4b','#ed7d31','#5ea4f5','#a5a4a4']
  },
  
  // backToAccessment(){
  //   wx.reLaunch({
  //     url: '/pages/assessment/assessment',
  //   })
  // },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    if (options.results) {
      try {
        const results = JSON.parse(decodeURIComponent(options.results));
        let mbtiItem
        if (Array.isArray(results)) {
           mbtiItem = results.find(item => item.assessmentType === "MBTI");
        }
        this.setData({
          mbtiType: results.mbtiType || mbtiItem.assessmentResult.mbtiType,
          personality: results.personality || mbtiItem.assessmentResult.personality,
          desc: results.desc,
          percentages: results.percentages || mbtiItem.assessmentResult.percentages
        });
      } catch (e) {
        console.error('解析结果发生错误:', e);
        wx.showToast({
          title: '数据解析错误',
          icon: 'none'
        });
      }
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

  },
  goToPersonality() {
    let mbtiType = this.data.mbtiType.toLowerCase();
    console.log("mbtitype:" + mbtiType)
    wx.navigateTo({
      url: '/subPackages/pages/assessment/mbti-result-interpretation/mbti-' + mbtiType + '/mbti-' + mbtiType + '?section=personality'
    });
  },
  goToAdvantages() {
    let mbtiType = this.data.mbtiType.toLowerCase();
    wx.navigateTo({
      url: '/subPackages/pages/assessment/mbti-result-interpretation/mbti-' + mbtiType + '/mbti-' + mbtiType + '?section=advantages'
    });
  },
  goToPreferredCareers() {
    let mbtiType = this.data.mbtiType.toLowerCase();
    wx.navigateTo({
      url: '/subPackages/pages/assessment/mbti-result-interpretation/mbti-' + mbtiType + '/mbti-' + mbtiType + '?section=careers'
    });
  },
  goToDevelopmentAdvice() {
    let mbtiType = this.data.mbtiType.toLowerCase();
    wx.navigateTo({
      url: '/subPackages/pages/assessment/mbti-result-interpretation/mbti-' + mbtiType + '/mbti-' + mbtiType + '?section=development'
    });
  },
  goToLoveAnalysis() {
    let mbtiType = this.data.mbtiType.toLowerCase();
    wx.navigateTo({
      url: '/subPackages/pages/assessment/mbti-result-interpretation/mbti-' + mbtiType + '/mbti-' + mbtiType + '?section=love'
    });
  }

})