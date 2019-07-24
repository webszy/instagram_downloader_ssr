<template>
  <div class='picture'>
      <el-image :src="src">
            <div slot="placeholder" class="image-slot">
              <i class="el-icon-loading"></i>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
    </el-image>
    <div class="downloadLayer">
      <p>{{title}}</p>
      <button class="downloadIcon"></button>
    </div>
  </div>
</template>


<script>

export default {
name:'PictureItem',
props:{
  src:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  }
  
},
mounted(){},
methods:{

 },
computed:{}
}
</script>
<style>
.picture{
  width: 300px;
  height: 300px;
  margin-bottom:60px;
  position: relative;
  overflow: hidden;
}

.picture .el-image {
  width:100%;
  height: 100%;
}

.el-image .image-slot {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-image .image-slot .el-icon-loading,
.el-image .image-slot .el-icon-picture-outline{
  font-size: 50px;
  color:#6151AE;
}

</style>
