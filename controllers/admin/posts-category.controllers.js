const PostCategorySchema = require("../../models/post-category.model");
const systemConfig = require("../../config/system");
const Account = require("../../models/accounts.model.js");

const createTree = require("../../helpers/createTree.js");

module.exports.index = async (req, res) => {
    const records = await PostCategorySchema.find({
        deleted: false,
        status: "active"
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


