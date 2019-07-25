const express = require('express');
const router = express.Router();
router.get('/', function(req, res, next) {
  res.send(' Priavte Data Provider for Webszy')
});
router.ws('/cilent',(ws,req)=>{
    ws.send('connect successfully')

    ws.on('message',msg=>{

      ws.send(msg)
    })
})

module.exports = router;
