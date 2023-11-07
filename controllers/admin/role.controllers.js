const Role = require("../../models/role.model.js");
const systemConfig = require("../../config/system.js");

// [GET] /admin/roles 
module.exports.index = async (req, res) =>{ 
    const records = await Role.find({
        deleted: false
    });
    res.render('admin/pages/roles/index.pug',{
        title: "Danh sách nhóm quyền",
        records:records
    })
}



// [GET] /admin/roles/create 
module.exports.create = async (req, res) =>{ 
    res.render('admin/pages/roles/create.pug',{
        title: "Tạo mới nhóm quyền"
    })
}



// [[POST]] /admin/roles/createPost
module.exports.createPost = async (req, res) =>{ 
    const records = new Role(req.body);
    await records.save();

    req.flash("success", `Thêm mới thành công!`);
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}