// quản lý tổng quan route
const productsRoutes = require('./products.route.js');
const homeRoutes = require('./home.route.js');
module.exports = (app) =>{
    app.use('/', homeRoutes)
    
    // sử dụng phương thức use thay vì get, nếu dùng get thì mọi route con trong
    // products.route sẽ bị biến hết hành get
    app.use('/products', productsRoutes);
}