const Product = require('../../models/product.model.js')
module.exports.products = async (req, res) =>{
    const products = await Product.find({
        deleted: false,
    })
    res.render('admin/pages/products/index.pug',{
        title: "Danh sách sản phẩm",
        products: products
    })
}
