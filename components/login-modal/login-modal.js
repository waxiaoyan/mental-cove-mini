// components/login-modal/login-modal.js
const app = getApp();

Component({
  properties: {
    showLoginModal: {
      type: Boolean,
      value: true
    },
  },
  methods: {
    login: function() {
      getApp().userLogin().then(userInfo => {
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000,
          complete: () => {  // Changed to an arrow function
            this.closeModal(userInfo);
          }
      });
      app.setUserInfo(userInfo)
    }).catch(error => {
      wx.showToast({
        title: '登录失败',
        icon: 'none',
        duration: 2000
      });
      this.closeModal();
    });    
    },
    closeModal(userInfo) {
      if (!userInfo || typeof userInfo !== 'object' || userInfo.type === "tap") {
        console.log("closeModal was triggered by an event.");
        userInfo = {}; // 如果是事件调用，则将 userInfo 设为空对象
      }
      wx.showTabBar({
        animation: false,
        success: function() {
          const isLoggedIn = userInfo && Object.keys(userInfo).length > 0;
          this.setData({ showLoginModal: false }, () => {
            this.triggerEvent('change', { userInfo: userInfo, isLoggedIn: isLoggedIn,showLoginModal: false });
          });
        }.bind(this)
      });
    }
  }
});