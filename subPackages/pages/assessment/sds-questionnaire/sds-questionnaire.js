// subPackages/pages/assessment/sds-questionnaire/sds-questionnaire.js
const HttpUtils = require('../../../../common/HttpUtils.js'); 
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    questions: [
      // 正向计分题（共10题）
      {
        id: 1,
        question: "我感到情绪低落和忧郁",
          a1: "没有或很少时间", a1_type: 1,
          a2: "有时",    a2_type: 2,
          a3: "大部分时间", a3_type: 3,
          a4: "大多数时间",    a4_type: 4
      },
      // 反向计分题（共10题，用❗标记）
      {
        id: 2,
        question: "早晨是我感觉最好的时候",       // ❗反向计分
          a1: "没有或很少时间", a1_type: 4,
          a2: "有时",    a2_type: 3,
          a3: "大部分时间", a3_type: 2,
          a4: "大多数时间",    a4_type: 1
      },
      {
        id: 3, question: "我有哭泣的冲动或感觉想哭", 
          a1: "没有或很少时间", a1_type: 1,
          a2: "有时",    a2_type: 2,
          a3: "大部分时间", a3_type: 3,
          a4: "大多数时间",    a4_type: 4
      },
      {
        id: 4, question: "我夜间睡眠不好", 
          a1: "没有或很少时间", a1_type: 1,
          a2: "有时",    a2_type: 2,
          a3: "大部分时间", a3_type: 3,
          a4: "大多数时间",    a4_type: 4
      },
      {
        id: 5, question: "我的食欲和以前一样好",   // ❗反向
          a1: "没有或很少时间", a1_type: 4,
          a2: "有时",    a2_type: 3,
          a3: "大部分时间", a3_type: 2,
          a4: "大多数时间",    a4_type: 1
      },
      {
        id: 6, question: "我与异性接触时感到愉快", // ❗反向
          a1: "没有或很少时间", a1_type: 4,
          a2: "有时",    a2_type: 3,
          a3: "大部分时间", a3_type: 2,
          a4: "大多数时间",    a4_type: 1
       },
      {
        id: 7, question: "我注意到自己体重减轻了", 
          a1: "没有或很少时间", a1_type: 1,
          a2: "有时",    a2_type: 2,
          a3: "大部分时间", a3_type: 3,
          a4: "大多数时间",    a4_type: 4
      },
      {
        id: 8, question: "我为便秘烦恼", 
          a1: "没有或很少时间", a1_type: 1,
          a2: "有时",    a2_type: 2,
          a3: "大部分时间", a3_type: 3,
          a4: "大多数时间",    a4_type: 4
      },
      {
        id: 9, question: "我的心跳比平时快", 
          a1: "没有或很少时间", a1_type: 1,
          a2: "有时",    a2_type: 2,
          a3: "大部分时间", a3_type: 3,
          a4: "大多数时间",    a4_type: 4
      },
      {
        id: 10, question: "我无缘无故地感到疲倦", 
          a1: "没有或很少时间", a1_type: 1,
          a2: "有时",    a2_type: 2,
          a3: "大部分时间", a3_type: 3,
          a4: "大多数时间",    a4_type: 4
      },
      {
        id: 11, question: "我的思维像以前一样清晰",      // ❗反向
          a1: "没有或很少时间", a1_type: 4,
          a2: "有时",    a2_type: 3,
          a3: "大部分时间", a3_type: 2,
          a4: "大多数时间",    a4_type: 1
       },
      {
        id: 12, question: "我发现做以前的事情依然容易",    // ❗反向
          a1: "没有或很少时间", a1_type: 4,
          a2: "有时",    a2_type: 3,
          a3: "大部分时间", a3_type: 2,
          a4: "大多数时间",    a4_type: 1
       },
      {
        id: 13, question: "我感到焦虑不安，难以保持平静", 
          a1: "没有或很少时间", a1_type: 1,
          a2: "有时",    a2_type: 2,
          a3: "大部分时间", a3_type: 3,
          a4: "大多数时间",    a4_type: 4
      },
      {
        id: 14, question: "我对未来充满希望",      // ❗反向
          a1: "没有或很少时间", a1_type: 4,
          a2: "有时",    a2_type: 3,
          a3: "大部分时间", a3_type: 2,
          a4: "大多数时间",    a4_type: 1
       },
      {
        id: 15, question: "我比平时更容易感到烦躁", 
          a1: "没有或很少时间", a1_type: 1,
          a2: "有时",    a2_type: 2,
          a3: "大部分时间", a3_type: 3,
          a4: "大多数时间",    a4_type: 4
      },
      {
        id: 16, question: "我觉得做决定很容易",   // ❗反向
          a1: "没有或很少时间", a1_type: 4,
          a2: "有时",    a2_type: 3,
          a3: "大部分时间", a3_type: 2,
          a4: "大多数时间",    a4_type: 1
       },
      {
        id: 17, question: "我觉得自己是有用的、被需要的",      // ❗反向
          a1: "没有或很少时间", a1_type: 4,
          a2: "有时",    a2_type: 3,
          a3: "大部分时间", a3_type: 2,
          a4: "大多数时间",    a4_type: 1
       },
      {
        id: 18, question: "我的生活充实而有意义",       // ❗反向
          a1: "没有或很少时间", a1_type: 4,
          a2: "有时",    a2_type: 3,
          a3: "大部分时间", a3_type: 2,
          a4: "大多数时间",    a4_type: 1
       },
      {
        id: 19, question: "我觉得如果我死了，别人会过得更好", 
          a1: "没有或很少时间", a1_type: 1,
          a2: "有时",    a2_type: 2,
          a3: "大部分时间", a3_type: 3,
          a4: "大多数时间",    a4_type: 4
      },
      {
        id: 20, question: "我仍然享受以前喜欢做的事情",// ❗反向
          a1: "没有或很少时间", a1_type: 4,
          a2: "有时",    a2_type: 3,
          a3: "大部分时间", a3_type: 2,
          a4: "大多数时间",    a4_type: 1
       }
    ],
    currentQuestion: {},
    currentIndex: 1,
    answers: {},
    totalQuestions: 0,
    progress: 0,
    selected:false
  },
  submit: function() {
    if (!this.data.selected) {
      wx.showToast({
        title: '请选择回答问题后提交',
        icon: 'none',
        duration: 2000
      });
      return; 
    }
    const url = app.config.env.API_HOST + '/questionnaires/submit-sds';
    HttpUtils.apiRequest(
      url, 
      'POST', 
      this.data.answers, 
      (res) => {
            if (res.statusCode === 200) {
                // Process the successful response and navigate
                wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 2000,
                    complete: () => {
                        // Navigate to the result page after the toast
                        wx.navigateTo({
                            url: '/subPackages/pages/assessment/sds-result/sds-result?results=' + encodeURIComponent(JSON.stringify(res.data))
                        });
                    }
                });
            } else {
                // Handle non-200 responses
                wx.showToast({
                    title: '系统异常，请稍后重试',
                    icon: 'none',
                    duration: 2000
                });
            }
        }
    ); 
},
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.setData({
      currentQuestion: this.data.questions[0],
      progress: 0,
      totalQuestions: this.data.questions.length
    })
  },

  handleOptionChange: function(e) {
    const selected = e.detail.value;
    const currentId = this.data.currentQuestion.id; 
    this.setData({
      answers: { ...this.data.answers, [currentId]: selected },
      selected:true
    });
    let newIndex = this.data.currentIndex + 1;
    if (newIndex <= this.data.totalQuestions) {
       this.nextQuestion();
    }
  },

  nextQuestion: function() {
    if (!this.data.selected) {
      // Notify the user to select an option
      wx.showToast({
        title: '请选择回答问题后提交',
        icon: 'none',
        duration: 2000
      });
      return; // Stop the function from proceeding
    }
    let newIndex = this.data.currentIndex + 1;
    if (newIndex <= this.data.totalQuestions) {
      this.updateQuestion(newIndex);
    }
    this.data.selected = false;
  },
  
  previousQuestion: function() {
    let newIndex = this.data.currentIndex - 1;
    if (newIndex >= 1) {
      this.updateQuestion(newIndex);
    }
    this.data.selected = true;
  },
  
  updateQuestion: function(index) {
    const newQuestion = this.data.questions[index - 1]; 
    const selectedOption = this.data.answers[newQuestion.id] || ''; 
    this.setData({
      currentQuestion: newQuestion,
      currentIndex: index,
      selectedOption: selectedOption 
    });
    this.updateProgress(); 
  },
  
  updateProgress: function() {
    const progress = (this.data.currentIndex / this.data.totalQuestions) * 100;
    this.setData({
      progress: progress
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