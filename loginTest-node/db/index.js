const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/loginTest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//给connection对象绑定一次性事件
mongoose.connection.once('open', (err) => {
    if (err) console.log(err);
    else console.log("数据库连接成功");
})