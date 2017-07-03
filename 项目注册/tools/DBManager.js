/**
 * Created by Administrator on 2017/6/21.
 */
//DBManager数据库操作的类
// 里面配置了 数据库的链接
// 设置了数据库断开重连
//dbConfig:数据库配置信息
//可以是字符串 数据库的地址
// 可以是对象
// host
// name
// password
// database

var mysql = require("mysql");
function DBManager(dbconfig) {
  this.connection =   mysql.createConnection (dbconfig);
    this.connection.connect(function (error) {
        if (error){
            //config是connection自带的属性
            this.connection.connect(this.connection.config);
        }
    }.bind(this));
}

// opreation 封装 执行数据库sql语句的方法
// sql：传入需要执行的语句
// 返回值 ->promise
//https://www.npmjs.com/package/mysql
DBManager.prototype.operation = function (sql) {
   
    return new Promise(function (success,fail) {
        //error 执行sql语句失败    result  执行sql语句成功时候的参数
        this.connection.query(sql,function (error,result) {
            //console.log(error);  数据库失败，可以打印错误
            error?fail(error):success(result);
        });

    }.bind(this));
};
module.exports = DBManager;