
import axios from 'axios'
import {getShareData,getQueryHashByScript,getProfilePageContainerURL} from './tools'
export const Service = axios.create({
    timeout: 7000, // 请求超时时间
    method:'get',
    proxy:{
    host: '127.0.0.1',
    port: 7890
  },
  headers:{
    'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
  }
})

const InsBaseProfileURL='https://www.instagram.com/',
InsSearchURL='https://www.instagram.com/web/search/topsearch/?context=blended&query='
Service.interceptors.response.use(
  response => {
      const res = response.data
    
      return res
  },
  error => {
      return Promise.reject(error)
  }
)
export function getUserBaseInfo(username){
  return Service({
    url:InsBaseProfileURL+username+'/'
  })
  .then(res=>{
    let jsFileURL=getProfilePageContainerURL(res)
    return getShareData(res,jsFileURL)
  })
}

export function getQueryHash(requestUrl){
    return Service({
        method: 'get',
        url: requestUrl,
    })
    .then(res=>{
      return  getQueryHashByScript(res,'queryId')
    })
}

export function getNextPageData(userId, end_cursor,queryHash,tagname) {
     let p={
        query_hash:queryHash,
        variables:''
    },variables={}
    if(tagname===undefined){
       variables={
        id:userId,
        first:12,
        after:end_cursor
      }
    }else{
      variables={
        'tag_name':tagname,
        first:6,
        after:end_cursor
      }
    }
   
    p.variables=JSON.stringify(variables)
    return Service({
         url:InsBaseProfileURL+'graphql/query/',
         params:p
    })
}
export function getSingleMediaInfo(shortCode,username){
  return Service({
    url:InsBaseProfileURL+username+'/p/'+shortCode+'/'
  })
  .then(res=>{
    return getShareData(res)
  })
}
export function getHashTagData(tag){
  return Service({
    url:InsBaseProfileURL+'explore/tags/'+ tag +'/',
     headers: {
        'Content-Type': 'text/html;charset=UTF-8'
     }
  })
  .then(res=>{
    let jsFileURL=getProfilePageContainerURL(res,'hashtag')
    return getShareData(res,jsFileURL)
  })
}
export function getInsSearchResult(qs){
  return Service({
    url:InsSearchURL+qs
  })
}
