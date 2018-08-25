<template>
    <div>
    <el-row>
      <carousel 
      :products="banners"
      destination="videoDetail"
      ></carousel>
    </el-row>
    <el-row><p></p></el-row>
    <el-row><p></p></el-row>
    <el-row><p></p></el-row>
        <el-row>
          <div class="title">NEWEST VIDEOS
          <video-input
          v-if="isLogin"
          dialogTitle="创建新视频">
        </video-input>
          </div>
          <div>  
            <div>
            <div v-for="(item, index) in videoItems" :key="index">
              <el-col :span="6"> 
                  <item-card
                  :title="item.title"
                  :id="item.id"  
                  :video="item.video"
                  :intro="item.intro"
                  :desc="item.desc" 
                  :cover="item.cover" 
                  :isVideo="item.isVideo"></item-card>
                  <video-input
                  dialogTitle="修改视频信息"
                  @refreshList="getVideos"
                  :video="item.video"
                  :rank="item.rank"
                  :title="item.title"
                  :id="item.id"  
                  :intro="item.intro"
                  :desc="item.desc" 
                  :cover="item.cover" 
                  :isVideo="item.isVideo">
                  </video-input>
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
import uploadImage from './admin/UploadImage.vue'
import uploadVideo from './admin/UploadVideo.vue'
import VideoInput from './admin/components/VideoInput.vue'
import VideoService from '@/service/VideoService'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      dialogVisible: false,
      banners: [],
      videoId: this.$route.params.videoId,
      videoCreateData: {
        cover: '',
        title: '',
        desc: '',
        isVideo: true,
        intro: '',
        video: ''
      },
      videoItems: []
    }
  },
  methods: {
    ...mapGetters({
      checkLogin: 'checkLogin'
    }),
    showDialog () {
      this.dialogVisible = true
    },
    async getVideoBanner () {
      let respBody = await VideoService.getVideoBanner(this)
      console.log('This is Banner')
      console.log(respBody.msg.videos)
      if (respBody.code === env.RESP_CODE.SUCCESS) {
        this.banners = respBody.msg.videos
        console.log('This is Banner')
        console.log(respBody.msg.videos)
      } else {
        toastr.error('加载数据失败！')
      }
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
    },
    async getVideos () {
      let respBody = await VideoService.getAll(this)
      if (respBody.code === env.RESP_CODE.SUCCESS) {
        this.videoItems = respBody.msg.videos
      } else {
        toastr.error('接收信息失败！')
      }
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
  },
  mounted () {
    this.getVideos()
    this.getVideoBanner()
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
