y<template>
  <div class=''>
    {{tagname}}
  </div>
</template>


<script>

export default {
name:'',
components:{},
data(){
return {
    tagname:this.$route.params.tagname || "NULL"

  }
 },
created(){},
mounted(){},
methods:{

 },
computed:{}
}
</script>
<style>


</style>
