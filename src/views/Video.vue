<template>
    <div>
        <el-row>
          <video-player></video-player>
        </el-row>
        <el-row><p></p></el-row>
        <el-row><p></p></el-row>
        <el-row><p></p></el-row>
        <el-row>
          <div class="title">NEWEST VIDEOS
            <el-button v-if="isLogin"
             type="primary" 
             class="create" 
             size="small" 
             @click="showDialog()"
             plain 
             round
             >
              <b>Create New Video</b>
            </el-button>
          </div>
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
        <el-dialog
          title="创建新视频"
          :visible.sync="dialogVisible"
          width="60%"
          height="40%">
          <el-form >
            <el-form-item label="Title" :label-width="formLabelWidth">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="Desc" :label-width="formLabelWidth">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="Intro" :label-width="formLabelWidth">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="封面链接" :label-width="formLabelWidth">
              <el-input placeholder="请输入内容"></el-input>
              <upload-image/>
            </el-form-item>
            <el-form-item label="视频链接" :label-width="formLabelWidth">
              <el-input placeholder="请输入内容"></el-input>
              <upload-video/>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import toastr from 'toastr'
import ProductService from '@/service/ProductService'
import env from '@/config/env'
import carousel from '@/views/components/carousel'
import ItemCard from '@/views/components/ItemCard'
import videoPlayer from './components/videoPlayer'
import uploadImage from './admin/UploadImage.vue'
import uploadVideo from './admin/UploadVideo.vue'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      dialogVisible: false,
      formLabelWidth: '80px',
      videoInputData: {
        cover: '1',
        title: '测试',
        desc: '测试视频',
        isVideo: true,
        intro: '这是一个用来测试的视频'
      },
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
  methods: {
    ...mapGetters({
      checkLogin: 'checkLogin'
    }),
    showDialog () {
      this.dialogVisible = true
    }
  },
  components: {
    videoPlayer,
    toastr,
    ProductService,
    env,
    carousel,
    ItemCard,
    uploadImage,
    uploadVideo
  },
  computed: {
    isLogin () {
      return this.checkLogin()
    }
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
  .create{
    display: flex;
    font-size: 10pt;
    font-weight: bolder;
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
