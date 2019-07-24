<template>
  <div class='postGellay'>
    <div class="item" v-for="(k,i) in userMedia" :key=i>
      <picture-item 
        :title=k.title 
        :src=k.display_url 
        :fileName="getFileName(k)"
        v-if="k.__typename!=='GraphVideo'" 
        />
       <video-player 
        :title=k.title 
        :src=k.video_url 
        :fileName="getFileName(k)"
        :postImg=k.display_url 
        v-else
       />
    </div>
   
  
  
  </div>
</template>


<script>
import pictureItem from './picture'
import videoPlayer from './videoPlayer'
export default {
name:'userPostGellay',
components:{pictureItem,videoPlayer},
data(){
return {

  }
 },
props:{
  userMedia:{
    type:Array,
    required:true
  }
},
mounted(){},
methods:{
   getMediaSrc(item){
      if(item.thumbnail_resources&&item.thumbnail_resources[0]){
        return item.thumbnail_resources[0].src
      }else{
         return item.display_url
      }
    },
    getFileName(k){
      let username=this.$route.params.name || ''
      return username+'_'+k.shortcode
    }
 },
computed:{}
}
</script>
<style>
.postGellay{
  width: 1401px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 52px;
}
.postGellay .item{
  width: 300px;
  height: 300px;
  margin: auto;
}
/* .postGellay .picture{
  margin-right: 60px;
}
.postGellay .picture:nth-child(3n){
  margin-right:0;
} */

</style>
