const express = require('express') // câu lệnh nhúng express

require('dotenv').config();


const database = require("./config/database.js");

database.connect();


const app = express() //app được khởi tạo
const port = process.env.PORT

const routeClient = require('./routes/client/index.route.js');
const routeAmin = require('./routes/admin/index.route.js');

app.set('views', './views'); 
app.set('view engine', 'pug');//tham số 1 mặc định là view engine, tham số 2 là tên templatep

app.use(express.static("public"))

routeClient(app);
routeAmin(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
//mở tab:http://localhost:3000/ 