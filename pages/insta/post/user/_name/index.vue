<template>
  <div class='post'>
    <section class="top">
      <search-bar></search-bar>
      <section class="user">
        <img :src="userPic" alt="">
        <p>{{username}}</p>
      </section>
      <img class="leftbg" src="@/assets/images/instagram_image@2x.png" >
      <img class="rightbg" src="@/assets/images/instagram_image@2x.png" >
    </section>
    <section class="tab">
      <button :style="componentName==='userPostGellay'?'color:#fff;':'color:#6151AE;'" @click="componentName='userPostGellay'">Posts</button>
      <button :style="componentName==='userStoryGellay'?'color:#fff;':'color:#6151AE;'" @click="componentName='userStoryGellay'">Stories</button>
      <i :style="componentName==='userStoryGellay'?'left:50%;':''" class="tab_bg"></i>
    </section>
    <section>
      <component 
      :is=componentName
      :userMedia=userMedias
      :storyMedia=storyMedia
      ></component>
      <button class="loadMore" @click="loadMoreMedia" v-if="has_next_page">
        <p>Load more</p>
        <i></i>
      </button>
    </section>
    <s-footer/>
    <loading v-if=showLoading />
  </div>
</template>


<script>
import {
  getUserBaseInfo,
  getSingleMediaInfo,
  getQueryHash,
  getNextPageData,
  getUserStories
} from '@/utils/request'
import userPostGellay from '@/components/insta/userPostGellay'
import userStoryGellay from '@/components/insta/userStoryGellay'
import sFooter from '@/components/footer'
import { mapMutations,mapGetters } from 'vuex'
import loading from '@/components/loading'
import searchBar from '@/components/searchBar'
export default {
  name:'DownInsUserPost',
  components:{userPostGellay,sFooter,loading,searchBar,userStoryGellay},
  data(){
  return {
    username:this.$route.params.name || "NULL",
    userPic:require('@/assets/images/imagePlaceholder.png'),
    inputVal:'',
    componentName:'userPostGellay',
    userMedias:[],
    end_cursor:'',
    has_next_page:false,
    jsFileURL:'',
    userId:'',
    showLoading:false,
     routerPath:{
        Instagram:'insta'
      },
      storyMedia:[]
    }
  },
  async fetch({ store, params }){
    // let {data}= await getUserBaseInfo(params.name)
    // return store.commit('setProfile',data)
    
 },
  mounted(){
    this.showLoading=true
    this.$nextTick(()=>{
      this.getUserProfile()
    })
  },
  methods:{
    ...mapMutations(['setProfile']),
    goNextPage(){},
    getUserProfile(){
      getUserBaseInfo(this.username)
      .then(res=>{
        console.log("TCL: getUserProfile -> res", res)
        let data=res.data.entry_data.ProfilePage[0].graphql.user,userMedias=[]
        this.userPic=data.profile_pic_url
        this.end_cursor=data.edge_owner_to_timeline_media.page_info.end_cursor
        this.has_next_page=data.edge_owner_to_timeline_media.page_info.has_next_page
        this.userId=data.id
        this.jsFileURL=res.jsFileURL
        for(let k of data.edge_owner_to_timeline_media.edges){
          if(!k.node.title){k.node.title=''}
          userMedias.push(k.node)
        }
        return this.getUserMediaDetail(userMedias) 
      })
    },
    getUserMediaDetail(arr,type){
      let ajaxArr=[],len=arr.length
      for(let k of arr){
        let p=getSingleMediaInfo(k.shortcode)
        ajaxArr.push(p) 
      }

      Promise.all(ajaxArr)
      .then(res=>{
        for(let k of res){
          let item=k.data.entry_data.PostPage[0].graphql.shortcode_media
          for(let i=0;i<len;i++){
            let userMediaItem=arr[i]
            if(userMediaItem.shortcode===item.shortcode){
              if(userMediaItem.is_video){
                userMediaItem.video_url=item.video_url
              }
              userMediaItem.title=item.title||''
              break
            }
          }
        }
      })
      .finally(()=>{
        
        if(type==='concat'){
          this.userMedias=this.userMedias.concat(arr)
        }else{
          this.userMedias=arr
        }
        this.getUserStoryData()
        
      })
    },
    getUserStoryData(){
      getUserStories(this.userId)
      .then(res=>{
        console.log("TCL: getUserStoryData -> res", res)
        if(res.status==='ok'&&res.data.reels_media.length>0){
          
        }else{
          let data={"data":{"reels_media":[{"__typename":"GraphReel","id":"6053753132","latest_reel_media":1564355577,"can_reply":true,"owner":{"__typename":"GraphUser","id":"6053753132","profile_pic_url":"https://scontent-hkg3-2.cdninstagram.com/vp/2ab322846ba4df5e2c363fd7373bf196/5DCFC972/t51.2885-19/s150x150/67119307_1379861028837693_3260113815294967808_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com","username":"jairajcastejon11","followed_by_viewer":false,"requested_by_viewer":false},"can_reshare":true,"expiring_at":1564441977,"has_besties_media":null,"has_pride_media":false,"seen":1564355577,"user":{"id":"6053753132","profile_pic_url":"https://scontent-hkg3-2.cdninstagram.com/vp/2ab322846ba4df5e2c363fd7373bf196/5DCFC972/t51.2885-19/s150x150/67119307_1379861028837693_3260113815294967808_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com","username":"jairajcastejon11","followed_by_viewer":false,"requested_by_viewer":false},"items":[{"audience":"MediaAudience.DEFAULT","edge_story_media_viewers":{"count":0,"page_info":{"has_next_page":false,"end_cursor":null},"edges":[]},"__typename":"GraphStoryVideo","id":"2098288518418462782","dimensions":{"height":1333,"width":750},"display_resources":[{"src":"https://scontent-hkg3-2.cdninstagram.com/vp/791ef9885f75133719af7c4fe6a98e06/5D4137BD/t51.12442-15/sh0.08/e35/p640x640/66003432_357358371848834_4182370512095373880_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com","config_width":640,"config_height":1137},{"src":"https://scontent-hkg3-2.cdninstagram.com/vp/070cac0dc78f2d79b1182337c1221894/5D415DDA/t51.12442-15/e35/66003432_357358371848834_4182370512095373880_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com","config_width":750,"config_height":1333},{"src":"https://scontent-hkg3-2.cdninstagram.com/vp/070cac0dc78f2d79b1182337c1221894/5D415DDA/t51.12442-15/e35/66003432_357358371848834_4182370512095373880_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com","config_width":1080,"config_height":1920}],"display_url":"https://scontent-hkg3-2.cdninstagram.com/vp/070cac0dc78f2d79b1182337c1221894/5D415DDA/t51.12442-15/e35/66003432_357358371848834_4182370512095373880_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com","media_preview":"ABcqo5zUqQu4yoJArVDIF2gDb6VA8ojXaOg6VHMdUaLbsZpyDg8EUUk0m9s98UVSd9TCceSTj2HxTfLkkZHbvTXm3Dj/AD+FVIlkfOwE464pHhmzwpqeVG0a8kmnr59UKSe/WimMrpw42k+tFUcxCHI6HFG8+p/Oo6KBDyxPXmimUUAf/9k=","gating_info":null,"taken_at_timestamp":1564355527,"expiring_at_timestamp":1564441927,"story_cta_url":null,"story_view_count":null,"is_video":true,"owner":{"id":"6053753132","profile_pic_url":"https://scontent-hkg3-2.cdninstagram.com/vp/2ab322846ba4df5e2c363fd7373bf196/5DCFC972/t51.2885-19/s150x150/67119307_1379861028837693_3260113815294967808_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com","username":"jairajcastejon11","followed_by_viewer":false,"requested_by_viewer":false},"should_log_client_event":false,"tracking_token":"eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiNDc5Y2U2Nzg0NjI0NDEwYmFhNjhjZjE1MDY0ZjUzMzcyMDk4Mjg4NTE4NDE4NDYyNzgyIiwic2VydmVyX3Rva2VuIjoiMTU2NDM4NDA0MjkyOHwyMDk4Mjg4NTE4NDE4NDYyNzgyfDk1MjE3MzQ0MTh8YzUzMTQyNjgwNmU1YTQ5MjA0Njc0OWY0NDU0M2YxMzdlZGNjZmE3ZDU1N2MzODY0YzJiMzBlMzZjZWFjOWM4MCJ9LCJzaWduYXR1cmUiOiIifQ==","has_audio":true,"overlay_image_resources":null,"video_duration":11.2,"video_resources":[{"src":"https://scontent-hkg3-2.cdninstagram.com/vp/b68155a46a0484cb0b9af955fe42293e/5D411E9F/t50.12441-16/68270363_2738445159516072_4958162133228951758_n.mp4?_nc_ht=scontent-hkg3-2.cdninstagram.com","config_width":480,"config_height":853,"mime_type":"video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"","profile":"BASELINE"}],"tappable_objects":[{"__typename":"GraphTappableMention","x":0.5037037,"y":0.7495254,"width":0.6722222,"height":0.0703125,"rotation":0.0,"custom_title":null,"attribution":null,"username":"qlossy.anqel","full_name":"*\uff59\uff2f\uff55\uff32 \uff4d \uff2f \uff4d*","is_private":false}],"story_app_attribution":null},{"audience":"MediaAudience.DEFAULT","edge_story_media_viewers":{"count":0,"page_info":{"has_next_page":false,"end_cursor":null},"edges":[]},"__typename":"GraphStoryVideo","id":"2098288739257074393","dimensions":{"height":1333,"width":750},"display_resources":[{"src":"https://scontent-hkg3-2.cdninstagram.com/vp/f4df9ac3f9efeece985eeded86537078/5D415D8A/t51.12442-15/sh0.08/e35/p640x640/66084920_132391008005919_6361133724632229232_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com","config_width":640,"config_height":1137},{"src":"https://scontent-hkg3-2.cdninstagram.com/vp/ee6f94f4ef1b6f749605e0e5ad514fa3/5D41566D/t51.12442-15/e35/66084920_132391008005919_6361133724632229232_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com","config_width":750,"config_height":1333},{"src":"https://scontent-hkg3-2.cdninstagram.com/vp/ee6f94f4ef1b6f749605e0e5ad514fa3/5D41566D/t51.12442-15/e35/66084920_132391008005919_6361133724632229232_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com","config_width":1080,"config_height":1920}],"display_url":"https://scontent-hkg3-2.cdninstagram.com/vp/ee6f94f4ef1b6f749605e0e5ad514fa3/5D41566D/t51.12442-15/e35/66084920_132391008005919_6361133724632229232_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com","media_preview":"ABcqmgfz1RvvEZBwOD/gP5+lYd3MxlYHjBIAHQYq1Dfm2UpEAQx4Ldv8f88Vm3EhlcuerHnFTrcDRRvlH0FFRIflH0FFMCvLNu+6Aq9gP6mmKgc9cCmmNiM44q0thcAHCHkeo/xofkFmxM44HaintazRrudSAOp4ooGU/MOMZ4rVtNTCLsm6KPlIGSfrk1i0UAm1sad5f+f8i8J1z0J+vPTPSisyigG76s//2Q==","gating_info":null,"taken_at_timestamp":1564355577,"expiring_at_timestamp":1564441977,"story_cta_url":null,"story_view_count":null,"is_video":true,"owner":{"id":"6053753132","profile_pic_url":"https://scontent-hkg3-2.cdninstagram.com/vp/2ab322846ba4df5e2c363fd7373bf196/5DCFC972/t51.2885-19/s150x150/67119307_1379861028837693_3260113815294967808_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com","username":"jairajcastejon11","followed_by_viewer":false,"requested_by_viewer":false},"should_log_client_event":false,"tracking_token":"eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiNDc5Y2U2Nzg0NjI0NDEwYmFhNjhjZjE1MDY0ZjUzMzcyMDk4Mjg4NzM5MjU3MDc0MzkzIiwic2VydmVyX3Rva2VuIjoiMTU2NDM4NDA0MjkyOHwyMDk4Mjg4NzM5MjU3MDc0MzkzfDk1MjE3MzQ0MTh8ZmRkMTg1MmI0NzEwYzJiZmUxOWRhZmJmYWRmY2Q0MTY4MDZkZmMzNDM2OGEzNzk3OThhZTAxMmM0MWVhMWJkZCJ9LCJzaWduYXR1cmUiOiIifQ==","has_audio":false,"overlay_image_resources":null,"video_duration":13.233,"video_resources":[{"src":"https://scontent-hkg3-2.cdninstagram.com/vp/d6c9e955edce1d72456a6507c19436f5/5D41020B/t50.12441-16/68293152_439304289991613_6996552050524448590_n.mp4?_nc_ht=scontent-hkg3-2.cdninstagram.com","config_width":480,"config_height":853,"mime_type":"video/mp4; codecs=\"avc1.42E01E\"","profile":"BASELINE"}],"tappable_objects":[],"story_app_attribution":null}]}]},"status":"ok"}
          this.storyMedia=data.data.reels_media[0]
        }
        
         this.$nextTick(()=>{
         this.showLoading=false
        })
      })
      .catch(err=>{
        console.log('err',err)
         this.$nextTick(()=>{
         this.showLoading=false
        })
      })
    },
    loadMoreMedia(){
      if(this.componentName==='userPostGellay'){
        return this.loadMorePost()
      }else{
        this.loadMoreStory()
      }
    },
    loadMorePost(){
      if(this.has_next_page){
        this.showLoading=true
        getQueryHash(this.jsFileURL)
        .then(res=>{
          return getNextPageData(this.userId,this.end_cursor,res[2])
        })
        .then(res=>{
        console.log("TCL: loadMorePost -> res", res)
          if(res.status==='ok'){
            let data=res.data.user.edge_owner_to_timeline_media,arr=[]
            this.end_cursor=data.page_info.end_cursor
            this.has_next_page=data.page_info.has_next_page
            for(let k of data.edges){
              arr.push(k.node)
            }
            return this.getUserMediaDetail(arr,'concat')
          }
        })
      }
    },
    loadMoreStory(){}
  },
  computed:{
    ...mapGetters(['profile'])
  }
}
</script>
<style>
.post{
  width: 100%;
  height: 100%;
}
.post .top{
  width: 100%;
  height: 600px;
  background-color: #6151ae;
  border-radius: 60%/60% 50%;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  box-sizing: border-box;
  padding-top: 80px;
  /* transform: rotateZ(180deg); */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden; 
  position: relative;
}
.post .el-input{
  width: 41.67%;
  height: 100px;
  position: relative;
  display: flex;
  justify-content: center;
}
.post .el-input input{
 width: 100%;
  height: 100%;
  border-radius: 68px;
  padding-left: 42px;
  box-sizing: border-box;
  font-size: 24px;
  font-family: Arial, Helvetica, sans-serif;
  color:#AEAEAE;
}

.post .el-input input::placeholder{
  color:#CFCFCF !important;
  font-size: 24px;
  opacity: 1;
  padding: 1px;
  line-height: 200%;
}
.post .el-input  .el-input__suffix{
  display: block;
  width:22.75%;
  height:85%;
  position: absolute;
  right: 9px;
  top:50%;
}
.post .el-input  .el-input__suffix-inner{
  display: block;
  width: 100%;
  height: 100%;
}
.post .search{
  display: block;
  width: 100%;
  height: 100%;
  transform: translateY(-50%);
  background:linear-gradient(360deg,#EB6A81 0%,#FFC640 100%);
  border-radius:68px;
  font-size:36px;
  font-family: 'Lalezar', cursive;
  font-weight:400;
  color:#fff;
}
.post .top .leftbg,
.post .top .rightbg{
  display: block;
  width: 380px;
  height: 380px;
  position: absolute;
  left:80px;
  bottom: -10px;
  transform: rotateZ(5deg);
}
.post .top .rightbg{
  right: 80px;
  bottom: 12px;
  left: auto;
  transform:rotateY(180deg) rotateZ(264deg);
}
.post .user{
  margin-top: 40px;
}
.post .user img{
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border:6px solid #fff;
  margin-bottom: 24px;
}
.post .user p{
font-size:36px;
font-family: 'Lalezar', cursive;
font-weight:400;
color:#fff;
line-height:56px;
text-align: center;
}
.post .tab{
  width: 260px;
  height: 64px;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius:32px;
  border:2px solid #6151AE;
  margin: 0 auto;
  margin-top: 51px;
  z-index: 1;
  overflow: hidden;
}
.post .tab button{
  width: 50%;
  height: 100%;
  font-size:24px;
  font-family: 'Lalezar', cursive;
  font-weight:400;
  color:#fff;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.post .tab i{
  width: 50%;
  height: 100%;
  position: absolute;
  left:-1px;
  top:0;
  background:#6151AE;
  z-index: 0; 
  transition: all .3s ease-in-out;
}
.post .loadMore{
  width:280px;
  height:85px;
  background:rgba(97,81,174,1);
  border-radius:68px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 388px;
}
.post .loadMore p{
  width:159px;
  height:27px;
  font-size:24px;
  font-family:Arial, Helvetica, sans-serif;
  font-weight:normal;
  color:#fff;
  margin-right: 14px;

}
.post .loadMore i{
  display: block;
  width:38px;
  height:38px;
  background: url('../../../../../assets/images/loading_more.png') no-repeat left top;
  background-size: cover;
}
</style>
