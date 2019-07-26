<template>
 <footer class="footer">
   <section class="navs">
     <nav><a href="javascript:;">Contact |</a></nav>
     <nav><a href="javascript:;">&nbsp;Terms of Service |</a></nav>
     <nav><a href="javascript:;">&nbsp;Privacy policy |</a></nav>
     <nav><a href="javascript:;">&nbsp;How to use</a></nav>
   </section>
   <section>
     Copyright &copy; 2019 Instagram Stories. All right reserved
   </section>
 </footer>
</template>


<script>

export default {
name:'sFooter',
}
</script>
<style>
.footer{
  width: 100%;
  height:90px;
  background:#6151AE;
  margin-top: 530px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size:14px;
  font-family: Arial, Helvetica, sans-serif;
  color:#fff;
  line-height:28px;
}
.footer .navs{
  display: flex;

}
.footer a{
    color:#fff;
}
@media screen and (max-width:1300px){
  .footer{
     margin-top:424px;
      font-size:16px;
  }
}
</style>
