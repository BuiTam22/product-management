const Account = require('../../models/accounts.model');
const md5 = require("md5");
const systemConfig = require('../../config/system.js')

// [GET] /auth/login/:status
module.exports.login = async (req, res) =>{ 
    const status = req.params.status;

    res.render('client/pages/auth/login.pug',{
        title: "Đăng nhập",
        statusLogin: status
    })
}

// [POST] /auth/login/
module.exports.loginPost = async (req, res) =>{ 
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await Account.findOne({email:email, deleted: false});
    if(!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    } else{
        if(md5(password) != user.password){
            req.flash("error", "Sai mật khẩu!");
            res.redirect("back");
            return;
        }
    }

    if(user.status == "inactive"){
        req.flash("error", "Tài khoản đang bị khóa!");
        res.redirect("back");
        return;
    }

    // không cho đăng nhập với tài khoản khác tài khoán khách 
    if(user.role_id != "665059a773eb4a02a5b8ae10"){
        req.flash("error", "Tài khoản không hợp lệ!");
        res.redirect("back");
        return;
    }
    // set token cho cookie để không bị out ra khi load lại trang
    res.cookie("token_guest", user.token);

    res.redirect("/");
}

// [GET] /auth/logout/
module.exports.logOut = async (req, res) => {
    res.clearCookie("token_guest");
    res.redirect(`/`);
}


// [POST] /auth/login-url/
module.exports.loginPostUrl = async (req, res) =>{ 
    const email = req.body.email;
    const password = req.body.password;
    const url = req.cookies.currentURL;
    
    const user = await Account.findOne({email:email, deleted: false});
    if(!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    } else{
        if(md5(password) != user.password){
            req.flash("error", "Sai mật khẩu!");
            res.redirect("back");
            return;
        }
    }

    if(user.status == "inactive"){
        req.flash("error", "Tài khoản đang bị khóa!");
        res.redirect("back");
        return;
    }

    // không cho đăng nhập với tài khoản khác tài khoán khách 
    if(user.role_id != "665059a773eb4a02a5b8ae10"){
        req.flash("error", "Tài khoản không hợp lệ!");
        res.redirect("back");
        return;
    }
    // set token cho cookie để không bị out ra khi load lại trang
    res.cookie("token_guest", user.token);

    res.redirect(url);
}