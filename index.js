const express = require('express'); // câu lệnh nhúng express
const methodOverride = require("method-override");
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session')
require('dotenv').config();


const database = require("./config/database.js");

database.connect();


const app = express() //app được khởi tạo
const port = process.env.PORT

const routeClient = require('./routes/client/index.route.js');
const routeAdmin = require('./routes/admin/index.route.js');

const systemConfig = require("./config/system");

app.set('views', './views'); 
app.set('view engine', 'pug');//tham số 1 mặc định là view engine, tham số 2 là tên templatep

//flash (dùng để back end trả về thông báo)
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//end flash

app.use(express.static("public"))

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// chuyển data từ form thành biến body (req.body)
app.use(bodyParser.urlencoded({ extended: false }))

routeClient(app);
routeAdmin(app);

//variable local (cho toàn bộ chương trình)
app.locals.prefixAdmin = systemConfig.prefixAdmin;
//end variable

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
//mở tab:http://localhost:3000/ 