const Role = require("../../models/role.model.js");
const systemConfig = require("../../config/system.js");

// [GET] /admin/roles 
module.exports.index = async (req, res) => {
    const records = await Role.find({
        deleted: false
    });
    res.render('admin/pages/roles/index.pug', {
        title: "Danh sách nhóm quyền",
        records: records
    })
}



// [GET] /admin/roles/create 
module.exports.create = async (req, res) => {
    res.render('admin/pages/roles/create.pug', {
        title: "Tạo mới nhóm quyền"
    })
}



// [[POST]] /admin/roles/createPost
module.exports.createPost = async (req, res) => {
    if (res.locals.role.permissions.includes("roles_create")) {
        console.log("Cho tạo");
    } else {
        return;
    }

    const records = new Role(req.body);
    await records.save();

    req.flash("success", `Thêm mới thành công!`);
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}



// [GET] /admin/roles/edit/:id 
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await Role.findOne({ _id: id }, { deleted: false });

        res.render('admin/pages/roles/edit.pug', {
            title: "Chỉnh sửa nhóm quyền",
            data: data
        });

    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }

}



// [PATCH] /admin/roles/edit/:id 
module.exports.editPatch = async (req, res) => {
    if (res.locals.role.permissions.includes("roles_edit")) {
        console.log("Cho sửa");
    } else {
        return;
    }
    const id = req.params.id;
    await Role.updateOne({ _id: id }, req.body)

    req.flash("success", `Cập nhật thành công!`);
    res.redirect(`back`);

}



// [GET] /admin/roles/create 
module.exports.permissions = async (req, res) => {

    const records = await Role.find({
        deleted: false
    });
    res.render('admin/pages/roles/permissions.pug', {
        title: "Phân quyền",
        records: records
    })
}



// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
    if (res.locals.role.permissions.includes("roles_permissions")) {
        console.log("Cho sửa");
    } else {
        return;
    }
    const permissions = JSON.parse(req.body.permissions);

    for (const item of permissions) {
        await Role.updateOne(
            {
                _id: item.id
            },
            {
                permissions: item.permissions
            }
        );
    }

    req.flash("success", "Cập nhật phân quyền thành công!");

    res.redirect("back");
}


// [GET] /admin//roles/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const records = await Role.find({
        _id: id,
        deleted: false
    });
    
    res.render('admin/pages/roles/detail.pug', {
        title: "Chi tiết nhóm quyền",
        records: records
    })
}