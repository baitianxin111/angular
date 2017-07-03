/**
 * Created by Administrator on 2017/6/21.
 */
//所有API的路由，接口的数据
var define = {
    route:{

    },
    responseMessage:{}
};
//路由的固定格式就是加‘/“
define.route.getCode = "/getCode";
define.route.getUserInfo = "/getUserInfo";
define.route.getRegister = "/getRegister";
define.route.getLogin = "getLogin";
define.route.getRestPassword = "/getRestPassword";
//相应参数
define.responseMessage.dbError ={
    code:3000,
    message:"数据库操作失败"
};
define.responseMessage.getCodeSuccess = {
    code:2000,
    message :"获取验证码成功"
};
define.responseMessage.getCodeFail = {
    code:3010,
    message :"获取验证码失败"
};
define.responseMessage.getRegisterFail = {
    code:3020,
    message :"请传入必传的数据"
}

module.exports = define;