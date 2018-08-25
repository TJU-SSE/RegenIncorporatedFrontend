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
        autoplay: false,
        controls: true,
        sources: [
          {
            type: 'video/mp4',
            src: localStorage.getItem('video')
          }
        ],
        poster: localStorage.getItem('cover')
      }
    }
  },
  props: ['videoId'],
  methods: {
    onPlayerEnded (player) {
      // this.isShow = false
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
