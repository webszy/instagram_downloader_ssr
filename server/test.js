// 主要用来测试通过接口刷新内置insCilent的账户密码，实现更换账号登录
const express = require('express');
const router = express.Router();
class cilent{
  constructor({username,password}){

    this.username=username
    this.password=password
    this.login()
  }
  login(){
    console.log("TCL: cilent -> Login -> password", this.password)
    console.log("TCL: cilent -> Login -> username", this.username)  
  }
  user(){
    console.log("TCL: cilent -> user -> password", this.password)
    console.log("TCL: cilent -> user -> username", this.username)  
  }
}

router.get('/', function(req, res, next) {
  res.send(' Priavte Data Provider for Webszy test Model')
});
const createCilent= (username,password)=>{
  global.Cilent=null
  global.Cilent=new cilent({
    username:username,
    password:password
  })
}
createCilent('szy','123')

router.get('/text', function(req, res, next) {
  global.Cilent.user()
});
router.get('/changUser', function(req, res, next) {
  let name=req.query.username,
      pass=req.query.password
  // 如何通过一个接口重新new client，变更参数
  let msg,err
  try {
    createCilent(name,pass)
    msg='ok'
    err=''
  } catch (error) {
    msg='failed'
    err=error
  }
  global.Cilent.user()
  res.json({msg,err})
});
module.exports=router
