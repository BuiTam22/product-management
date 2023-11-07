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



// [GET] /admin/roles/edit/:id 
module.exports.edit = async (req, res) =>{ 
    try {
        const id = req.params.id;

        const data = await Role.findOne({_id:id},{deleted:false});

        res.render('admin/pages/roles/edit.pug',{
            title: "Chỉnh sửa nhóm quyền", 
            data:data
        });

    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
    
}



// [PATCH] /admin/roles/edit/:id 
module.exports.editPatch = async (req, res) =>{ 
    const id = req.params.id;
    await Role.updateOne({_id: id}, req.body)

    req.flash("success", `Cập nhật thành công!`);
    res.redirect(`back`);
    
}