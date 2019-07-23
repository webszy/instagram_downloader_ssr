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
    <section class="tab">
      <button :style="componentName==='userPostGellay'?'color:#fff;':'color:#6151AE;'" @click="componentName='userPostGellay'">Posts</button>
      <button :style="componentName==='userStoryGellay'?'color:#fff;':'color:#6151AE;'" @click="componentName='userStoryGellay'">Stories</button>
      <i :style="componentName==='userStoryGellay'?'left:50%;':''" class="tab_bg"></i>
    </section>

  </div>
</template>


<script>
import {
  getUserBaseInfo
} from '@/utils/request'
export default {
name:'DownInsUserPost',
data(){
return {
  username:this.$route.params.name || "NULL",
  userPic:'https://scontent-hkg3-2.cdninstagram.com/vp/49e87078c63296b9f0f120fba424edf3/5DCD0D34/t51.2885-19/s150x150/65719865_469781647109356_4479842475334172672_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com',
  inputVal:'',
  componentName:''
  }
 },
 asyncData({ route, store, env, params, query, req, res, redirect, error}) {
  let username=params.name
 },
 fetch(){},
mounted(){},
methods:{
  goNextPage(){}
 },
computed:{}
}
</script>
<style>
.post{
  width: 100%;
  height: 100%;
}
.post .top{
  width: 100%;
  height: 600px;
  background-color: #6151ae;
  border-radius: 60%/60% 50%;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  box-sizing: border-box;
  padding-top: 130px;
  /* transform: rotateZ(180deg); */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden; 
  position: relative;
}
.post .el-input{
  width: 41.67%;
  height: 100px;
  position: relative;
  display: flex;
  justify-content: center;
}
.post .el-input input{
 width: 100%;
  height: 100%;
  border-radius: 68px;
  padding-left: 42px;
  box-sizing: border-box;
  font-size: 24px;
  font-family: Arial, Helvetica, sans-serif;
  color:#AEAEAE;
}

.post .el-input input::placeholder{
  color:#CFCFCF !important;
  font-size: 24px;
  opacity: 1;
  padding: 1px;
  line-height: 200%;
}
.post .el-input  .el-input__suffix{
  display: block;
  width:22.75%;
  height:85%;
  position: absolute;
  right: 9px;
  top:50%;
}
.post .el-input  .el-input__suffix-inner{
  display: block;
  width: 100%;
  height: 100%;
}
.post .search{
  display: block;
  width: 100%;
  height: 100%;
  transform: translateY(-50%);
  background:linear-gradient(360deg,#EB6A81 0%,#FFC640 100%);
  border-radius:68px;
  font-size:36px;
  font-family: 'Lalezar', cursive;
  font-weight:400;
  color:#fff;
}
.post .top .leftbg,
.post .top .rightbg{
  display: block;
  width: 380px;
  height: 380px;
  position: absolute;
  left:80px;
  bottom: -10px;
  transform: rotateZ(5deg);
}
.post .top .rightbg{
  right: 80px;
  bottom: 12px;
  left: auto;
  transform:rotateY(180deg) rotateZ(264deg);
}
.post .user{
  margin-top: 80px;
}
.post .user img{
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border:6px solid #fff;
  margin-bottom: 24px;
}
.post .user p{
font-size:36px;
font-family: 'Lalezar', cursive;
font-weight:400;
color:#fff;
line-height:56px;
text-align: center;
}
.post .tab{
  width: 260px;
  height: 64px;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius:32px;
  border:2px solid #6151AE;
  margin: 0 auto;
  margin-top: 51px;
  z-index: 1;
  overflow: hidden;
}
.post .tab button{
  width: 50%;
  height: 100%;
  font-size:24px;
  font-family: 'Lalezar', cursive;
  font-weight:400;
  color:#fff;
  line-height: 200%;
  background-color: transparent;
  z-index: 1;
}
.post .tab i{
  width: 50%;
  height: 100%;
  position: absolute;
  left:-1px;
  top:0;
  background:#6151AE;
  z-index: 0; 
  transition: all .3s ease-in-out;
}
</style>
