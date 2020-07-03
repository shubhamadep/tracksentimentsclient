const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/getproductdetails', createProxyMiddleware({ target : 'https://amazonsellerproductinfo.herokuapp.com', changeOrigin: true}));
    app.use(createProxyMiddleware('/reviews/scrape', { target : 'https://amazonsellerproductinfo.herokuapp.com' }));
}