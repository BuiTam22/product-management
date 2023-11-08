const mongoose = require("mongoose");
// hàm random String
const generateHelper = require('../helpers/generate.js');

const accountSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: {
        type:String,
        default: generateHelper.generateRandomString(30)
    },
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  },
  
  {
    timestamps: true
  }
);

const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;