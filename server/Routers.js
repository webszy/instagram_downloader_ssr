const express = require('express');
const router = express.Router();
const inScraper=require('../utils/insScraper')
router.get('/', function(req, res, next) {
  res.send(' Priavte Data Provider for Webszy')

});
// websocket for instagram stroy
router.ws('/cilent',(ws,req)=>{
    ws.send('connect successfully')
    
    ws.on('message',msg=>{
      if(['127.0.0.1:3000','localhost:3000','http://www.websocket-test.com'].includes(req.headers.origin)){
         ws.send(msg)
         console.log(ws)
      }else{
        ws.send('Invalid request.')
      }
     
    })
})
// 获取某个帖子的详细信息
router.get('/ins/detail',async (req,res)=>{
  let shortcode=req.query.shortcode
  console.log("TCL: shortcode", shortcode)
  let data= await inScraper.getSingleImageInfo(shortcode)
  res.json(data)
})
module.exports = router;
