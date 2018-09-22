<template>
    <div v-if="isShow" class="header">
      <div>
        <el-row><p></p></el-row>
        <el-row><p></p></el-row>
        <el-row><p></p></el-row>
        <el-row><p></p></el-row>
        <el-row><p></p></el-row>
        <el-row>
        <video-player 
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
        @ended="onPlayerEnded($event)"></video-player>
        </el-row>
      </div>
    </div>
</template>

<script>
import 'video.js/dist/video-js.css'
require('vue-video-player/src/custom-theme.css')
export default {
  data () {
    return {
      isShow: true,
      playerOptions: {
        height: 500,
        autoplay: true,
        muted: true,
        controls: false,
        sources: [
          {
            type: 'video/mp4',
            src: localStorage.getItem('video')
            // src: 'http://p3d12u2wq.bkt.clouddn.com/FggnKqrexFr4LGEjxb0e5LJi3Tik'
            // src: 'http://p3d12u2wq.bkt.clouddn.com/lqK5uB0uxjHqW45b9OIHbxSX2gEi'
          }
        ]
        // poster: 'http://p3d12u2wq.bkt.clouddn.com/Fnpb9G0Hf1VNhbsIyEwTLH1BKG-B'
      }
    }
  },
  props: ['videoId'],
  methods: {
    playTest () {
      this.$refs.videoPlayer.player.play()
    },
    onPlayerPlay () {
      setTimeout(() => {
        // this.playerOptions.muted = false
      }, 500)
    },
    onPlayerEnded (player) {
      this.isShow = false
      localStorage.setItem('showVideo', true)
      console.log('The end')
    }
  },
  components: {
  }
}
</script>

<style scoped>
  .header {
    height: 600px;
    background:#232323;
  }
</style>
