// quản lý tổng quan route
const systemConfig = require('../../config/system.js');
const dashboardRoutes = require('./dashboard.route.js');
module.exports = (app) =>{
    const PATH_ADMIN = '/' + systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes)
}