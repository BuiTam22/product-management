const Product = require("../../models/product.model");
const ProductHelper = require("../../helpers/product");
module.exports.index = async (req, res) => { 
    const productFeatured = await Product.find(
        {deleted: false, featured: "1", status: "active"}
    ).limit(10);
    const newProductFeatured = ProductHelper.priceNewProducts(productFeatured);
    
    const productsNew = await Product.find(
        {deleted: false, status:"active"}
    ).sort({position: "desc"}).limit(10);

    const newProductNew = ProductHelper.priceNewProducts(productsNew);

    const productTopView = await Product.find(
        {deleted: false, status: "active"}
    ).sort({view: "desc"}).limit(10);

    const newProductTopView = ProductHelper.priceNewProducts(productTopView);

    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
        productFeatured: newProductFeatured,
        productNew: newProductNew,
        productTopView: newProductTopView,
    })
}   