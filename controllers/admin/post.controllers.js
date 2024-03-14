const Post = require("../../models/post.model.js");
const filterStatusHelpers = require("../../helpers/filterStatus.js");
const searchHelper = require("../../helpers/search.js");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system.js");

// [GET] /admin/posts
module.exports.index = async(req, res) =>{
    const filterStatus = filterStatusHelpers(req.query);
    let objectSearch = searchHelper(req.query);

    let find = {
        deleted: false,
    }
    if (req.query.status) {
        find.status = req.query.status;
    }
    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }

    // Pagination
    let initPagination = {
        currentPage: 1,
        limitItems: 4
    };

    const countPost = await Post.countDocuments(find);
    const objectPagination = paginationHelper(initPagination, req.query, countPost);

    // Sort
    let sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }
    // End Sort

    const posts = await Post.find(find)
        // hàm sort để sắp xếp khi tìm kiếm
        .sort(sort)
        // hàm limit là số lượng tối đa của 1 page
        .limit(objectPagination.limitItems)
        // hàm skip là số lượng phần tử cần phải bỏ qua để bắt đầu 1 trang
        .skip(objectPagination.skip);


    res.render('admin/pages/posts/index.pug', {
        title: "Danh sách bài viết",
        posts: posts,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}