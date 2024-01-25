const Account = require("../../models/accounts.model.js");
const Role = require("../../models/role.model.js");
const md5 = require('md5');
const systemConfig = require("../../config/system.js");

// [GET] /admin/accounts 
module.exports.index = async (req, res) => {
  const records = await Account.find({
    deleted: false
  });

  for (const record of records) {
    const role = await Role.findOne({ _id: record.role_id });
    record.role = role;
  }

  res.render('admin/pages/accounts/index.pug', {
    title: "Danh sách tài khoản",
    records: records
  })
}



// [GET] /admin/accounts/create 
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false
  })
  res.render('admin/pages/accounts/create.pug', {
    title: "Tạo mới tài khoản",
    roles: roles
  })
}



// [POST] /admin/accounts/create 
module.exports.createPost = async (req, res) => {
  if (res.locals.role.permissions.includes("account_create")) {
    console.log("Cho tạo");
  } else {
    return;
  }
  // mã hóa password
  req.body.password = md5(req.body.password);
  const account = new Account(req.body);

  await account.save();

  req.flash("success", `Thêm mới thành công!`);
  res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}



// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  let find = {
    _id: req.params.id,
    deleted: false,
  };

  try {
    const data = await Account.findOne(find);

    const roles = await Role.find({
      deleted: false,
    });

    res.render("admin/pages/accounts/edit", {
      title: "Chỉnh sửa tài khoản",
      data: data,
      roles: roles,
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  }
};



// [PATCH] /admin/accounts/edit/:id 
module.exports.editPatch = async (req, res) => {
  if (res.locals.role.permissions.includes("account_edit")) {
    console.log("Cho sửa");
  } else {
    return;
  }
  //-check xem password có được chỉnh sửa không, nếu không chỉnh thì
  // trường password bị rỗng => gây ra sai
  if (req.body.password) {
    req.body.password = md5(req.body.password);
  } else {
    delete req.body.password;
  }

  await Account.updateOne({ _id: req.params.id }, req.body);
  req.flash("success", `Cập nhật thành công!`);
  res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}


// [PATCH] /admin/accounts/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  if (res.locals.role.permissions.includes("account_edit")) {
    console.log("Cho sửa");
  } else {
    return;
  }

  const status = req.params.status;
  const id = req.params.id;

  await Account.updateOne({ _id: id }, { status: status });

  req.flash("success", "Cập nhật trạng thái thành công!");

  const account = await Account.findOne({ _id: id });
  if (account.token == res.locals.user.token) {
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
  } else {
    res.redirect("back");
  }

}


// [GET] /admin/accounts/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const record = await Account.findOne({
    _id: id,
    deleted: false,
    status: "active"
  })

  const role = await Role.findOne({
    _id: record.role_id,
    deleted: false
  })

  record["role"] = role.title;

  res.render("admin/pages/accounts/detail.pug", {
    title: `Chi tiết tài khoản ${record.fullName}`,
    record: record
  })
}


// [PATCH] /admin/accounts/delete/:id
module.exports.delete = async (req, res) => {
  if (res.locals.role.permissions.includes("account_delete")) {
    console.log("Cho xóa")
  } else {
    return;
  }

  const id = req.params.id;

  await Account.updateOne({ _id: id }, { deleted: true });

  if (res.locals.user.id == id) {
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
  } else {
    req.flash("success", "Xóa thành công!");

    res.redirect("back")
  }

}
