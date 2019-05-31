const express = require('express');
const bodyParser = require('body-parser');// 处理前端post过来的数据
// const session = require('express-session');
// const flash = require('connect-flash');
const serveStatic = require('serve-static');
const path = require('path');
// const MongoStore = require('connect-mongo')(session);
// const methodOverride = require('method-override');
const router = require('./serve/api');

const app = express();

app.use(serveStatic(path.join(__dirname,'dist')));

app.use(bodyParser.json());
//解析 x-www-form-urlencoded,extended为false时数据为String或Array,true则是所有数据
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

// session & flash middleware
// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//     secret: 'helloWorld',
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         secure: true,
//         maxAge: 2592000000
//     },
//     store: new MongoStore({
//         url: 'mongodb://localhost/helloWorld'
//     })
// }));

// app.use(flash());

//method-override middleware,编辑需要用pull，form只有get和post，解决使用中间件
// app.use(methodOverride('_method'))

// app.get('*', function (req, res) {
//     const html = fs.readFileSync(resolve('./' + 'index.html'), 'utf-8')
//     res.send(html)
// })

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`
    Serve is running~
    network: localhost:${port}`)
})