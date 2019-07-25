const express = require('express');
const router = express.Router();
router.get('/', function(req, res, next) {
  res.send(' Priavte Data Provider for Webszy')
});
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

module.exports = router;
