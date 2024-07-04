const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
    {
        user_id: String,
        room_chat_id: String,
        content: String,
        images: Array,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    { timestamp: true}
)

const Chat = mongoose.model("Chat", chatSchema, "chats");

module.exports = Chat;