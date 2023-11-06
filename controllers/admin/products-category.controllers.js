const ProductCategory = require("../../models/product-category.model.js");

const systemConfig = require("../../config/system.js");

const createTree = require("../../helpers/createTree.js");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = await ProductCategory.find(find);

  const newRecords = createTree(records);

  res.render("admin/pages/products-category/index", {
    title: "Danh mục sản phẩm",
    records: newRecords
  });
}



// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  }
  const records = await ProductCategory.find(find);

  const newRecords = createTree(records);
  
  res.render("admin/pages/products-category/create", {
    title: "Tạo Danh mục sản phẩm",
    records: newRecords
  });
}



// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  if(req.body.position === "") {
    const countRecords = await ProductCategory.countDocuments();
    req.body.position = countRecords + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const record = new ProductCategory(req.body);
  await record.save();

  req.flash('success', `Thêm thành công 1 bản ghi!`);

  res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
};



// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const product = await ProductCategory.findOne({
    _id:id,
    deleted:false
  });
  let find = {
    deleted: false
  }
  const records = await ProductCategory.find(find);

  const newRecords = createTree(records);
  res.render("admin/pages/products-category/edit.pug", {
    title: "Chỉnh sửa danh mục sản phẩm", 
    product: product,
    records: newRecords
  });
}



// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.position = parseInt(req.body.position);

  await ProductCategory.updateOne({_id:id}, req.body);

  req.flash('success', `Chỉnh sửa công 1 bản ghi!`);

  res.redirect(`back`);
}