const productsRoutes = require('./product.route.js');
const homeRoutes = require('./home.route.js');
const categoryMiddleware = require("../../middlewares/client/category.middleware.js");
module.exports = (app) => {
    app.use(categoryMiddleware.category);
    app.use('/',homeRoutes);

    app.use('/',productsRoutes);
       
}

// sử dụng phương thức use thay vì get, nếu dùng get thì mọi route con trong
// products.route sẽ bị biến hết hành get 
