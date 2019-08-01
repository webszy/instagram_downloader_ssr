const express = require('express');
const router = express.Router();
const {IgApiClient}=require('instagram-private-api')

/* create a insCilent then login by a defualt username*/ 
let insCilent
const createInsCilent= async(username,password) =>{
  insCilent=null
  insCilent = new IgApiClient();
  insCilent.state.generateDevice(username);
  if(process.env.NODE_ENV==='development'){
    insCilent.state.proxyUrl = 'http://127.0.0.1:7890'
  }
  await insCilent.simulate.preLoginFlow();
  const auth = await insCilent.account.login(username, password)
}
createInsCilent('opgpstypd', '147258')
// 获取await错误信息

/* routers */
router.get('/', function(req, res, next) {
  res.send(' Priavte Data Provider for Webszy')
});

router.get('/ins/story',async(req,res)=>{
  let userId=req.query.userId
  if(['127.0.0.1:3000','localhost:3000'].includes(req.headers.host)){
    //这里写爬虫
    try {
      let reelsFeed = await insCilent.feed.reelsMedia({ // working with reels media feed (stories feed)
        userIds: [userId], // you can specify multiple user id's, "pk" param is user id
      })
      let storyItems = await reelsFeed.items();
      res.json(storyItems)
    } catch (err) {
      console.log("TCL: err", err)
      res.json([])
    }  
  }else{
    res.json({msg:'Invalid request.',status:'failed'})
  }
})
router.put('/ins/changeUser',(req,res)=>{
   let username=req.query.username,
       password=req.query.password,
       key=req.query.key
    if(key!=='gpower'||username===undefined||password===undefined){
      res.json({
        err:'Invalid Parameters'
      })
    }else{
      let msg,err
      try {
        createInsCilent(username,password)
        msg='ok'
        err=''
      } catch (error) {
        msg='failed'
        err=error
      }
      res.json({msg,err})
    }
})
// router.get('/ins/story2',(req,res)=>{
//   let userName=req.query.username
//   rp.get('https://api.storiesig.com/stories/'+userName,{
//     resolveWithFullResponse: true,
//     headers:{
//       origin:'https://storiesig.com'
//     }
//   })
//   .then(res2=>{
//     res.json(JSON.parse(res2.body))
//   })
// })

module.exports = router;
