module.exports.index = async (req, res) =>{
    res.render('admin/pages/posts-category/index',{
        title: "Danh mục bài viết"
    });
}