
const systemConfig = require("../../config/system");

module.exports.checkLogin = async (req, res, next) => {
    if(req.cookies.token_guest){
        res.locals.token_guest = req.cookies.token_guest;
    }
    next();
}