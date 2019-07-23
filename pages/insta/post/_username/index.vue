<template>
  <div class='post'>
    {{username}}
  </div>
</template>


<script>

export default {
name:'DownInsPost',
components:{},
data(){
return {
  username:this.$route.params.username || "NULL"
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
