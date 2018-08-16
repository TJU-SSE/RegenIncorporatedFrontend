<template>
  <div>
    <el-button v-if="isLogin"
             type="primary" 
             class="create"
             @click="showDialog()"
             plain 
             round>
      <b>Create New Video</b>
    </el-button>
    <el-dialog
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
      <el-button type="primary" @click="onCreateVideoConfirmBtnClick()">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>  

<style>
  .create{
    display: flex;
    font-size: 10pt;
    font-weight: bolder;
  }
</style>


<script>
import { mapGetters } from 'vuex'
import toastr from 'toastr'
import VideoService from '@/service/VideoService'
import env from '@/config/env'
import uploadImage from '../UploadImage.vue'
import uploadVideo from '../UploadVideo.vue'

export default {
  data () {
    return {
      currentDate: new Date(),
      showIcon: false,
      dialogVisible: false,
      formLabelWidth: '80px',
      videoCreateData: {
        cover: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        title: '测试',
        desc: '测试视频',
        intro: '这是一个用来测试的视频',
        video: 'http://p3d12u2wq.bkt.clouddn.com/FggnKqrexFr4LGEjxb0e5LJi3Tik'
      }
    }
  },
  props: ['cover', 'title', 'desc', 'video', 'intro'],
  mounted () {
  },
  methods: {
    showPlay () {
      if (this.isVideo) {
        this.showIcon = true
      }
    },
    showDialog () {
      this.dialogVisible = true
    },
    ...mapGetters({
      checkLogin: 'checkLogin'
    }),
    async onCreateVideoConfirmBtnClick () {
      if (this.videoCreateData) {
        console.log(this.videoCreateData)
        let respBody = await VideoService.create(this, this.videoCreateData)
        console.log(respBody)
        console.log('FUCK')
        if (respBody.code === env.RESP_CODE.SUCCESS) {
          toastr.success('创建员工成功！')
        } else {
          toastr.error('创建员工失败！')
        }
      }
      this.workerModalInfo.show = false
    }
  },
  components: {
    uploadImage,
    uploadVideo,
    toastr,
    env,
    VideoService
  },
  computed: {
    isLogin () {
      return this.checkLogin()
    }
  }
}
</script>
