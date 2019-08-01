<template>
  <div class='story'>
    <div  v-for="(k,i) in storyMedia" :key=i :class="getItemIndex(i)">
       <video-player 
        v-if="k.media_type==2"
        title=''
        :src=getSrc(k)
        :fileName="getFileName(k)"
        :postImg=k.image_versions2.candidates[0].url
       />
        <picture-item 
        title=''
        :src=k.image_versions2.candidates[0].url
        :fileName="getFileName(k)"
        v-else 
        />
    </div> 
    <div class="empty" v-show="storyMedia.length==0">Nothing of story</div>
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
    type:Array,
    required:true
  }
},
mounted(){
  
},
methods:{
    getFileName(k){
      let username=this.$route.params.name || ''
      return username+'_Story_'+k.taken_at
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
    },
    getSrc(item){
      if(!item.video_versions){
        return ''
      }else{
        return item.video_versions[0].url
      }
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
  object-fit: cover; 
} 
 .story .video-js .vjs-tech{
   height: 50%;
 }

 .story   .video  video[poster]{
    object-fit: contain;
}
 .story  .video  .vjs-poster {
    background-size: contain;
    background-position-y: inherit;
    background-position-x: center;
    background-size: 80% 100%;
}
</style>
