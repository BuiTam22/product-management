const Product = require("../../models/product.model");
const ProductHelper = require("../../helpers/product");
module.exports.index = async (req, res) => { 
    const productFeatured = await Product.find(
        {deleted: false, featured: "1", status: "active"}
    );
    const newProductFeatured = ProductHelper.priceNewProducts(productFeatured);
    console.log(newProductFeatured)
    res.render("client/pages/home/index.pug", {
        title: "Trang chủ",
        productFeatured: newProductFeatured
    })
}   