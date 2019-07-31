const cheerio = require("cheerio") //nodejs版本的JQuery，用以解析返回的html字符串
const rp = require('request-promise') //发送请求的工具，基于promise封装的request
const fs=require('fs')
const path=require('path')
const userAgent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
const {IgApiClient}=require('instagram-private-api')
// const requestOptions = {
//     resolveWithFullResponse: true,
//     proxy: 'http://127.0.0.1:7890',
//     headers: {
//         "user-agent": userAgent,
//         "upgrade-insecure-requests": 1,
//         "referer": "https://www.instagram.com/stories/jairajcastejon11/"
//         // "authority": "www.kuaidaili.com"
//     }
//   }
// const Instagram =require('./instagram-web-api')
// https://www.instagram.com/stories/highlights/17907400474216512/

 function getShareData(str){
    return JSON.parse(str.match(/(window._sharedData\s?)(=\s?)(.*?);<\/script>/)[3])
}


async function test2(){
  const ig = new IgApiClient();
  ig.state.generateDevice('opgpstypd');
  ig.state.proxyUrl = 'http://127.0.0.1:7890'
  await ig.simulate.preLoginFlow();
  const auth = await ig.account.login('opgpstypd', '147258')
  const targetUser = await ig.user.searchExact('ayattachiante')
  const reelsFeed = ig.feed.reelsMedia({ // working with reels media feed (stories feed)
    userIds: [targetUser.pk], // you can specify multiple user id's, "pk" param is user id
  });
  const storyItems = await reelsFeed.items();
  console.log("TCL: reelsFeed", reelsFeed)
  console.log("-----------------------------------------")
  console.log("TCL: reelsFeed",JSON.stringify(storyItems))
}

// async function getStoryWithoutLogin(){
//   let variables={
//     "reel_ids":["6053753132"],
//     "tag_names":[],
//     "location_ids":[],
//     "highlight_reel_ids":[],
//     "precomposed_overlay":false,
//     "show_story_viewer_list":true,
//     "story_viewer_fetch_count":50,
//     "story_viewer_cursor":"",
//     "stories_video_dash_manifest":false
//   }
//   let url='https://www.instagram.com/graphql/query/?query_hash=cda12de4f7fd3719c0569ce03589f4c4&variables='+escape(JSON.stringify(variables))
//   let res =await rp.get(url,requestOptions)
//   console.log("TCL: getStoryWithoutLogin -> res", res.body)
// }



// getStoryWithoutLogin()
  /*
    async function getFollowers(){
      let res= await rp.get('https://www.instagram.com/ddbo119/',requestOptions)
      let baseData=getShareData(res.body),token=baseData.config.csrf_token
      // console.log("TCL: getFollowers -> baseData", baseData)
      const jar = rp.jar()
      jar.setCookie(rp.cookie(`csrftoken=${token}`), 'https://www.instagram.com')
      requestOptions.jar = jar

      res=await rp.get('https://www.instagram.com/stories/highlights/17907400474216512/',requestOptions)
      console.log(res.body)
    }
    getFollowers()
  */

const mockData=require('./storymock')
mockData.forEach(item=>{
  console.log(item.media_type)
})



