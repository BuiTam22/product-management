const ProductCategory = require("../../models/product-category.model.js");
const Account = require("../../models/accounts.model.js")
const systemConfig = require("../../config/system.js");

const createTree = require("../../helpers/createTree.js");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = await ProductCategory.find(find);

  for(let i=0; i<records.length; i++){
    if(records[i].createdBy.account_id){
      const idAccount = records[i].createdBy.account_id;
      const accountCreated = await Account.findOne({
        _id: idAccount
      });
      records[i].createdBy.fullName = accountCreated.fullName;
    }
  }
  
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
  if(res.locals.role.permissions.includes("products-category_create")){
    console.log("Cho tạo");
  }else {
    return;
  }

  if(req.body.position === "") {
    const countRecords = await ProductCategory.countDocuments();
    req.body.position = countRecords + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const createdBy = {
    account_id: res.locals.user.id,
    createdAt: new Date()
  };

  const record = new ProductCategory(req.body);
  record.createdBy = createdBy;

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
  if(res.locals.role.permissions.includes("products-category_edit")){
    console.log("Cho sửa");
  }else {
    return;
  }
  const id = req.params.id;

  req.body.position = parseInt(req.body.position);

  await ProductCategory.updateOne({_id:id}, req.body);

  req.flash('success', `Chỉnh sửa công 1 bản ghi!`);

  res.redirect(`back`);
}