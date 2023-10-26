const Product = require("../../models/product.model.js")

module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" });

    const newProduts = products.map(item => {
        item.newPrice = (item.price - (item.price * (item.discountPercentage / 100))).toFixed(2);
        return item;
    });

    res.render("client/pages/products/index.pug", {
        title: "trang danh sách sản phẩm",
        products: newProduts
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

