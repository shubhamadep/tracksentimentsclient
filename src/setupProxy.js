const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/getProductDetails', { target : 'https://amazonsellerproductinfo.herokuapp.com' }));
}