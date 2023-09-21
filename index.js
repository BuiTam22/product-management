const express = require('express') // câu lệnh nhúng express

require('dotenv').config();
console.log(process.env);

const app = express() //app được khởi tạo
const port = process.env.PORT

const route = require('./routes/client/index.route.js');

app.set('views', './views'); 
app.set('view engine', 'pug');//tham số 1 mặc định là view engine, tham số 2 là tên templatep

app.use(express.static("public"))

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
//mở tab:http://localhost:3000/ 