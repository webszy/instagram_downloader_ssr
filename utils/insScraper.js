const rp=require('request-promise')
const useragentFromSeed = require('useragent-from-seed')
const insBaseUrl='https://www.instagram.com/'
const requestOptions = {
    resolveWithFullResponse: true,
    proxy: 'http://127.0.0.1:7890',
    headers: {
        "user-agent": useragentFromSeed(),
        "upgrade-insecure-requests": 1,
        // "authority": "www.kuaidaili.com"
    }
  }
function getShareData(str){
  return JSON.parse(str.match(/(window._sharedData\s?)(=\s?)(.*?);<\/script>/)[3])
}
function getUserBaseInfo(){}

async function getSingleImageInfo(shortcode){
  let url=insBaseUrl+'/p/'+shortcode+'/'
  let res=await rp.get(url,requestOptions)
  return getShareData(res.body)
}




module.exports={
  getUserBaseInfo,
  getSingleImageInfo
}
