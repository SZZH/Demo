const mongoose = require('mongoose');
const express = require('express');

const app = express();
//引用数据库连接，若当前文件夹下的js文件名字为index可以省略名称
require('./db');
//引入user的model
const users = require('./model/users');

//内置中间件，express.static，用来暴露某个文件夹下的全部文件
app.use(express.static('./public'))
//允许解析请求体的参数，（允许解析post请求的参数）
app.use(express.urlencoded({
    extended: true
}));

//应用中间件
app.use((req, res, next) => {
    //正则
    const usernameReg = /^\w{6,16}$/;
    const passwordReg = /^\w{6,16}$/;
    const emailReg = /^\w{4,12}@\w{2,6}\.(com|cn)$/;

    const {
        username,
        password,
        email
    } = req.body;

    //正则判断
    if (!usernameReg.test(username)) {
        res.send('账号为字母数字下划线组成的6-16位数字');
        return;
    }
    if (!passwordReg.test(password)) {
        res.send('密码为字母数字下划线组成的6-16位数字');
        return;
    }
    if (req.url === 'register' && !emailReg.test(email)) {
        res.send('邮箱格式错误');
        return;
    }

    next();
})

// 配置路由,/register
app.post('/register', async (req, res) => {
    const {
        username,
        password,
        rePassword,
        email
    } = req.body;
    //对比两次密码
    if (!Object.is(password, rePassword)) {
        res.send('两次密码不一致');
        return;
    }
    //判断当前用户是否已经存在
    if (await users.findOne({
            username
        })) {
        res.send('该用户名已存在');
        return;
    }
    // 添加数据
    if (await users.create({
            username,
            password,
            email
        })) {
        res.redirect('http://localhost:7878/login.html');
        console.log('数据添加成功');
    }
});

//配置路由,/login
app.post('/login', async (req, res) => {
    const {
        username,
        password
    } = req.body;
    if (!await users.findOne({
            username,
            password
        })) {
        res.send('用户名密码不匹配');
        return;
    }
    res.redirect('http://localhost:7878/index.html');
})

app.listen(7878, (err) => {
    if (err) console.log(err);
    else console.log("服务器启动成功");
})