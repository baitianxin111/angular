/**
 * Created by Administrator on 2017/6/20.
 */
//创建路由对象，需要使用express框架，可以通过Router这个函数，去创建路由模块
var router = require("express").Router();
//"/"是表示的是默认地址
router.get("/",function () {
    console.log("12432546");
});
module.exports = router;