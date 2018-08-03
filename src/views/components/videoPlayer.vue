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
        :playsinline="true"
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
        width: 700,
        overNative: true,
        autoplay: false,
        controls: true,
        sourceOrder: true,
        html5: { hls: { withCredentials: false } },
        sources: [
          {
            withCredentials: false,
            type: 'video/mp4',
            src:
              'http://vjs.zencdn.net/v/oceans.mp4'
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
