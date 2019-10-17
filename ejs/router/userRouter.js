const express = require('express');
//创建路由器对象
const router = new express.Router();
// 引入userModel
const users = require('../model/user');

//中间件拦截所有请求
router.use((req, res, next) => {
    //正则
    const usernameReg = /^[A-Za-z0-9_]{6,16}$/; //用户名为英文，数字，_组成的6-16位字符
    const passwordReg = /^[A-Za-z0-9_\.]{6,16}$/; //用户名为英文，数字，_,.组成的6-16位字符
    const emailReg = /^[A-Za-z0-9_]{4,10}@[A-Za-z0-9]{2,6}.(com|cn)$/; //邮箱正则

    //获取请求体数据
    const {
        username,
        password,
        email
    } = req.body;
    const cacheMsg = {
        username,
        email
    };
    const msgErr = {};
    //判断用户名是否符合要求
    if (!usernameReg.test(username)) {
        msgErr.usernameErr = '用户名输入不符合规则'
    }
    if (!passwordReg.test(password)) {
        msgErr.passwordErr = '密码输入不符合规则'
    }

    if (req.url === '/register' && !emailReg.test(email)) {
        msgErr.emailErr = '邮箱不符合规则'
    }
    //Object.keys的参数中传入一个对象，返回一个可枚举对象的index组成的数组
    if (Object.keys(msgErr).length > 0) {
        res.render('register', {
            msgErr,
            cacheMsg
        });
        return;
    }
    next();
})
router.post('/register', async (req, res) => {
    //获取请求体
    const {
        username,
        password,
        rePassword,
        email
    } = req.body;

    let msg = {
        username,
        email
    };
    if (await users.findOne({
            username
        })) {
        msg.usernameErr = '该用户已存在';
        // res.send('该用户已存在');
        // return;
    }
    if (!Object.is(password, rePassword)) {
        msg.rePasswordErr = '该用户已存在';

        // res.send('两次密码输入不一致');
        // return;
    }
    if (Object.keys(msg).length)
        users.create({
            username,
            password,
            rePassword,
            email
        }, err => {
            if (err) console.log(err);
            else {
                console.log('数据添加成功');
                res.redirect('http://localhost:8585/login.html');
            }
        })
})
router.post('/login', async (req, res) => {
    //获取请求体数据
    const {
        username,
        password
    } = req.body;
    if (!await users.findOne({
            username,
            password
        })) {
        res.send('用户名和密码不匹配');
        return;
    }
    res.redirect('http://localhost:8585/index.html');
})

module.exports = router;