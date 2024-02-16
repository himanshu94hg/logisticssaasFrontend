const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'http://65.2.38.87:8080',
    changeOrigin: true
}
module.exports = function(app) {
  app.use(
    '/search',
    createProxyMiddleware(proxy)
  );
};