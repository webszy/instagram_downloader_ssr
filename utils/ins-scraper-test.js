const fs=require('fs')
const path=require('path')
const userAgent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
const {IgApiClient}=require('instagram-private-api')

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
test2()

// const mockData=require('./storymock')
// mockData.forEach(item=>{
//   console.log(item.media_type)
// })



