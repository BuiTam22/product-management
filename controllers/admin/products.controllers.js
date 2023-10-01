const Product = require('../../models/product.model.js');
const filterStatusHelpers = require("../../helpers/filterStatus.js");
const searchHelper = require("../../helpers/search.js");

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
    
    const products = await Product.find(find)
    res.render('admin/pages/products/index.pug',{
        title: "Danh sách sản phẩm",
        products: products,
        filterStatus : filterStatus,
        keyword : objectSearch.keyword
    })

}
