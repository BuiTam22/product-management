const Product = require("../../models/product.model");
const ProductHelper = require("../../helpers/product");
module.exports.index = async (req, res) => { 
    const productFeatured = await Product.find(
        {deleted: false, featured: "1", status: "active"}
    ).limit(10);
    const newProductFeatured = ProductHelper.priceNewProducts(productFeatured);
    
    res.render("client/pages/home/index.pug", {
        title: "Trang chủ",
        productFeatured: newProductFeatured
    })
}   