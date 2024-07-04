module.exports.index = async (req, res) => {
    if (req.cookies.token_guest) {
        _io.on('connection', (socket) => {
            console.log("Có 1 user kết nối", socket.id);
        })
        res.render("client/pages/chat/index.pug", {
            pageTitle: "Chat"
        })
    }else{
        res.redirect("/auth/login/noUrl");
    }
 
}