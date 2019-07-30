<template>
    <nuxt />
</template>
<script>
export default {
  mounted(){
    this.shareButton()
    if ( process.env.NODE_ENV === 'production') {
      this.googleAnalytics('UA-105411592-8')
    }
  },
  methods:{
    shareButton(){
      if(document.getElementById('shareButton')){return}
      let script=document.createElement('script')
      script.src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d3fb466b382165e"
      script.defer=''
      script.id="shareButton"
      let root=document.getElementById('__nuxt')
      if(root){
        root.appendChild(script)
        script=null
      }else{
        setTimeout(()=>{
          document.getElementById('__nuxt').appendChild(script)
          script=null
        },1000)
      }
    },
    googleAnalytics(id){
      let script=document.createElement('script')
      script.src='https://www.googletagmanager.com/gtag/js?id='+id
      let rootE=document.getElementById('__nuxt')
      script.onload=function(){
        window.dataLayer = window.dataLayer || []; 
        window.gtag=function(){dataLayer.push(arguments);} 
        gtag('js', new Date()); 
        setTimeout(()=>{
          gtag('config', id);
        },100)
      }
      if(rootE){
        rootE.appendChild(script)
        script=null
      }else{
        setTimeout(()=>{
           rootE.appendChild(script)
        script=null
        },1000)
      }
    }
  }
}
</script>
<style>
/* fonts */
@import url('https://fonts.googleapis.com/css?family=Lalezar&display=swap');

.layout{
  width: 100%;
  height: 100%;
}
</style>
