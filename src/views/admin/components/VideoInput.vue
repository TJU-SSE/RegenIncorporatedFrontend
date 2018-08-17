<template>
  <div>
    <el-button v-if="isUpdate" @click="showDialog()" size="mini">修改</el-button>
    <el-button
        @click="videoDelete()" 
        v-if="isUpdate" 
        size="mini" 
        type="danger">删除</el-button>
    <el-button v-if="isCreate"
             type="primary" 
             class="create"
             @click="showDialog()"
             plain 
             round>
      <b>Create New Video</b>
    </el-button>
    <el-dialog
    :title="dialogTitle"
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
      <el-form-item label="Rank" :label-width="formLabelWidth">
        <el-input v-model="videoCreateData.rank" placeholder="请输入内容"></el-input>
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
        cover: '',
        title: '',
        desc: '',
        intro: '',
        video: '',
        rank: 1
      }
    }
  },
  props: ['dialogTitle', 'id', 'rank', 'cover', 'title', 'desc', 'video', 'intro'],
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
    initVideoCreateData () {
      this.videoCreateData.title = this.title
      this.videoCreateData.cover = this.cover
      this.videoCreateData.desc = this.desc
      this.videoCreateData.video = this.video
      this.videoCreateData.intro = this.intro
      this.videoCreateData.rank = this.rank
    },
    async onCreateVideoConfirmBtnClick () {
      if (this.dialogTitle === '创建新视频') {
        let respBody = await VideoService.create(this, this.videoCreateData)
        if (respBody.code === env.RESP_CODE.SUCCESS) {
          toastr.success('创建视频成功！')
          setTimeout(() => {
            console.log('resfre')
            this.$emit('refreshList')
          }, 1000)
        } else {
          toastr.error('创建视频失败！')
        }
      }
      if (this.dialogTitle === '修改视频信息') {
        var postData = this.videoCreateData
        postData.id = this.id
        let respBody = await VideoService.update(this, postData)
        if (respBody.code === env.RESP_CODE.SUCCESS) {
          toastr.success('视频修改成功！')
          setTimeout(() => {
            this.$emit('refreshList')
          }, 1000)
        } else {
          toastr.error('视频修改失败！')
        }
      }
      this.dialogVisible = false
    },
    videoDelete () {
      this.$confirm('此操作将永久删除该视频, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.onDeleteVideoConfirmBtnClick()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async onDeleteVideoConfirmBtnClick () {
      var postData = {}
      postData.id = this.id
      let respBody = await VideoService.delete(this, postData)
      if (respBody.code === env.RESP_CODE.SUCCESS) {
        this.$emit('refreshList')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } else {
        this.$message.error('Opps 删除失败了哦')
      }
    }
  },
  components: {
    uploadImage,
    uploadVideo,
    toastr,
    env,
    VideoService
  },
  mounted () {
    this.initVideoCreateData()
  },
  computed: {
    isCreate () {
      if (this.dialogTitle === '创建新视频') {
        return this.checkLogin()
      } else {
        return false
      }
    },
    isUpdate () {
      console.log(this.dialogTitle)
      if (this.dialogTitle === '修改视频信息') {
        console.log('测试一波')
        return this.checkLogin()
      } else {
        return false
      }
    }
  }
}
</script>
