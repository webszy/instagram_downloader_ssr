<template>
  <div class='story' :style="getBoxWidth">
    <div v-if=storyMedia.length class="storyBox" :style="getBoxWidth">
      <div  v-for="(k,i) in storyMedia" :key=i :class="getItemIndex(i)">
        <video-player 
          v-if="k.media_type==2"
          title=''
          :src=getVideoSrc(k)
          :fileName="getFileName(k)"
          :postImg=k.image_versions2.candidates[0].url
        />
          <picture-item 
          title=''
          :src=getImgSrc(k)
          :fileName="getFileName(k)"
          v-else 
          />
      </div> 
    </div>
    <div class="empty" v-else>the story is empty</div>
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
  lineNum:4
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
      w=document.body.clientWidth||window.screen.width
      if(w<=1300){
        this.lineNum=3
      }

      if(i%this.lineNum===0){
        str+='itemFirst'
      }else if(i%this.lineNum===this.lineNum-1){
        str+='itemLast'
      }else{
        str+=''
      }      
      return str
    },
    getVideoSrc(item){
      if(!item.video_versions){
        return ''
      }else{
        return item.video_versions[0].url
      }
    },
    getImgSrc(item){
      if(!item.image_versions2){
        return ''
      }else{
        return item.image_versions2.candidates[0].url
      }
    }
 },
computed:{
  getBoxWidth(){
    let width
    if(this.lineNum===3){
      width = (3*240+2*30)
    }else{
      width = (4*300+3*30)
    }
    return `width:${width}px`
  }
}
}
</script>
<style>
.story{
  margin: 0 auto;
  /* padding: 0 13.54%; */
  padding-top: 52px;
  box-sizing: border-box;
  
}
.story .storyBox{
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.story .item{
  width: 300px;
  height: 300px;
  /* margin: auto; */
  margin-right: 30px;
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
  top: 40%;
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
