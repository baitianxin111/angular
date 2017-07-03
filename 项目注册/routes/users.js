
 
 
module.exports = function (dbManagerTool) {
  var express = require('express');
  var router = express.Router();
  var AliDaYu = require("alidayu-node");
  var ali = new AliDaYu( "24470525","910202b140de6ac29b8fae9f2b5a605b");
  var define = require('../tools/define');
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

//get/post需要传2个参数，第一个参数是路由的地址（自定义的接口的名字）
//第二个参数是回掉的参数，客户端在调用这个接口的时候("/getCode"）就会执行第二个参数（回掉函数中）的代码
//在第二个参数中  有三个形参（request,response,next）
//request, 客户端发送的内容
// response,回应给客户端的内容
// next，自动继续执行
//get  客户端传过来的数据  会放到 requst.query  这个对象中
//post  客户端传过来的数据  会放到 requst.body  这个对象中
  router.get(define.route.getCode,function (request,response,next) {
    if(request.query.phone){
      // 相当于这样写的
      // 短信验证码
      //{
      // code : 200，
// message : "  獲取驗證碼成功"，
// data:{
//   code :"  111111"
// }
      // }  获取6位数以内的验证码,字符串和数字相加，会得到字符串
      var  codeNum = parseInt(Math.random()*1000000)+"";
      if (codeNum.length <6){
        for (var i=0;i<(6 - codeNum.length);){
          codeNum = 0+codeNum;
        }
        console.log(codeNum);

      }
      //短信发送后会有一个回掉函数，
      function smCallback(result) {
        console.log(result);
        result.error_response ? response.send({
          code: define.responseMessage.getCodeFail.code,
          message: result.error_response.sub_msg
        }) : response.send(define.responseMessage.getCodeSuccess);


       
      }
      //alidayu短信发送的,
      ali.smsSend({
        sms_free_sign_name: '我的小秘书', //短信签名，参考这里 http://www.alidayu.com/admin/service/sign
        sms_param: {product:"Near",code:codeNum}, //短信变量，对应短信模板里面的变量
        rec_num:  request.query.phone, //接收短信的手机号
        sms_template_code: 'SMS_71570111' //短信模板，参考这里 http://www.alidayu.com/admin/service/tpl
      },smCallback);

      // define.responseMessage.getCodeSuccess.data = {code: codeNum};
      //   request.send(define.responseMessage.getCodeSuccess);
    }else {
      request.send(define.responseMessage.getCodeFail );
    }

  });
  router.post(define.route.getRegister,function (req,res) {
    if(req.body.username &&req.body.phone&&req.body.password){
      dbManagerTool.addUser(req.body).then(function (result) {
        console.log(result);
          //发送到前台html的数据
          res.send({
            code:2000,
            message:"注册成功",
            data:{
              username:req.body.username,
              phone:req.body.phone,
            //  用户id，通过打印result得到字段
             userid :result.insertId

            }
          });
      }).catch(function () {
        req.send();
      });
    }else {
    //  成功应该请求去发送出去，失败应该回应相对应的错误内容
    res.send(define.responseMessage.getRegisterFail);
    }

  });
  return router;
}
