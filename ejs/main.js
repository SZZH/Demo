//引入express框架，并创建app对象
const express = require('express');
const app = express();
//引入数据库连接层
require('./db');
// 引入userModel
const users = require('./model/user');

//暴露静态页面
app.use(express.static('./public'));
//允许获取请求体内容
app.use(express.urlencoded({
    extended: true
}));

//配置ejs，模板引擎
app.set('view engine','ejs');       //指定使用哪个引擎
app.set('views','./views');     //配置资源目录


//路由
const userRouter = require('./router/userRouter');
app.use(userRouter);

//监听端口
app.listen(8585, err => {
    if (err) console.log(err);
    else console.log('服务器开启成功');
});