const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// 导入路由文件
const routes = require('./routes');


// 使用 body-parser 解析 application/x-www-form-urlencoded 编码的数据
app.use(bodyParser.urlencoded({ extended: true }));
// 使用 body-parser 解析 application/json 编码的数据
app.use(bodyParser.json());



// 使用路由
app.use('/ps4', routes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});