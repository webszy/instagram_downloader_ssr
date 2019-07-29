<template>
  <div class='story'>
    <div  v-for="(k,i) in storyMedia.items" :key=i :class="getItemIndex(i)">
       <video-player 
        title=''
        :src=k.video_versions[0].url
        :fileName="getFileName(k)"
        :postImg=k.image_versions2.candidates[0].url
       />
    </div> 
    <div class="empty" v-show="storyMedia.items.length==0">Nothing of story</div>
  </div>
</template>


<script>
import pictureItem from './picture'
import videoPlayer from './videoPlayer'
import {getUserStories} from '@/utils/request'
export default {
name:'userStoryGellay',
components:{pictureItem,videoPlayer},
data(){
return {

  }
 },
props:{
  storyMedia:{
    type:Object,
    required:true
  }
},
mounted(){
},
methods:{
    getFileName(k){
      let username=this.$route.params.name || ''
      return username+'_Story_'+k.taken_at_timestamp
    },
    getItemIndex(i){
      let str='item ',
      num=4,
      w=document.body.clientWidth||window.screen.width

      if(w<=1300){
        num=3
      }

      if(i%num===0){
        str+='itemFirst'
      }else if(i%num===(num-1)){
        str+='itemLast'
      }else{
        str+=''
      }
      return str
    }
 },
computed:{
  
}
}
</script>
<style>
.story{
  width: 100%;
  /* margin: 0 auto; */
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0 13.54%;
  padding-top: 52px;
  box-sizing: border-box;
  
}

.story .item{
  width: 300px;
  height: 300px;
  /* margin: auto; */
  margin-right: 3.49%;
  margin-bottom: 60px;
}
.story .itemFirst{
  margin-left:0
}
.story .itemLast{
  margin-right:0
}

/* .postGellay .picture{
  margin-right: 60px;
}
.postGellay .picture:nth-child(3n){
  margin-right:0;
} */
.story .video .video-js .vjs-big-play-button{
  top: 25%;
}
.story .video video{
  object-fit: contain; 
}
</style>
