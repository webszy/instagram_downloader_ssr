<template>
  <div class="home">
    <section class="top">
      <h1>{{platform}}</h1>
      <h2>Media Download</h2>

      <searchBar></searchBar>

      <img class="leftbg" src="../assets/images/instagram_image@2x.png" >
      <img class="rightbg" src="../assets/images/instagram_image@2x.png" >
    </section>
    <article class="card">
      <img src="../assets/images/use.png">
      <h3>How to use</h3>
      <p>Enter your username or post link and then click the search button to download the video, image and story data.</p>
    </article>
    <article class="card">
      <img src="../assets/images/advantages.png">
      <h3>Advantages</h3>
      <p>No need to log in, truly anonymous, no need to login, no private data collected.One button smart, simple, easy and convenient.</p>
    </article>  
    <article class="card">
      <img src="../assets/images/privacy.png">
      <h3>Privacy Policy</h3>
      <p>We don't affiliate with Instagram or host any of the Instagram's Stories on this website.All rights belong to the each account owners.</p>
    </article>
    <s-footer/>
  </div>
</template>

<script>
import sFooter from '../components/footer'
import searchBar from '../components/searchBar'
import {
  getInsSearchResult
}from '../utils/request'
export default {
  name:'HomePage',
  components: {
    sFooter,
    searchBar
  },
  data(){
    return{
      platform:'Instagram',
      inputVal:'',
      routerPath:{
        Instagram:'insta'
      }
    }
    
  },
  methods:{
   
  }
}
</script>

<style>

.home{
 width: 100%;
 height: 100%;

}
.home .top{
  width: 100%;
  height: 888px;
  background-color: #6151ae;
  border-radius: 60%/60% 50%;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  box-sizing: border-box;
  padding-top: 193px;
  /* transform: rotateZ(180deg); */
  display: flex;
  flex-direction: column;
  align-items: center; 
  overflow: hidden; 
  position: relative;
}
.home .top h1,.home .top h2{
  width: fit-content;
  font-family: 'Lalezar', cursive;
  text-transform: uppercase;
  color:#fff;
  font-size: 93px;
  line-height: 120px;
  text-shadow:0px 15px 12px rgba(52,35,134,0.76);
}
.home .top h2{
  color:#00FFFA;
}

.home .top .leftbg,
.home .top .rightbg{
  display: block;
  width: 380px;
  height: 380px;
  position: absolute;
  left:80px;
  bottom: 12px;
  transform: rotateZ(5deg);
}
.home .top .rightbg{
  right: 80px;
  bottom: 12px;
  left: auto;
  transform:rotateY(180deg) rotateZ(264deg);
}
.home .card{
  width:21.88%;
  /* height:480px; */
  height: 72.8%;
  max-width: 420px;
  max-height: 480px;
  background:#fff;
  box-shadow:6px 50px 55px 0px rgba(225,222,241,0.4);
  border-radius:30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding-top:50px; 
  z-index: 1;
  position: absolute;
  left: 13.45%;
  top:741px;
}
.home .card:nth-of-type(2){
  left: 50%;
  top:805px;
  transform: translateX(-50%);
}
.home .card:last-of-type{
  left: auto;
  right: 13.43%;
}
.home .card img{
  display: block;
  width: 174px;
  height: 174px;
  margin-bottom: 16px;
}
.home .card h3{
  width:fit-content;
  height:56px;
  font-size:36px;
  font-family: 'Lalezar', cursive;
  font-weight:400;
  color:rgba(94,89,118,1);
  line-height:56px;
}
.home .card p{
  width:88.1%;
  font-size:22px;
  font-family: Arial, Helvetica, sans-serif;
  color:rgba(94,89,118,1);
  line-height:30px;
}
@media screen and (max-width:1300px){
  .home .top{
    padding-top: 154px;
  }
  .home .card{
    width: 336px;
    height: 384px;
    padding-top: 40px;
    left:6.45%;
    top:640px;
  }
  .home .card:nth-of-type(2){
    top:704px;
  }
  .home .card:last-of-type{
    right: 6.45%;
  }
  .home .card img{
    width: 139px;
    height: 139px;
  }
  .home .card h3{
    font-size: 28px;
    height: 48px;
    line-height: 48px;
  }
  .home .card p{
    font-size: 18px;
    line-height: 28px;
  }
  .searchBar .el-input{

  }
}

</style>
