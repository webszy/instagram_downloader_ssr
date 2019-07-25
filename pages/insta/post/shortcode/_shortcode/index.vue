<template>
  <div class='post'>
    <section class="top">
      <el-input v-model="inputVal">
        <button slot="suffix" class="search" @click="goNextPage">search</button>
      </el-input>
      <section class="user">
        <img :src="userPic" alt="">
        <p>{{username}}</p>
      </section>
      <img class="leftbg" src="@/assets/images/instagram_image@2x.png" >
      <img class="rightbg" src="@/assets/images/instagram_image@2x.png" >
    </section>

    <s-footer/>
  </div>
</template>



<script>

export default {
name:'DownInsPostByURL',
components:{},
data(){
return {
  username:'',
  inputVal:''
  }
 },
created(){},
mounted(){},
methods:{
  goNextPage(){}
 },
computed:{}
}
</script>
<style>


</style>
