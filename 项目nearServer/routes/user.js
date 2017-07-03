/**
 * Created by Administrator on 2017/6/20.
 */
var router = require("express").Router();

 
//用户注册的接口user路由下的register页面，单个的“/”是默认的地址
// router.get("/register",function (req,res) {
//     console.log(req.query);
//     if (req.query.name&& req.query.pw){
//         // console.log("register success");
//         res.send({
//             code :200,
//             message:"注册成功！"
//
//         })
//     }
// });
// router.get("/login",function (req,res) {
//     var info = req.query;
//     var obj =  {};
//     if (info.name == "小亮" &&info.pw =="111"){
//         obj.code =200;
//         obj.message = "登录成功";
//     }else {
//         obj.code = 300;
//         obj.message = "登录失败";
//     }
//     res.send(obj);
// });
router.post("/register",function (req,res) {
    console.log(req);
    // res.send({
    //     code:200,
    //     message:"注册成功"
    // });
});
module.exports = router;