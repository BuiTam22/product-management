const Post = require("../../models/post.model.js");
const PostCategory = require("../../models/post-category.model.js");
const Account = require("../../models/accounts.model.js");
const filterStatusHelpers = require("../../helpers/filterStatus.js");
const searchHelper = require("../../helpers/search.js");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system.js");

// [GET] /admin/posts
module.exports.index = async (req, res) => {
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

    let posts = await Post.find(find)
        // hàm sort để sắp xếp khi tìm kiếm
        .sort(sort)
        // hàm limit là số lượng tối đa của 1 page
        .limit(objectPagination.limitItems)
        // hàm skip là số lượng phần tử cần phải bỏ qua để bắt đầu 1 trang
        .skip(objectPagination.skip);

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].createdBy.account_id) {
            const idAccount = posts[i].createdBy.account_id;
            const accountCreated = await Account.findOne({
                _id: idAccount
            });
            posts[i].createdBy.fullName = accountCreated.fullName;
        }
    }
    // console.log(posts[].createdBy.fullName)
    res.render('admin/pages/posts/index.pug', {
        title: "Danh sách bài viết",
        posts: posts,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

// [GET] /admin/posts/create
module.exports.create = async (req, res) => {
    const records = await PostCategory.find({
        deleted: false,
        status: "active"
    });

    res.render("admin/pages/posts/create.pug", {
        title: "Tạo bài viết mới",
        records: records
    });
}

// [POST] /admin/posts/create
module.exports.createPost = async (req, res) => {
    try {
        if (res.locals.role.permissions.includes("posts_create")) {
            console.log("cho tạo");
        } else {
            return;
        }
        if (req.body.position === "") {
            const countRecords = await Post.countDocuments();
            req.body.position = countRecords + 1;
        } else {
            req.body.position = parseInt(req.body.position);
        }
        const createBy = {
            account_id: res.locals.user.id,
            createAt: new Date()
        };
        let record = new Post(req.body);
        record.createdBy = createBy;

        record.save();

        req.flash('success', `Thêm thành công 1 bản ghi!`);

        res.redirect(`/${systemConfig.prefixAdmin}/posts`);
    } catch (error) {
        console.log(error);
        req.flash("error", "Thêm thất bại một bản ghi");
        res.redirect("back");
    }
};