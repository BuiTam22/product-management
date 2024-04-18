const Product = require("../../models/product.model.js")
const ProductHelper = require("../../helpers/product");

module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" });

    const newProducts = ProductHelper.priceNewProducts(products);

    res.render("client/pages/products/index.pug", {
        title: "trang danh sách sản phẩm",
        products: newProducts
    })
}


// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
    try {
        const slug = req.params.slug;
    
        const product = await Product.findOne({
          slug: slug,
          deleted: false,
          status: "active"
        });
    
        res.render("client/pages/products/detail", {
          pageTitle: "Chi tiết sản phẩm",
          product: product
        });
      } catch (error) {
        res.redirect("/");
      } 
}

