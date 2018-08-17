<template>
    <div class="card">
      <el-tooltip effect="dark" placement="left">
        <div slot="content" class="item">{{intro}}</div>
        <div :style="{backgroundImage: 'url(' + cover + ')', backgroundPosition: 'center center', backgroundSize: '100%', backgroundRepeat: 'no-repeat',height: '200px', display: 'flex', alignItems: 'center'}" @mouseover="showPlay" @mouseout="hidePlay">
            <img v-if='showIcon' src="../../../static/img/play.png" class="play">
        </div>
      </el-tooltip>
        <div class="info">
            <p class="title">{{title}}</p>
            <div class="bottom clearfix">
            <time class="desc">{{desc}}</time>
            </div>
        </div>
    </div>
</template>  

<style scoped>
  .card {
    margin: 10px;
    border: 0 !important;
    border-radius: 0 !important;
  }

  .info {
      padding-top: 10px;
  }

  .title {
      font-size: 20px;
  }

  .desc {
    font-size: 13px;
    color: #666666;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .item {
    width: 100px;
  }

  .play {
      width: 56px;
      height: 56px;
      display: flex;
      margin-left: auto;
      margin-right: auto;
  }

  div div :hover {
      opacity: 0.9;
  }
</style>

<script>
import { mapGetters } from 'vuex'
import VideoService from '@/service/VideoService'
import toastr from 'toastr'
import env from '@/config/env'
import VideoInput from '../admin/components/VideoInput.vue'

export default {
  data () {
    return {
      currentDate: new Date(),
      showIcon: false
    }
  },
  props: ['cover', 'id', 'title', 'desc', 'isVideo', 'intro'],
  mounted () {
  },
  methods: {
    showPlay () {
      if (this.isVideo) {
        this.showIcon = true
      }
    },
    hidePlay () {
      this.showIcon = false
    },
    ...mapGetters({
      checkLogin: 'checkLogin'
    })
  },
  computed: {
    isLogin () {
      return this.checkLogin()
    }
  },
  components: {
    VideoService,
    toastr,
    env,
    VideoInput
  }
}
</script>
