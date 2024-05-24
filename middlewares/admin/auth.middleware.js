const Account = require("../../models/accounts.model");
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

module.exports.requireAuth = async (req, res, next) => {

  if(!req.cookies.token) {
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
    return;
  }

  const user = await Account.findOne({
    token: req.cookies.token
  });

  if(!user) {
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
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