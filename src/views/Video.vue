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
          <video-input
        :visible.sync="dialogVisible"
        :dialogVisible="dialogVisible">
        </video-input>
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
        <!-- <el-dialog
          title="创建新视频"
          :visible.sync="dialogVisible"
          width="60%"
          height="40%">
          <el-form :model="videoCreateData">
            <el-form-item label="Title" :label-width="formLabelWidth">
              <el-input v-model="videoCreateData.title" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="Desc" :label-width="formLabelWidth">
              <el-input v-model="videoCreateData.desc" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="Intro" :label-width="formLabelWidth">
              <el-input v-model="videoCreateData.intro" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="封面链接" :label-width="formLabelWidth">
              <el-input v-model="videoCreateData.cover" placeholder="请输入内容"></el-input>
              <upload-image/>
            </el-form-item>
            <el-form-item label="视频链接" :label-width="formLabelWidth">
              <el-input v-model="videoCreateData.video" placeholder="请输入内容"></el-input>
              <upload-video/>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog> -->
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
import VideoInput from './admin/components/VideoInput.vue'
import VideoService from '@/service/VideoService'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      dialogVisible: false,
      videoCreateData: {
        cover: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        title: '测试',
        desc: '测试视频',
        isVideo: true,
        intro: '这是一个用来测试的视频',
        video: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg'
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
    },
    async onConfirmBtnClick (result) {
      if (result) {
        let respBody = await VideoService.create(this, this.editModalInfo.inputData)
        if (respBody.code === env.RESP_CODE.SUCCESS) {
          this.contactData = this.editModalInfo.inputData
          toastr.success('创建视频成功！')
        } else {
          toastr.error('创建失败！')
        }
      }
      this.editModalInfo.show = false
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
    uploadVideo,
    VideoService,
    VideoInput
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
