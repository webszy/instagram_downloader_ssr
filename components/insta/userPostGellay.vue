<template>
  <div class='postGellay'>
   <picture-item src='https://scontent-hkg3-2.cdninstagram.com/vp/8f5532f1d137da2e8ed538c280b25908/5DE98FC2/t51.2885-15/e35/p1080x1080/67193118_1097807187275050_1052215309554353349_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com'/>
   <picture-item src='https://scontent-hkg3-2.cdninstagram.com/vp/8f5532f1d137da2e8ed538c280b25908/5DE98FC2/t51.2885-15/e35/p1080x1080/67193118_1097807187275050_1052215309554353349_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com'/>
   <picture-item src='https://scontent-hkg3-2.cdninstagram.com/vp/8f5532f1d137da2e8ed538c280b25908/5DE98FC2/t51.2885-15/e35/p1080x1080/67193118_1097807187275050_1052215309554353349_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com'/>
   <picture-item src='https://scontent-hkg3-2.cdninstagram.com/vp/8f5532f1d137da2e8ed538c280b25908/5DE98FC2/t51.2885-15/e35/p1080x1080/67193118_1097807187275050_1052215309554353349_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com'/>
   <picture-item src='https://scontent-hkg3-2.cdninstagram.com/vp/8f5532f1d137da2e8ed538c280b25908/5DE98FC2/t51.2885-15/e35/p1080x1080/67193118_1097807187275050_1052215309554353349_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com'/>

  </div>
</template>


<script>
import pictureItem from './picture'
export default {
name:'userPostGellay',
components:{pictureItem},
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
  width: 100%;
  box-sizing: border-box;
  padding: 0 13.67%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 52px;
}
.postGellay .picture{
  margin-right: 50px;
}

.postGellay .picture:nth-child(5n){
  margin-right: 0;
}
</style>
