const Product = require('../../models/product.model.js');
const ProductCategory = require("../../models/product-category.model.js");
const filterStatusHelpers = require("../../helpers/filterStatus.js");
const searchHelper = require("../../helpers/search.js");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system.js");
const createTree = require("../../helpers/createTree.js");
 
// [GET] /admin/products
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

    const countProducts = await Product.count(find);
    const objectPagination = paginationHelper(initPagination, req.query, countProducts);

    // Sort
    let sort = {};

    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }
    // End Sort

    const products = await Product.find(find)
        // hàm sort để sắp xếp khi tìm kiếm
        .sort(sort)
        // hàm limit là số lượng tối đa của 1 page
        .limit(objectPagination.limitItems)
        // hàm skip là số lượng phần tử cần phải bỏ qua để bắt đầu 1 trang
        .skip(objectPagination.skip);

    res.render('admin/pages/products/index.pug', {
        title: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const newStatus = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { status: newStatus });

    req.flash('success', 'Cập nhật trạng thái thành công!');

    //sau khi update thì redirect('back') để quay lại đúng trang mà mình vừa qua thay vì vào /:status/:id
    res.redirect("back");
}

// [PATCH] /admin/products/change-multi/
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: type });
            req.flash('success', `Cập nhật trạng thái thành công cho ${ids.length} sản phẩm!`);
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                deletedAt: new Date()
            });
            req.flash('success', `Xóa thành công ${ids.length} sản phẩm!`);
            break;
        case "change-position":
            console.log(ids);
            for (item of ids) {
                const [id, position] = item.split("-");
                await Product.updateOne({ _id: id }, { position: position })
            }
            req.flash('success', `Thay đổi vị trí thành công ${ids.length} sản phẩm!`);
            break;
        default:
            break;
    }

    res.redirect("back");
}

// DELETE] /admin/products/delelte/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date()
    });
    req.flash('success', 'Xóa thành công sản phẩm!');
    res.redirect("back");
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await ProductCategory.find(find);

    const newRecords = createTree(records);
      
    res.render('admin/pages/products/create.pug', {
        title: "Tạo mới sản phẩm",
        records: newRecords
    })
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position !== "") {
        req.body.position = parseInt(req.body.position);
    } else {
        const positionProducts = await Product.countDocuments();
        req.body.position = positionProducts + 1;
    }

    // if (req.file && req.file.filename) {
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;

    // }

    // tạo mới một object dạng Product
    const product = new Product(req.body);
    // lưu vào DB
    await product.save();

    req.flash('success', `Thêm thành công 1 bản ghi!`);

    res.redirect(`/${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {

    try {
        const id = req.params.id;

        const product = await Product.findOne({
            _id: id,
            deleted: false
        })

        let find = {
            deleted: false
          }
        const records = await ProductCategory.find(find);
    
        const newRecords = createTree(records);

        res.render('admin/pages/products/edit.pug', {
            title: "Chỉnh sửa sản phẩm",
            product: product,
            records: newRecords
        })
    } catch (error) {
        res.send("Không tồn tại đường dẫn này, vui lòng quay lại trang trước!")
    }
}


// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {

    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if (req.file && req.file.filename) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;

    }

    await Product.updateOne({ _id: id }, req.body)

    req.flash('success', `Chỉnh sửa công 1 bản ghi!`);

    res.redirect(`/${systemConfig.prefixAdmin}/products`);
}


// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findOne({
            _id: id,
            deleted: false
        })

        res.render('admin/pages/products/detail.pug', {
            title: "Chi tiết sản phẩm",
            product: product
        })
    } catch (error) {
        res.send("Không tồn tại đường dẫn này, vui lòng quay lại trang trước!")
    }
}





