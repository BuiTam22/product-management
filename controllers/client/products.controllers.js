const Product = require("../../models/product.model.js")
const ProductCategory = require("../../models/product-category.model.js")
const ProductHelper = require("../../helpers/product");

module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" });

    const newProducts = ProductHelper.priceNewProducts(products);

    res.render("client/pages/products/index.pug", {
        pageTitle: "Trang danh sách sản phẩm",
        products: newProducts
    })
}


// [GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {
    try {
        const slug = req.params.slugProduct;
    
        let product = await Product.findOne({
          slug: slug,
          deleted: false,
          status: "active"
        });

        if(product.product_category_id){
          const category = await ProductCategory.findOne(
            {
              _id: product.product_category_id,
              deleted: false,
              status: "active"
            }
          )
          product.category = category;
        }
        product = ProductHelper.priceNewProduct(product);
    
        const newView = parseInt(product.view) + 1;
     
        if(product.view >=0){
          product.view = newView; 
        }
        
        await Product.updateOne(
          {
            _id: product._id
          },
          {
            view: newView
          }
        );


        res.render("client/pages/products/detail", {
          pageTitle: "Chi tiết sản phẩm",
          product: product
        });
      } catch (error) {
        console.log(error);
        res.redirect("/");
      } 
}

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  const slugCategory = req.params.slugCategory;

  let category = await ProductCategory.findOne(
    {
      slug: slugCategory,
      deleted: false,
      status: "active"
    }
  );
  
  let products = await ProductHelper.pushProductFullCategory(category._id);
  products = ProductHelper.priceNewProducts(products);

  res.render("client/pages/products/index.pug", {
      pageTitle: `Danh sách sản phẩm ${category.title}`,
      products: products
  })
}