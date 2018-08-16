<template>
    <div class="header">
      
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
        :options="playerOptions"></video-player>
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
      playerOptions: {
        height: 500,
        autoplay: true,
        controls: false,
        sources: [
          {
            type: 'video/mp4',
            src:
              'http://p3d12u2wq.bkt.clouddn.com/FggnKqrexFr4LGEjxb0e5LJi3Tik'
          }
        ],
        poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg'
      }
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
