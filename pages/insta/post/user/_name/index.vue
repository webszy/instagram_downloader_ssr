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
      :userMedia="userMedias"
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
  getNextPageData
} from '@/utils/request'
import userPostGellay from '@/components/insta/userPostGellay'
import sFooter from '@/components/footer'
import { mapMutations,mapGetters } from 'vuex'
import loading from '@/components/loading'
import searchBar from '@/components/searchBar'
export default {
  name:'DownInsUserPost',
  components:{userPostGellay,sFooter,loading,searchBar},
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
      }
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
      console.log("TCL: getUserMediaDetail -> res", res)
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
