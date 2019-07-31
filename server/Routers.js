const express = require('express');
const router = express.Router();
const mockData=require('../utils/storymock')
const rp=require('request-promise')
router.get('/', function(req, res, next) {
  res.send(' Priavte Data Provider for Webszy')
});




// websocket for instagram stroy
/*
router.ws('/inscilent',(ws,req)=>{
    ws.send('connect successfully')
    ws.on('message', msg=>{
      if(['127.0.0.1:3000','localhost:3000','http://www.websocket-test.com'].includes(req.headers.origin)){
        let params=JSON.parse(msg)
        if(params.type='story'){
          insCilent.getUserStoryData({username:params.username})
          .then(res=>{
            if(res.status==='ok'){
              ws.send(JSON.stringify(res.data.reels_media))
            }
          })
          .catch(err=>{
              ws.send({msg:err,status:'failed'})
          })
          
        }else{
          ws.send({msg:'Invalid params.',status:'failed'})
        }
        
      }else{
        ws.send({msg:'Invalid request.',status:'failed'})
      }
     
    })
})*/
router.get('/ins/story',(req,res)=>{
  let userId=req.query.userid
  if(['127.0.0.1:3000','localhost:3000'].includes(req.headers.host)){
     //这里写爬虫
    res.json(mockData)
  }else{
    res.json({msg:'Invalid request.',status:'failed'})
  }
})
router.get('/ins/story2',(req,res)=>{
  let userName=req.query.username
  rp.get('https://api.storiesig.com/stories/'+userName,{
    resolveWithFullResponse: true,
    headers:{
      origin:'https://storiesig.com'
    }
  })
  .then(res2=>{
    res.json(JSON.parse(res2.body))
  })
})
// 获取某个帖子的详细信息
/*
router.get('/ins/detail',async (req,res)=>{
  let shortcode=req.query.shortcode
  console.log("TCL: shortcode", shortcode)
  let data= await inScraper.getSingleImageInfo(shortcode)
  res.json(data)
})
*/
module.exports = router;
