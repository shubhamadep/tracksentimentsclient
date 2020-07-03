const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/getProductDetails/scrape', { target : 'https://amazonsellerproductinfo.herokuapp.com' }));
    app.use(createProxyMiddleware('/reviews/scrape', { target : 'https://amazonsellerproductinfo.herokuapp.com' }));
}