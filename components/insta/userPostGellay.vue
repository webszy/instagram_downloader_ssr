<template>
  <div class='postGellay' id='postGellay' :style="getBoxWidth">
    <div  v-for="(k,i) in userMedia" :key=i :class="getItemIndex(i)" >
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
  lineNum:4,
  marginRight:'auto'
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
.postGellay{
  /* width: 100%; */
  margin: 0 auto;
  display: flex;
  justify-content:flex-start;
  flex-wrap: wrap;
  /* padding: 0 13.54%; */
  padding-top: 52px;
  box-sizing: border-box;
}
.postGellay .item{
  width: 300px;
  height: 300px;
  /* margin: auto; */
  margin-right: 30px;
  margin-bottom: 60px;
}
.postGellay .itemFirst{
  margin-left:0
}
.postGellay .itemLast{
  margin-right:0
}

@media screen and (max-width:1300px){
    .postGellay{
       /* padding: 0 11%; */
       padding-top: 52px;
    }
  .postGellay .item{
    width: 240px;
    height: 240px;

  }
}
</style>
