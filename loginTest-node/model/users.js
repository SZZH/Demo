const mongoose = require('mongoose');

//创建user的schema
const userSchema = new mongoose.Schema({
    username: {
        type: String, //该字段数据类型为string
        required: true, //当前字段为必填项
        unique: true //该字段值是唯一的
    },
    password: {
        type: String, //该字段数据类型是String
        required: true //当前字段为必填项
    },
    email: {
        type: String, //该字段的数据类型为String
        required: true //当前字段为必填项
    }
})

//创建model对象，（在数据库中创建user的集合）
module.exports = mongoose.model('user', userSchema);