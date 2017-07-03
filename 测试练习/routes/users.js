var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// //第一步
// router.get('/register',function (req,res) {
//   console.log(req.query);
//   var info = req.query;
//   var obj = {};
//   if(info.name =="小明"&&info.pw=="111"){
//     obj.code = 200;
//     obj.message = "登录成功";
//
//   }
//   else {
//     obj.code = 300;
//     obj.message = "登录失败";
//   }
//   //从后台发送到前台
//   res.send(obj);
// });
//post的方式第一步
router.post("/register",function (req,res) {
  console.log(req.body);
  //若果成功会发送到前台
  res.send({
    code:200,
    message:"注册成功"
  })
})

module.exports = router;
