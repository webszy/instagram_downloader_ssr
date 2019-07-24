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
      <button class="downloadIcon"></button>
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
        src: "https://scontent.cdninstagram.com/vp/c0ece3f787060f452a4155f21e8d86e5/5D3A4B06/t50.2886-16/26260893_181645769255442_8741213847412007902_n.mp4?_nc_ht=scontent.cdninstagram.com"
      }],
      poster: "https://scontent-hkg3-2.cdninstagram.com/vp/69c7d5549f0289493c6485cf2a918a4a/5D3AE42B/t51.2885-15/e35/26071385_516980018688775_2785592389480218624_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com",
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
  }
 },
mounted(){

},
methods:{
  onPlayerPlay(e){},
  onPlayerPause(e){},
  playerReadied(){},
  playerStateChanged(e){}
 },
computed:{}
}
</script>
<style>
.video{
  width: 300px;
  height: 300px;
  position: relative;
  overflow: hidden;
}
.video .video-player-box{
  width: 100%;
  height: 100%;
}
.video .vjs-poster,.video .video-js{
  width: 100%;
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
</style>
