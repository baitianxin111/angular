var express = require('express');
//应用
// var define = require('./tools/define');
//引入大于

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/*
为什么app在中创建dbManagerTool
在很多模块中，都可能使用到dbManagerTool这个对象
每次都创建一个dbManagerTool这个对象，这个对象就会重复 链接数据库，键表
没有必要   重复 链接数据库，键表
就需要找一个可以分发给各个模块dbManagerTool的一个地方
各个模块 都需要在app里面创建dbManagerTool分发给各个模块
分发的时候可以使用函数去吧  dbManagerTool 传到各个模块
各个模块都是一个函数
如：module.exports = function(tool){}
require('./routes/users')(dbManagerTool),可以调用函数的时候 把dbManagerTool传过去

 */
//引入模块,新建对象，这样他的初始化就只创建一次了
var DBManagerTool = require("./tools/DBManagerTool");
var dbManagerTool = new DBManagerTool();

var index = require('./routes/index');
var users = require('./routes/users')(dbManagerTool);

var app = express();
app.all("*",function (req,res,next) {

  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");

  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
