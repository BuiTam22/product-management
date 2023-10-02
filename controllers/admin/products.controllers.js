const Product = require('../../models/product.model.js');
const filterStatusHelpers = require("../../helpers/filterStatus.js");
const searchHelper = require("../../helpers/search.js");
const paginationHelper = require("../../helpers/pagination");
module.exports.products = async (req, res) =>{

    const filterStatus = filterStatusHelpers(req.query);
    let objectSearch = searchHelper(req.query);
    
    let find = {
        deleted: false,
    }
    if(req.query.status){
        find.status = req.query.status;
    }
    if(req.query.keyword){
      find.title = objectSearch.regex;
    }

    // Pagination
    let initPagination = {
        currentPage: 1,
        limitItems: 4
    };

    const countProducts = await Product.count(find);
    const objectPagination = paginationHelper(initPagination, req.query, countProducts);

    const products = await Product.find(find)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    res.render('admin/pages/products/index.pug',{
        title: "Danh sách sản phẩm",
        products: products,
        filterStatus : filterStatus,
        keyword : objectSearch.keyword,
        pagination: objectPagination
    })

}
