// subPackages/pages/assessment/sds-result/sds-result.js
Page({

  /**
   * Page initial data
   */
  data: {
    score: 0,        // 传入的标准分
    assessment: {},  // 评估结果对象
    resultColor: '#4CAF50' // 结果颜色
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    if (options.results) {
      try {
        const result = JSON.parse(decodeURIComponent(options.results));
        let level = '', desc = '', explanation = '', suggestion = '', score = 0, resultColor = ''
        score = result.score;
        if (score >= 25 && score <= 49) {
          resultColor = '#4CAF50';
        } else if (score >= 50 && score <= 59) {
          resultColor = '#FFC107';
        } else if (score >= 60 && score <= 69) {
          resultColor = '#FF9800';
        } else if(score >= 70) {
          resultColor = '#F44336';
        }
        level = result.result;
        explanation = result.explanation;
        suggestion = result.suggestion;
        this.setData({
          resultColor: resultColor,
          score: score,
          assessment: {level, explanation, suggestion}
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
  retest(){
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