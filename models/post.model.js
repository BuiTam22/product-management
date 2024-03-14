const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const postSchema = new mongoose.Schema(
    {
        title: String,
        post_category_id: {
            type: String,
            default: ""
        },
        description: String,
        thumbnail: String,
        status: String,
        position: Number,
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

const Post = mongoose.model("Post", postSchema, "posts");
module.exports = Post;

