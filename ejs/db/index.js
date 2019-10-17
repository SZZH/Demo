const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/modelTest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


mongoose.connection.once('open', err => {
    if (err) console.log(err);
    else console.log('数据库连接成功');
})