const Cart = require("../../models/cart.model.js");
module.exports.add = async (req, res) => {
    const quantity = req.body.quantity;
    const productId = req.params.idProduct;

    const product = {
        product_id: productId,
        quantity: quantity
    };

    const userId = res.locals.user.id;

    const cart = await Cart.findOne({
        user_id: userId,
    })

    if (!cart) {
        const newCart = new Cart();
        newCart.user_id =  userId;
        newCart.products.push(product)
        await newCart.save();
    }else{
        let checkContain = false;
        for(let i=0; i<cart.products.length; i++){
            if(cart.products[i].product_id ==  productId){
                checkContain = true;
                // cập nhật quantity cho bản ghi có user_id và product_id cụ thể
                await Cart.updateOne(
                    { user_id: userId, 'products.product_id': productId },
                    { $set: { 'products.$.quantity': parseInt(cart.products[i].quantity) + parseInt(quantity) } }
                )
                break;
            }
        }
        if(checkContain == false){
            //push product mới vào một user_id
            await Cart.updateOne(
                {user_id: userId},
                {$push:{products: product}}
            )
        }
    }
    req.flash("success", "Thêm thành công sản phẩm vào giỏ hàng");
    res.redirect("back");

}