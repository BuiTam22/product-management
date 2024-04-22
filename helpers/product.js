const Product = require("../models/product.model");
const ProductCategory = require("../models/product-category.model");
module.exports.priceNewProducts = (products) =>{
    const newProduct= products.map(item => {
        item.newPrice = (item.price - (item.price * (item.discountPercentage / 100))).toFixed(0);
        return item;
    });
    return newProduct;
}

pushProduct = async (idCategory, products) => {
    const records = await Product.find(
        {
            deleted: false,
            status: "active",
            product_category_id: idCategory
        }
    );

    for(let i=0; i<records.length; i++){
        products.push(records[i]);
    }

    const category = await ProductCategory.find(
        {
            deleted: false,
            status: "active",
            parent_id: idCategory
        }
    );

    if(category.length > 0){
        for(let i=0 ; i<category.length; i++){
           await pushProduct(category[i]._id, products);
        }
    }else{
        return;
    }
}


module.exports.pushProductFullCategory = async (idCategory)=> {
    let products = [];
    await pushProduct(idCategory, products);
    return products;
}
