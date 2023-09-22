const Product = require("../../models/product.model.js")
module.exports.index = async (req, res) => { 
    const products = await Product.find({
        status: "active",
        deleted: false
    });

    const newProduts = products.map(item => {
        item.newPrice =     (item.price - (item.price * item.discountPercentage/100)).toFixed(0);
        return item;
    });

    res.render("client/pages/products/index.pug", {
        title: "trang danh sách sản phẩm",
        products: newProduts
    })
}

