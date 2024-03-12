const PostCategorySchema = require("../../models/post-category.model");
const systemConfig = require("../../config/system");
const Account = require("../../models/accounts.model.js");

const createTree = require("../../helpers/createTree.js");

module.exports.index = async (req, res) => {
    const records = await PostCategorySchema.find({
        deleted: false
    });

    for (let i = 0; i < records.length; i++) {
        if (records[i].createdBy.account_id) {
            const idAccount = records[i].createdBy.account_id;
            const accountCreated = await Account.findOne({
                _id: idAccount
            });
            records[i].createdBy.fullName = accountCreated.fullName;
        }

        if (records[i].updatedBy.length > 0) {
            const updatedLast = records[i].updatedBy[records[i].updatedBy.length - 1];

            const accountUpdated = await Account.findOne({ _id: updatedLast.account_id });

            const updatedAtLast = updatedLast.updatedAt;

            records[i].updatedBy = {};
            records[i].updatedBy.fullName = accountUpdated.fullName;
            records[i].updatedBy.updatedAt = updatedAtLast;
        }
    }

    const newRecords = createTree(records);

    res.render('admin/pages/posts-category/index', {
        title: "Danh mục bài viết",
        records: newRecords
    });
}

// [GET] /admin/posts-category/create
module.exports.create = async (req, res) => {
    const records = await PostCategorySchema.find({
        deleted: false,
        status: "active"
    })

    res.render('admin/pages/posts-category/create', {
        title: "Tạo mới danh mục bài viết",
        records: records
    });
}

// [POST] /admin/posts-category/create
module.exports.createPost = async (req, res) => {
    if (res.locals.role.permissions.includes("posts-category_create")) {
        console.log("Cho tạo");
    } else {
        return;
    }

    if (req.body.position === "") {
        const countRecords = await PostCategorySchema.countDocuments();
        req.body.position = countRecords + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    const createdBy = {
        account_id: res.locals.user.id,
        createdAt: new Date()
    };

    const record = new PostCategorySchema(req.body);
    record.createdBy = createdBy;


    await record.save();

    req.flash('success', `Thêm thành công 1 bản ghi!`);

    res.redirect(`/${systemConfig.prefixAdmin}/posts-category`);

};

// [GET] /admin/posts-category/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const record = await PostCategorySchema.findOne({
        _id: id,
        deleted: false,
    });
    const records = await PostCategorySchema.find({
        deleted: false,
    });

    res.render("admin/pages/posts-category/edit.pug", {
        title: "Chỉnh sửa danh mục bài viết",
        records: records,
        post: record
    })
}

// [PATCH] /admin/posts-category/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        if (res.locals.role.permissions.includes("posts-category_edit")) {
            console.log("cho sửa");
        } else {
            return;
        }
        const id = req.params.id;
        const userUpdate = res.locals.user;

        const updatedBy = {
            account_id: userUpdate.id,
            updatedAt: new Date()
        }
        req.body.position = parseInt(req.body.position);

        await PostCategorySchema.updateOne({ _id: id }, {
            ...req.body,
            $push: { updatedBy: updatedBy }
        });

        req.flash("success", "Cập nhật thành công một bản ghi");
        res.redirect(`/${systemConfig.prefixAdmin}/posts-category`);

    } catch (error) {
        console.log(error);
        req.flash("error", "Cập nhật thất bại một bản ghi");
        res.redirect("back");
    }

}

// [PATCH] /admin/posts-category/delete/:id
module.exports.delete = async (req, res) =>{
    try {
        const id = req.params.id;
        await PostCategorySchema.updateOne(
            {_id: id},
            {deleted:true}
        );
        req.flash("success", "Xóa thành công một bản ghi");
        res.redirect("back");
    } catch (error) {
        console.log(error);
        req.flash("error", "Xóa thất bại một bản ghi");
        res.redirect("back");
    }
    
}