<template>
    <div>
        <el-row>
          <video-player></video-player>
        </el-row>
        <el-row><p></p></el-row>
        <el-row><p></p></el-row>
        <el-row><p></p></el-row>
        <el-row>
          <div class="title">NEWEST VIDEOS</div>
          <div>  
            <div>
            <div v-for="(item, index) in videoItems" :key="index">
              <el-col :span="6"> 
                  <item-card 
                  :title="item.title"
                  :intro="item.intro"
                  :desc="item.desc" 
                  :cover="item.cover" 
                  :isVideo="item.isVideo"></item-card>
              </el-col>
            </div>        
            </div>            
          </div>
        </el-row>
    </div>
</template>

<script>
import toastr from 'toastr'
import ProductService from '@/service/ProductService'
import env from '@/config/env'
import carousel from '@/views/components/carousel'
import ItemCard from '@/views/components/ItemCard'
import videoPlayer from './components/videoPlayer'

export default {
  data () {
    return {
      videoItems: [{
        cover: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        title: '测试',
        desc: '测试视频',
        isVideo: true,
        intro: '这是一个用来测试的视频'
      }, {
        cover: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        title: '测试',
        desc: '测试视频',
        isVideo: true,
        intro: '这是一个用来测试的视频'
      }, {
        cover: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        title: '测试',
        desc: '测试视频',
        isVideo: true,
        intro: '这是一个用来测试的视频'
      }, {
        cover: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        title: '测试',
        desc: '测试视频',
        isVideo: true,
        intro: '这是一个用来测试的视频'
      }, {
        cover: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        title: '测试',
        desc: '测试视频',
        isVideo: true,
        intro: '这是一个用来测试的视频'
      }, {
        cover: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        title: '测试',
        desc: '测试视频',
        isVideo: true,
        intro: '这是一个用来测试的视频'
      }, {
        cover: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        title: '测试',
        desc: '测试视频',
        isVideo: true,
        intro: '这是一个用来测试的视频'
      }, {
        cover: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        title: '测试',
        desc: '测试视频',
        isVideo: true,
        intro: '这是一个用来测试的视频'
      }, {
        cover: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        title: '测试',
        desc: '测试视频',
        isVideo: true,
        intro: '这是一个用来测试的视频'
      }, {
        cover: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        title: '测试',
        desc: '测试视频',
        isVideo: true,
        intro: '这是一个用来测试的视频'
      }, {
        cover: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        title: '测试',
        desc: '测试视频',
        isVideo: true,
        intro: '这是一个用来测试的视频'
      }, {
        cover: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        title: '测试',
        desc: '测试视频',
        isVideo: true,
        intro: '这是一个用来测试的视频'
      }]
    }
  },
  components: {
    videoPlayer,
    toastr,
    ProductService,
    env,
    carousel,
    ItemCard
  }
}
</script>

<style scoped>
  
  .el-carousel__item:nth-child(2n) {
    background-color: #000000;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #000000;
  }
  .carousel{
    width: 90%;
    align-content: center;
    align-items: center;
    text-align:center;
    margin:0 auto
  }
  .cimg{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img{
      height: 700px;
      display: block;
      
  }
 
  .small{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title{
    display: flex;
    flex-wrap: wrap;
    border: 0px solid #dcdfe6;
    padding: 20px 15px 15px;
    justify-content: space-around;
    font-weight: 300;
    letter-spacing: 1px;
    width: 80%;background: #ffffff;
    margin:0 auto; 
    font-weight: bolder;
    font-size: 30pt;
  }

</style>
