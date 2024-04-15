const Account = require("../../models/accounts.model.js");
const Role = require("../../models/role.model.js");
const md5 = require("md5")

const systemConfig = require("../../config/system.js");

// [GET] /admin/my-account
module.exports.index = async (req, res) => {
    res.render('admin/pages/my-account/index.pug', {
        title: "Thông tin cá nhân"
    })
}


// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
    res.render('admin/pages/my-account/edit.pug', {
        title: "Chỉnh sửa thông tin cá nhân"
    })
}

// [PATCH] /admin/my-account/edit/
module.exports.editPatch = async (req, res) => {

    //-check xem password có được chỉnh sửa không, nếu không chỉnh thì
    // trường password bị rỗng => gây ra sai
    if (req.body.password) {
        req.body.password = md5(req.body.password);
    } else {
        delete req.body.password;
    }

    await Account.updateOne({ _id: res.locals.user._id }, req.body);
    req.flash("success", `Cập nhật thành công!`);
    res.redirect(`/${systemConfig.prefixAdmin}/my-account`);
}
