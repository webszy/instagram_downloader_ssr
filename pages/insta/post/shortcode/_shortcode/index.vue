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
    <section class="singelDown">
      <video-player 
        :title=title 
        :src=video_url 
        :fileName="fileName"
        :postImg=img_url 
        v-if="is_video" 
       />
       <picture-item 
        :title=title 
        :src=img_url 
        :fileName="fileName"
        v-else
        />
       
    </section>
    <s-footer/>
    <loading v-if="showLoading" />
  </div>
</template>



<script>
import sFooter from '@/components/footer'
import pictureItem from '@/components/insta/picture'
import videoPlayer from '@/components/insta/videoPlayer'
import loading from '@/components/loading'
import {fetchSingleMediaByShortcode,getSingleMediaInfo} from '@/utils/request'
import searchBar from '@/components/searchBar'
export default {
name:'DownInsPostByURL',
components:{sFooter,pictureItem,videoPlayer,loading,searchBar},
data(){
  return {
    username:'',
    inputVal:'',
    userPic:require('@/assets/images/imagePlaceholder.png'),
    shortcode:this.$route.params.shortcode || "",
    is_video:false,
    img_url:'',
    video_url:'',
    title:'',
    showLoading:false,
    routerPath:{
        Instagram:'insta'
      }
  }
},
// async asyncData({ store, params }){
//   let shortcode=params.shortcode
//   let data=await fetchSingleMediaByShortcode(shortcode)
//   return {
//     username:data.entry_data.PostPage[0].graphql.shortcode_media.owner.username,
//     userPic:data.entry_data.PostPage[0].graphql.shortcode_media.owner.profile_pic_url,
//     is_video:data.entry_data.PostPage[0].graphql.shortcode_media.is_video,
//     video_url:data.entry_data.PostPage[0].graphql.shortcode_media.video_url||'',
//     img_url:data.entry_data.PostPage[0].graphql.shortcode_media.display_url,
//     title:data.entry_data.PostPage[0].graphql.shortcode_media.title||''
//   }
// },
mounted(){
  this.showLoading=true
  this.$nextTick(()=>{
        this.getMediaInfo()
      })
},
methods:{
  goNextPage(){
     let path='/'+this.routerPath[this.platform]
      if(this.inputVal.startsWith('https:')){
        let shortcode=this.splitURLByPlatform()
        this.$router.push(path+'/post/shortcode/'+shortcode)
      }else{
        this.$router.push(path+'/post/user/'+this.inputVal)
      }
  },
  getMediaInfo(){
    if(this.shortcode==''){
      this.$router.replace('/')
    }
    getSingleMediaInfo(this.shortcode)
    .then(res=>{
      let data=res.data
      this.username=data.entry_data.PostPage[0].graphql.shortcode_media.owner.username,
      this.userPic=data.entry_data.PostPage[0].graphql.shortcode_media.owner.profile_pic_url,
      this.is_video=data.entry_data.PostPage[0].graphql.shortcode_media.is_video,
      this.video_url=data.entry_data.PostPage[0].graphql.shortcode_media.video_url||'',
      this.img_url=data.entry_data.PostPage[0].graphql.shortcode_media.display_url,
      this.title=data.entry_data.PostPage[0].graphql.shortcode_media.title||''
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.showLoading=false
        },1000)
      })
    })
  },
  splitURLByPlatform(){
      //https://www.instagram.com/p/BymN1ovnItK/
      switch (this.platform) {
        case 'Instagram':
          return this.inputVal.split('https://www.instagram.com/p/')[1].split('/')[0]
        default:
          break;
      }
  }
 },
computed:{
  fileName(){
    let str = this.username+'_'+this.shortcode
    if(this.is_video){
      return str+=+'.mp4'
    }else{
      return str+=+'.jpg'
    }
  }
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
.post .singelDown{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 51px;
}
.post .singelDown .video,
.post .singelDown .picture{
  width: 400px;
  height: 400px;
}
.post .singelDown .video .video-js .vjs-big-play-button{
    top: 25%;
}
</style>
