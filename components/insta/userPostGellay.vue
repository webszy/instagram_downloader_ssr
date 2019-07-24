<template>
  <div class='postGellay'>
   <picture-item title='1231231' src=''/>
   <video-player title='1231231' src=''></video-player>
  
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
    type:Object,
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
 },
computed:{}
}
</script>
<style>
.postGellay{
  width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 52px;
}
.postGellay .picture{
  margin-right: 60px;
}
.postGellay .picture:nth-child(3n){
  margin-right:0;
}

</style>
