const Product = require("../../models/product.model.js");
const productHelper = require("../../helpers/product.js");
const unidecodeHelper = require("../../helpers/convertUnidecodeToSlug.js");

// [GET] /search/:type
module.exports.index = async (req, res)=>{
    const type = req.params.type;
    const keyWord = req.query.keyword;
    
    let newProducts = [];
    if(keyWord){
        const keyWordRegex = new RegExp(keyWord, 'i');
        const slugUnidecode = unidecodeHelper.convertUnidecodeToSlug(keyWord);
        const slugRegex = new RegExp(slugUnidecode, 'i');
    
        let products = await Product.find({
            $or: [
                {
                    title: keyWordRegex,
                    status: "active",
                    deleted: false
                },
                {
                    slug: slugRegex,
                    status: "active",
                    deleted: false
                }
            ]
        }).lean();
        newProducts = productHelper.priceNewProducts(products);
    }


    switch (type) {
        case "suggest":
            res.json({
                code: 200,
                message: "Lấy thành công sản phẩm",
                products: newProducts
            });
            break;
        case "result":
            res.render("client/pages/search/index",{
                pageTitle: "Kết quả tìm kiếm",
                keyWord: keyWord,
                products: newProducts
            })
            break;
        default:
            break;
    }
}