/**
 * Created by Administrator on 2017/6/21.
 */
// 
var DBManager = require("./DBManager");
/*
具体操作数据库的类。DBManagerTool里面包含 具体添加用户，查询用户。。。具体操作
 */
function DBManagerTool() {
    this.init();
}
//init初始化函数里面包含链接数据库，键表
DBManagerTool.prototype.init = function () {
    var config = {
        host     : 'localhost',
        user     : 'root',
        // password : 'secret',
        database : 'near'
    }
    this.dbManager = new DBManager(config);
    function success(result) {

    }
    function error(error) {

    }
    var createUserTableSql = "CREATE TABLE `near`.`users` ( `userid` BIGINT NOT NULL AUTO_INCREMENT , `username` VARCHAR(255) NOT NULL , `phone` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , PRIMARY KEY (`userid`), UNIQUE (`username`), UNIQUE (`phone`)) ENGINE = InnoDB;";
    this.createTable(createUserTableSql).then(success).catch(error);
};
DBManagerTool.prototype.createTable = function (sql) {
   // 返回的是promise
   return this.dbManager.operation(sql)
};
//addUser  添加用户的方法  （执行添加用户的SQL）
//userInfo 客户端传过来的用户信息
//返回值   ---promise
DBManagerTool.prototype.addUser = function (userInfo) {
        var sql = "INSERT INTO `users` (`userid`, `username`, `phone`, `password`) VALUES (NULL, '"+userInfo.username+"', '"+userInfo.phone+"', '"+userInfo.password+"')";
    //
    console.log(sql);
    return this.dbManager.operation(sql);
};
module.exports = DBManagerTool;