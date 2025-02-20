const HttpUtils = require('./HttpUtils.js');  // Adjust the path according to your project structure
function fetchInterpretationCount() {
  return new Promise((resolve, reject) => {
    const app = getApp(); // Get the app instance
    const url = `${app.config.env.API_HOST}/openai/interpretation-count`;
    HttpUtils.apiRequest(
      url, 
      'GET',
      null, 
      (res) => {
        if (res.statusCode === 200) {
          resolve(res.data > 0);
        } else {
          reject(new Error('Failed to fetch data'));
        }
      },
      (err) => {
        reject(err);
      }
    );
  });
}
// Export the function
module.exports = {
  fetchInterpretationCount
};