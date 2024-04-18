const ProductCategory = require("../../models/product-category.model");
const createTree = require("../../helpers/createTree");
module.exports.category = async (req, res, next)=>{
    let records = await ProductCategory.find({deleted: false});
    records = createTree(records);
    
    res.locals.categoryProduct = records;
    next();
}

