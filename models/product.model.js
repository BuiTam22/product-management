const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
  {
    title: String,
    product_category_id: {
      type: String,
      default: ""
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    featured:{
      type: String,
      default: "0"
    },
    view:{
      type: Number,
      default: 0
    },
    slug: {
      type: String,
      slug: "title",
      unique: true
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date,
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    },
    deletedBy: {
      account_id: String,
      deletedAt: {
        type: Date,
        // mongoose không chấp nhận default khi cập nhật, chỉ chấp nhận khi tạo mới bản ghi
      }
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: Date
      }
    ]
  }
);

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;