const Product = require("../../models/product.model.js")
module.exports.index = async (req, res) => { 
    const products = await Product.find({});

    const newProduts = products.map(item => {
        item.newPrice =     (item.price - (item.price * item.discountPercentage/100)).toFixed(0);
        return item;
    });

    res.render("client/pages/products/index.pug", {
        title: "trang products",
        products: newProduts
    })
}

module.exports.add = (req, res) => { 
    res.send("them san pham");
}

