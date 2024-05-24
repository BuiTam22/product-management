const Account = require("../../models/accounts.model.js");
const Role = require("../../models/role.model.js");
const systemConfig = require("../../config/system");

module.exports.checkLogin = async (req, res, next) => {
    if (req.cookies.token_guest) {
        res.locals.token_guest = req.cookies.token_guest;
    }
    next();
}

module.exports.requireAuth = async (req, res, next) => {

    if (!req.cookies.token_guest) {
        res.redirect(`/auth/login/haveUrl`);
        return;
    }

    const user = await Account.findOne({
        token: req.cookies.token_guest
    });

    if (!user) {
        res.redirect(`/auth/login`);
        return;
    }

    const role = await Role.findOne({
        _id: user.role_id
    }).select("title permissions");

    // -các router chạy qua middleware này thì sẽ nhận được data này 
    // -file pug thì chỉ cần dùng user or role ở res.locals với controller thì phải dùng
    // cả res.locals.user
    res.locals.user = user;
    res.locals.role = role;

    next();
}