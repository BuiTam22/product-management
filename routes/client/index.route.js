const productsRoutes = require('./product.route.js');
const homeRoutes = require('./home.route.js');
const categoryMiddleware = require("../../middlewares/client/category.middleware.js");
const searchRoute = require("./search.route.js");
const authRoute = require("./auth.route.js");
const authMiddleware = require("../../middlewares/client/auth.middleware.js");
const cartRoute = require("./cart.route.js");
const chatRoute = require("./chat.route.js");
module.exports = (app) => {
    app.use(categoryMiddleware.category);
    app.use(authMiddleware.checkLogin);
  
    app.use('/',homeRoutes);

    app.use('/products',productsRoutes);

    app.use('/search', searchRoute);

    app.use("/auth", authRoute);

    app.use("/cart", authMiddleware.requireAuth, cartRoute);

    app.use("/chat", chatRoute);

       
}

// sử dụng phương thức use thay vì get, nếu dùng get thì mọi route con trong
// products.route sẽ bị biến hết hành get 
