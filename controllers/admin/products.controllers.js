const Product = require('../../models/product.model.js')
module.exports.products = async (req, res) =>{

    let filterStatus = [
        {
          name: "Tất cả",
          status: "",
          class: ""
        },
        {
          name: "Hoạt động",
          status: "active",
          class: ""
        },
        {
          name: "Dừng hoạt động",
          status: "inactive",
          class: ""
        }
      ];
    
      if(req.query.status) {
        const index = filterStatus.findIndex((item) => {
          return item.status == req.query.status;
        });
    
        filterStatus[index].class = "active";
      } else {
        const index = filterStatus.findIndex((item) => {
          return item.status == "";
        });
    
        filterStatus[index].class = "active";
      }
    

    let find = {
        deleted: false,
    }
    if(req.query.status){
        find.status = req.query.status;
    }

    let keyword = "";

    if(req.query.keyword){
      keyword = req.query.keyword;

      // tìm kiếm tương đối với regex
      const regex = new RegExp(keyword, "i");// theem "i" để không phân biệt hoa thường

      // biến regex khác với chuỗi thông thường
      find.title = regex;
    }

    const products = await Product.find(find)
    res.render('admin/pages/products/index.pug',{
        title: "Danh sách sản phẩm",
        products: products,
        filterStatus : filterStatus,
        keyword : keyword
    })

}
