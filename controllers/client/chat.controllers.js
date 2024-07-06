const Chat = require("../../models/chats.model");
const Account = require("../../models/accounts.model");

module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;

    //_io.once là chỉ lắng nghe một lần rồi thôi (tránh sau khi load lại trang vẫn còn lắng nghe)
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (content) =>{
            const newChat = new Chat({
                user_id: userId,
                content:content
            });
            await newChat.save();
        })
    })

    const chats = await Chat.find({
        deleted: false
    }).lean();

    for(const chat of chats){
        const infoUser = await Account.findOne({
            _id: chat.user_id
        }).select("fullName")
        chat.infoUser = infoUser;
    }

    res.render("client/pages/chat/index.pug", {
        pageTitle: "Chat",
        chats: chats
    })
}