const Account = require("../../models/accounts.model.js");
const Role = require("../../models/role.model.js");
const md5 = require('md5');
const systemConfig = require("../../config/system.js");

// [GET] /admin/accounts 
module.exports.index = async (req, res) =>{ 
    const records = await Account.find({
        deleted: false
    });

    for (const record of records) {
        const role = await Role.findOne({ _id: record.role_id });
        record.role = role;
    }

    res.render('admin/pages/accounts/index.pug',{
        title: "Danh sách tài khoản",
        records:records
    })
}



// [GET] /admin/accounts/create 
module.exports.create = async (req, res) =>{ 
    const roles = await Role.find({
        deleted:false
    })
    res.render('admin/pages/accounts/create.pug',{
        title: "Tạo mới tài khoản",
        roles: roles
    })
}



// [POST] /admin/accounts/create 
module.exports.createPost = async (req, res) =>{ 
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
module.exports.editPatch = async (req, res) =>{ 
    //-check xem password có được chỉnh sửa không, nếu không chỉnh thì
    // trường password bị rỗng => gây ra sai
    if(req.body.password) {
        req.body.password = md5(req.body.password);
    } else {
        delete req.body.password;
    }
    
    await Account.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", `Cập nhật thành công!`);
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}

  