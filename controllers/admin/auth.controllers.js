const Account = require('../../models/accounts.model');
const md5 = require("md5");
const systemConfig = require('../../config/system.js')

// [GET] /admin/auth/login
module.exports.login = async (req, res) =>{ 
    res.render('admin/pages/auth/login.pug',{
        title: "Đăng nhập"
    })
}



// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) =>{ 
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await Account.findOne({email:email}, {deleted:false});

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
    
    // set token cho cookie để không bị out ra khi load lại trang
    res.cookie("token", user.token);

    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
}

