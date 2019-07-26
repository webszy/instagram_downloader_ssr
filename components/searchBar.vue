<template>
  <div class='searchBar'>
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
       </el-autocomplete>
      <section class="select"> 
        <el-radio v-model="platform" label="Instagram">Instagram</el-radio>
      </section>
  </div>
</template>


<script>
import {getInsSearchResult} from '../utils/request'
export default {
name:'searchBar',
components:{},
data(){
return {
   platform:'Instagram',
   inputVal:'',
   routerPath:{
     Instagram:'insta'
   }
  }
 },
mounted(){},
methods:{
   goNextPage(){
      let path='/'+this.routerPath[this.platform]
      if(this.inputVal.startsWith('https:')){
        let shortcode=this.splitURLByPlatform()
        this.$router.push(path+'/post/shortcode/'+shortcode)
      }else{
        
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
    },
    splitURLByPlatform(){
      //https://www.instagram.com/p/BymN1ovnItK/
      switch (this.platform) {
        case 'Instagram':
          return this.inputVal.split('https://www.instagram.com/p/')[1].split('/')[0]
        default:
          break;
      }
    }
 },
computed:{}
}
</script>
<style>
.searchBar{
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.searchBar .el-autocomplete{
  width:100%;
  display: flex;
  justify-content: center;
}
.searchBar .el-input{
  width: 41.67%;
  height: 100px;
  position: relative;
}
.searchBar .el-input input{
  width: 100%;
  height: 100%;
  border-radius: 68px;
  padding-left: 42px;
  box-sizing: border-box;
  font-size: 24px;
  font-family: Arial, Helvetica, sans-serif;
  color:#AEAEAE;
}
.searchBar .el-input input::placeholder{
  color:#CFCFCF !important;
  font-size: 24px;
  opacity: 1;
  padding: 1px;
  line-height: 200%;
}
.searchBar .el-input  .el-input__suffix{
  display: block;
  width:22.75%;
  height:85%;
  position: absolute;
  right: 9px;
  top:50%;
}
.searchBar .el-input  .el-input__suffix-inner{
  display: block;
  width: 100%;
  height: 100%;
}

.searchBar   .afterQuery{
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #efefef;
  position: static;
}
.searchBar   .afterQuery img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
}
.searchBar   .afterQuery p{
  font-size: 18px;
  font-family: 'Lalezar', cursive;
  color:#AEAEAE;
}
.searchBar .select{
  margin-top: 50px;
  height: 35px;
}
.searchBar .select .el-radio__label{
  color:#fff;
  font-size:22px;
  font-family: 'Lalezar', cursive;
  line-height:35px;
}
.searchBar .select .el-radio__inner{
  width: 16px;
  height: 16px;
  border-color:#fff;
  background-color: transparent;
}
.searchBar .select  .el-radio__inner::after{
  width: 6px;
  height: 6px;
}
.searchBar .search{
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
@media screen and (max-width:1300px){
  .searchBar .el-input{
    width: 633px;
  }
}
</style>
