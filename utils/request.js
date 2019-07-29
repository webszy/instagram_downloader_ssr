
import axios from 'axios'
import {getShareData,getQueryHashByScript,getProfilePageContainerURL} from './tools'
export const Service = axios.create({
    timeout: 7000, // 请求超时时间
    method:'get',
    // proxy:{
    //   host: '127.0.0.1',
    //   port: 7890
    // }
})

const InsBaseProfileURL='https://www.instagram.com/',
InsSearchURL='https://www.instagram.com/web/search/topsearch/?context=blended&query=',
serverBaseURL='http://127.0.0.1:3000/data/ins'
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
export function getSingleMediaInfo(shortCode){
  return Service({
    url:InsBaseProfileURL+'/p/'+shortCode+'/'
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
export function fetchSingleMediaByShortcode(shortCode){
    return Service({
    url:serverBaseURL+'/detail',
    params:{
      shortcode:shortCode
    }
  })
}
// 目前需要登录才能获取到信息，暂时废弃
export function getUserStories(userId){
  let variables={
    reel_ids:[userId+''],
    tag_names:[],
    location_ids:[],
    highlight_reel_ids:[],
    precomposed_overlay:false,
    show_story_viewer_list:true,
    story_viewer_fetch_count:50,
    story_viewer_cursor:"",
    stories_video_dash_manifest:false
  }
  // story的queryhash与之前的不同，由于难以提取，暂时写死
  variables=escape(JSON.stringify(variables))
  
  return Service({
    url:InsBaseProfileURL+'graphql/query/?query_hash=cda12de4f7fd3719c0569ce03589f4c4&variables='+variables,
  })
}
export function getUserStoriesByLogin(userId){
  return Service({
    url:'/data/ins/story',
    params:{
      userId
    }
  })
}
export function getUserStories2(username){
  return Service({
    url:'/data/ins/story2',
    params:{
      username
    }
  })
}
// https://api.storiesig.com/stories/jairajcastejon11
