const systemConfig = require('../../config/system.js');
const dashboardRoutes = require('./dashboard.route.js');
const productsRoutes = require('./products.route.js');
const productsCategoryRoutes = require('./products-category.route.js');
const roleRoutes = require('./role.route.js');
const accountRoutes = require('./account.route.js');
const authRoutes = require('./auth.route.js');
const  authMiddleware = require('../../middlewares/admin/auth.middleware.js');
module.exports = (app) =>{
    const PATH_ADMIN = '/' + systemConfig.prefixAdmin;

    app.use(
        PATH_ADMIN + "/dashboard",
        authMiddleware.requireAuth,
        dashboardRoutes
    );

    app.use(
        PATH_ADMIN + "/products",
        authMiddleware.requireAuth,
        productsRoutes
    );

    app.use(
        PATH_ADMIN + "/products-category",
        authMiddleware.requireAuth,
        productsCategoryRoutes
    );

    app.use(
        PATH_ADMIN + "/roles",
        authMiddleware.requireAuth,
        roleRoutes
    );

    app.use(
        PATH_ADMIN + "/accounts",
        authMiddleware.requireAuth,
        accountRoutes
    );

    app.use(PATH_ADMIN + "/auth", authRoutes);
}