<template>
  <div class="home">
    <section class="top">
      <h1>{{platform}}</h1>
      <h2>Media Download</h2>
      <el-autocomplete  
        v-model="inputVal" 
        placeholder="username or post URL" 
        :trigger-on-focus="false"
        :fetch-suggestions="querySearchAsync"
        @select="handleSelect"
        :popper-append-to-body="false"
      >
        <button slot="suffix" class="search" @click="goNextPage">search</button>
         <template slot-scope="{ item }">
           <div class="afterQuery">
             <img :src="item.src" alt="User Avatar">
             <p>{{ item.name }}</p>
           </div>         
        </template>
      </el-autocomplete >
      <section class="select"> 
        <el-radio v-model="platform" label="Instagram">Instagram</el-radio>
      </section>
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
import {
  getInsSearchResult
}from '../utils/request'
export default {
  name:'HomePage',
  components: {
    sFooter
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
    goNextPage(){
      
      if(this.inputVal.startsWith('https:')){

      }else{
        let path='/'+this.routerPath[this.platform]
        this.$router.push(path+'/post/user/'+this.inputVal)
      }
    },
    querySearchAsync(queryString,cb){
      if(queryString.startsWith('http:')||queryString.startsWith('https:')){
        return
      }
     getInsSearchResult(this.inputVal)
     .then(res=>{
     console.log("TCL: querySearchAsync -> res", res)
     let result=[]

      if(res.status==='ok'){
        for(let i=0;i<10;i++){
          let k=res.users[i]
          if(k===undefined){break}
          let obj={name:k.user.username,src:k.user.profile_pic_url}
          result.push(obj)
        }
        cb(result)
      }
     })
    },
    handleSelect(item){
      console.log("TCL: handleSelect -> item", item)
      this.inputVal=item.name
    }
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
.home .el-autocomplete{
  width:100%;
  display: flex;
  justify-content: center;
}
.home .el-input{
  width: 41.67%;
  height: 100px;
  position: relative;
}
.home .el-input input{
  width: 100%;
  height: 100%;
  border-radius: 68px;
  padding-left: 42px;
  box-sizing: border-box;
  font-size: 24px;
  font-family: Arial, Helvetica, sans-serif;
  color:#AEAEAE;
}
.home .el-input input::placeholder{
  color:#CFCFCF !important;
  font-size: 24px;
  opacity: 1;
  padding: 1px;
  line-height: 200%;
}
.home .el-input  .el-input__suffix{
  display: block;
  width:22.75%;
  height:85%;
  position: absolute;
  right: 9px;
  top:50%;
}
.home .el-input  .el-input__suffix-inner{
  display: block;
  width: 100%;
  height: 100%;
}
.home .top  .afterQuery{
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #efefef;
  position: static;
}
.home .top  .afterQuery img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
}
.home .top  .afterQuery p{
  font-size: 18px;
  font-family: 'Lalezar', cursive;
  color:#AEAEAE;
}
.home .select{
  margin-top: 60px;
  height: 35px;
}
.home .select .el-radio__label{
  color:#fff;
  font-size:22px;
  font-family: 'Lalezar', cursive;
  line-height:35px;
}
.home .select .el-radio__inner{
  width: 16px;
  height: 16px;
  border-color:#fff;
  background-color: transparent;
}
.home .select  .el-radio__inner::after{
  width: 6px;
  height: 6px;
}
.home .search{
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
  width:420px;
  height:480px;
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
  left: 260px;
  top:741px;
}
.home .card:nth-of-type(2){
  left: 50%;
  top:805px;
  transform: translateX(-50%);
}
.home .card:last-of-type{
  left: auto;
  right: 258px;
}
.home .card img{
  display: block;
  width: 41.43%;
  height: 40.47%;
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

</style>
