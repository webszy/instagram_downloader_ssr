<template>
  <div class='loading'>
    <div class="content">
      <div ref="element" class="anim"></div>
      <p>Loaidng...</p>
    </div>
    
  </div>
</template>


<script>
import loadingData from '../assets/loadingData'
import lottie from 'lottie-web'
export default {
name:'CommonLoading',

mounted(){
  let anim=lottie.loadAnimation({
    container: this.$refs.element, // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: loadingData, // the path to the animation json
  });
 
},
}
</script>
<style>
.loading{
  width: 100%;
  height: 100%;
  position: fixed;
  left:0;
  top:0;
  background-color: hsla(0,0%,100%,.9);
  transition: opacity .3s;
}
.loading .content{
  width: 400px;
  height: 400px;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items:center;
}
.loading .anim{
  width: 50%;
  height: 50%;
}
.loading .content p{
  font-size:24px;
  font-family: 'Lalezar', cursive;
  font-weight:100;
  color:rgba(94,89,118,1);
  line-height:36px;
}
</style>
