<template>
  <div class='postGellay'>
     <el-image 
          v-for="(item,i) in userMedia"
          :key="i"
          :src="getMediaSrc(item)"
          @click="$emit('chooseLikeMedia',item,i)"
          :class="choosedLikeIndex===i?'likeLayer':''"
          >
            <div slot="placeholder" class="image-slot">
              <i class="el-icon-loading"></i>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
      </el-image>
  </div>
</template>


<script>

export default {
name:'userPostGellay',
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
  padding: 0 260px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.postGellay .el-image:nth-child(even){
  margin-right: 
}
.el-image .image-slot .el-icon-loading{
  font-size: 60px;
  color:#6151AE;
}

</style>
