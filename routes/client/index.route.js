const productsRoutes = require('./product.route.js');
const homeRoutes = require('./home.route.js');
module.exports = (app) =>{
    app.use('/', homeRoutes)

    app.use('/products', productsRoutes);
}

    // sử dụng phương thức use thay vì get, nếu dùng get thì mọi route con trong
    // products.route sẽ bị biến hết hành get 
    