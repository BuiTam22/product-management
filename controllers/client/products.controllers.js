module.exports.index = (req, res) => { 
    res.render("client/pages/products/index.pug", {
        title: "trang products"
    })
}

module.exports.add = (req, res) => { 
    res.send("them san pham");
}

module.exports.edit = (req, res) => { 
    res.send("sua san pham");
}

module.exports.delete = (req, res) => { 
    res.send("xoa san pham");
}