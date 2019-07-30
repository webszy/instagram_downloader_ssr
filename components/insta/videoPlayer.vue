<template>
  <div class='video'>
    <div class="video-player-box" 
       @play="onPlayerPlay($event)"
       @pause="onPlayerPause($event)"
       @ready="playerReadied"
       @statechanged="playerStateChanged($event)"
       v-video-player:myVideoPlayer="options">
    </div>
    <div class="downloadLayer">
      <p>{{title}}</p>
      <button class="downloadIcon" @click="fileDownload"></button>
    </div>
  </div>
</template>


<script>
export default {
name:'VideoPlayer',
data(){
return {
  myVideoPlayer:null,
  options:{
      muted: false,
      autoplay:false,
      loop:false,
      fluid: true,
      preload: "auto",
      language: 'en',
      width:300,
      height:300,
      controlBar:{
        muteToggle: false,
        TimeDivider:false,
        DurationDisplay:false,
        RemainingTimeDisplay:false,
        ProgressControl:false,
        FullscreenToggle:false,
      },
      sources: [{
        type: "video/mp4",
        src: this.src
      }],
      poster:this.postImg ,
  }
  }
 },
 props:{
    src:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  postImg:{
    type:String,
    required:true
  },
  fileName:{
    type:String,
    required:true
  }
 },
mounted(){

},
methods:{
  onPlayerPlay(e){},
  onPlayerPause(e){},
  playerReadied(){},
  playerStateChanged(e){},
  fileDownload(){
    this.$save(this.src,this.fileName+'.mp4')
  }
 },
computed:{}
}
</script>
<style>
.video{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.video .video-player-box{
  width: 100%;
  height: 100%;
}
.video .vjs-poster,.video .video-js{
  width: 100%;
  height: 100%;
}
.video .video-js .vjs-big-play-button{
  width: 56px;
  height: 56px;
  border-radius: 50%;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  border:none;
  background: url('../../assets/images/play.png') no-repeat center center;
  background-color: rgba(43, 51, 63, 0.7);
  background-size: cover;
}
.video .video-js .vjs-big-play-button span{
  display: none;
}
.video  video[poster]{
    object-fit: contain;
}
.video  .vjs-poster {
    background-size: contain;
    background-position-y: inherit;
    background-position-x: center;
    background-size: 80% 100%;
}
</style>
