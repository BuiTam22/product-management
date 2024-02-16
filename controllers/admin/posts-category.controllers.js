const PostCategorySchema = require("../../models/post-category.model");
module.exports.index = async (req, res) =>{
    const records = await PostCategorySchema.find({
        deleted: false,
        status: "active"
    });

    res.render('admin/pages/posts-category/index',{
        title: "Danh mục bài viết",
        records: records
    });
}