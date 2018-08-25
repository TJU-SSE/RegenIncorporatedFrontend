<template>
  <div>
        <ConfirmVodal :vodalText="confirmVodalText"
                  :show="confirmVodalText.show"
                  @hide="confirmVodalText.show = false"
                  @onConfirmBtnClick="onConfirmDeleteBtnClick"
                  :extraData="confirmVodalText.extraData">
        </ConfirmVodal>
      <div class="edit-container" v-if="isLogin">
        <a @click="addImgDialogVisible = true"><i class="fa fa-plus fa-lg add-btn"></i></a>
            <el-dialog
    title="添加"
    :visible.sync="addImgDialogVisible"
    width="60%"
    height="40%">
    <el-form :model="imgData">     
      <el-form-item label="图片链接" :label-width="formLabelWidth">
        <el-input v-model="imgData.img_url" placeholder="请输入内容"></el-input>
        <upload-image/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addImgDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onCreateConfirmBtnClick()">确 定</el-button>
    </span>
  </el-dialog>

        <!-- <vodal :show="addImgVodalInfo.show"
               @hide="addImgVodalInfo.show = false"
               :width="addImgVodalInfo.width"
               :height="addImgVodalInfo.height"
               :measure="addImgVodalInfo.measure">
          <div class="vodal-container">
            <h3 class="vodal-title">添加图片</h3>

            <el-upload
              action=""
              class="upload-demo"
              :on-change="handleImgRemove"
              :on-remove="handleImgRemove"
              list-type="picture"
              :auto-upload="false"
              multiple
            >
              <el-button size="small" type="primary">点击添加</el-button>
            </el-upload>
            <el-input v-model="new_url" placeholder="请输入内容"></el-input>
          <upload-image/>
          
            <footer class="confirm-btn-group">
              <el-button
                type="primary"
                :loading="addImgVodalInfo.loading"
                @click="onAddImgConfirmBtnClick(true)"
              >
                确定
              </el-button>
              <button class="btn btn-danger" @click="onAddImgConfirmBtnClick(false)">取消</button>
            </footer>
          </div>
        </vodal> -->
      </div>
    <div class="small">
      <div class="wtf">
        <waterfall
      :line="items.line"
      :line-gap="items.lineGap"
      :min-line-gap="items.minLineGap"
      :max-line-gap="items.maxLineGap"
      :watch="items.data"
      ref="waterfall"
    >
      <WaterfallSlot
        v-for="(item,index) in items.data"
        :width="item.width"
        :height="item.height"
        :order="item.index"
        :key="index"
      >
        <div class="item">
          
          <img class="" :src="item.imgUrl" :index="item.index" @click="onItemClick(item.index)">
        </div>
        <div class="icon-group" v-if="isLogin">
          <a class="minus-btn" @click="onDeleteImgClick(item.imgId)"><i class="fa fa-trash fa-lg"></i></a>
        </div>
      </WaterfallSlot>
    </waterfall>
      </div>
    </div>
    <div class="ach">
      <p>ACHIEVEMENT</p>
    </div>
    <div v-if="isLogin">
      <a @click="editDialogVisible = true"><i class="fa fa-edit fa-lg edit-btn"></i></a>
          <el-dialog
    title="编辑"
    :visible.sync="editDialogVisible"
    width="60%"
    height="40%">
    <el-form :model="productData">
      <el-form-item label="Title" :label-width="formLabelWidth">
        <el-input v-model="productData.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="Title_cn" :label-width="formLabelWidth">
        <el-input v-model="productData.title_cn" placeholder="请输入内容"></el-input>
      </el-form-item>      
      <el-form-item label="Intro" :label-width="formLabelWidth">
        <el-input v-model="productData.introduction" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="Intro_cn" :label-width="formLabelWidth">
        <el-input v-model="productData.introduction_cn" placeholder="请输入内容"></el-input>
      </el-form-item>      
      <el-form-item label="封面链接" :label-width="formLabelWidth">
        <el-input v-model="productData.cover_url" placeholder="请输入内容"></el-input>
        <upload-image/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onEditConfirmBtnClick()">确 定</el-button>
    </span>
  </el-dialog>
      <!-- <ProductInput :show="editVodalInfo.show"
                    @hide="editVodalInfo.show = false"
                    :title="editVodalInfo.title"
                    @onConfirmBtnClick="onConfirmBtnClick"
                    :productData="editVodalInfo.refData"></ProductInput> -->
    </div>
      <div class="info">
        <h4>{{productData.title}}</h4>
        <!-- <h4>{{productData.session}}</h4> -->
        <div class="social-item">
        </div>
        <p>
          {{productData.introduction}}
        </p>
        
      </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import { mapGetters } from 'vuex'
  import toastr from 'toastr'
  import Swiper from './components/Swiper.vue'
  import Vodal from 'vodal'
  import marked from 'marked'
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  import CommonUtils from '../config/CommonUtils'
  import ConfirmVodal from '@/views/components/ConfirmVodal'
  import ProductInput from '@/views/admin/components/ProductInput'
  import VueImgInputer from 'vue-img-inputer'
  import uploadImage from '@/views/admin/UploadImage.vue'
  import PhotoService from '@/service/PhotoService'
  import env from '@/config/env'

  export default {
    data () {
      return {
        productId: this.$route.params.photoId,
        title: env.BRAND_NAME + ' | 案例',
        artistData: [],
        curHeight: 300,
        imgData: {id: 0, img_url: ''},
        addImgDialogVisible: false,
        formLabelWidth: '80px',
        editDialogVisible: false,
        items: {
          minLineGap: 100,
          maxLineGap: 400,
          lineGap: 380,
          line: 'h',
          data: []
        },
        confirmVodalText: {
          title: '删除',
          content: '是否删除这张图片？',
          extraData: null,
          show: false
        },
        productData: {
          id: 16,
          title: '',
          title_cn: '',
          introduction: '',
          introduction_cn: '',
          cover_url: '',
          banner_rank: 0,
          banner: false,
          tags: []
        },
        seasons: [],
        curImg: {},
        isSafari: false,
        forChange: true,
        editVodalInfo: {
          title: '更新Product',
          show: false,
          refData: {
            img: null,
            title: '',
            session: '',
            releaseTime: '',
            introduction: {
              desc: '',
              source: '',
              client: '',
              weibo: '',
              facebook: '',
              artists: []
            }
          }
        },
        addImgVodalInfo: {
          show: false,
          width: 80,
          height: 45,
          measure: '%',
          img: null,
          imgs: [],
          loading: false
        }
      }
    },
    components: {
      Swiper,
      ProductInput,
      Vodal,
      Waterfall,
      WaterfallSlot,
      VueImgInputer,
      ConfirmVodal,
      uploadImage
    },
    methods: {
      ...mapGetters({
        checkLogin: 'checkLogin'
      }),
      changePic (index) {
        this.forChange = false
        this.curImg = this.seasons[index]
        setTimeout(() => this.forChange = true, 500)
      }, 
      onDeleteImgClick (imgId) {
        this.confirmVodalText.extraData = imgId
        this.confirmVodalText.show = true
      },         
      async getData () {
        let respBody = await PhotoService.getItemById(this, this.productId)
        if (respBody.code === env.RESP_CODE.SUCCESS) {
          console.log(respBody)
          this.productData = respBody.msg
          this.seasons = respBody.msg.imgs.map((img, index) => {
            return {
              url: img.img_url,
              id: img.img_id
            }
          })
          // console.log('here')
          // console.log(this.seasons)
          this.seasons.forEach((data, index) => {
            // console.log('single')
            // console.log(data)
            const image = new Image()
            image.onload = () => {
              this.items.data.push({
                index: index,
                width: image.width / image.height * this.curHeight,
                height: this.curHeight,
                imgUrl: data.url,
                imgId: data.id
              })
            }
            image.src = data.url
          })
          console.log(this.items)
        }
      },
      async onConfirmBtnClick (result) {
        console.log(result)
        if (result.result) {
          let respBody = await ProductService.update(this, {
            id: this.productId,
            title: result.data.title,
            session: result.data.session,
            releaseTime: result.data.releaseTime,
            introduction: result.data.introduction,
            tags: result.data.tags
          })
          if (respBody.code === env.RESP_CODE.SUCCESS) {
            this.productData.title = result.data.title
            this.productData.session = result.data.session
            this.productData.releaseTime = result.data.releaseTime
            this.productData.introduction = result.data.introduction
            toastr.success('更新文本成功！')
            if (result.data.img) {
              respBody = await ProductService.updateImg(this, {
                id: this.productId,
                img: result.data.img
              })
              if (respBody.code === env.RESP_CODE.SUCCESS) {
                this.productData.img_url = respBody.msg
                toastr.success('更新封面成功！')
              } else {
                toastr.error('更新封面失败！')
              }
            }
          } else {
            toastr.error('更新文本失败！')
          }
        }
        this.editVodalInfo.show = false
      },
      async onConfirmDeleteBtnClick (result) {
        console.log(result)
        if (result) {
          let respBody = await PhotoService.deleteImg(this, {
            id: this.productId,
            img_id: result.extraData
          })
          if (respBody.code === env.RESP_CODE.SUCCESS) {
            toastr.success('删除成功！')
            window.location.reload()
          } else {
            toastr.error('删除失败')
          }
        }
        this.confirmVodalText.show = false
      },      
      onEditBtnClick () {
        this.editVodalInfo.refData = JSON.parse(JSON.stringify(this.productData))
        this.editVodalInfo.show = true
      },
      onAddImgChange (file) {
        console.log(file)
        this.addImgVodalInfo.img = file
      },
      handleImgRemove (file, fileList) {
        this.addImgVodalInfo.imgs = fileList
      },
      async onCreateConfirmBtnClick () {
        let respBody = await PhotoService.addphoto(this, this.imgData)
        if (respBody.code === env.RESP_CODE.SUCCESS) {
          toastr.error('创建成功')
          this.dialogVisible = false
          window.location.reload()
        } else {
          toastr.error('创建失败！')
        }        
        this.addImgDialogVisible = false
      },
      async onEditConfirmBtnClick () {
        let respBody = await PhotoService.update(this, this.productData)
        if (respBody.code === env.RESP_CODE.SUCCESS) {
          toastr.error('修改成功')
          this.dialogVisible = false
          window.location.reload()
        } else {
          toastr.error('修改失败！')
        }        
        this.addImgDialogVisible = false
      },      
      onArtistClick (artistId) {
        this.$router.push({
          name: 'portfolio',
          params: {
            designerId: artistId
          }
        })
      },
      getDateStrFromOBj (obj) {
        return CommonUtils.getDateStrFromOBj(obj)
      },
      getSplitStr (str) {
        return CommonUtils.getSplitStr(str)
      },
      async init () {
        document.title = this.title
        let userAgent = navigator.userAgent
        this.isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') < 1

        await this.getData()
        if (this.seasons.length >= 0) {
          this.curImg = this.seasons[0]
        }
      }
    },
    mounted () {
      this.init()
      this.imgData.id = this.productId
      // this.dataclean ()
    },
    computed: {
      isLogin () {
        return this.checkLogin()
      },

      imgDesc () {
        if (this.productData.introduction.desc) {
          return marked(this.productData.introduction.desc)
        }
        return null
      },

      productIdCom () {
        this.productId = this.$route.params.showId
        this.init()
        return this.$route.params.showId
      },

      tagsText () {
        return this.productData.tags.join(' | ')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../static/css/common";
  @import "../../node_modules/vodal/common.css";
  @import "../../node_modules/vodal/rotate.css";
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(10px);
    opacity: 0;
  }

  .sa-main-container {
    min-height: 800px !important;
  }

  .main-container {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    width: 90%;
    margin: 20px auto;
    height: 100%;
  }

  a {
    color: #827430;
    text-decoration: none;
    line-height: inherit;
  }

  /* left */
  .left {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
  }

  .info {
    background: #f2f2f2;
    padding: 1.25rem;
    // width: 60%;
  }

  .info h3, h4 {
    line-height: 1;
    margin-bottom: 0.626rem;
  }

  .social-item {
    margin: 8px 0;
  }
  .social-item a {
    display: inline-block;
  }

  .info li {
    line-height: 1.2rem;
  }

  .single-page-view {
    width: 60%;
    height: 30px;
    background: #ccc;
    padding: 0.1rem 1.25rem;
    margin-bottom: 1.25rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
  }

  .single-page-view > p {
    padding-top: 5px;
  }

  /* right */
  .right {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
  }

  /* swiper */
  .swiper {
    width: 100%;
  }

  .video-url {
    display: inline-block;
    width: 90%;
    max-width: 600px;

    img {
      width: 100%;
    }
  }

  /* lg-img */
  .lg-img {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    /*border-top: 1px solid gray;*/
    flex-direction: column;
    align-items: center;
    margin: 0.5rem;
  }

  .lg-img img {
    width: 90%;
    max-width: 600px;
    border: 1px solid gray;
    border-bottom: transparent;
  }

  .name {
    padding: 0;
    margin: 0;
    text-align: left;
    border: 1px solid #d8d8d8;
    border-top: transparent;
    background: #FFF;
    width: 90%;
  }

  .name p {
    padding: 1.25rem;
    display: block;
  }

  .artist {
    margin: 0;
    list-style: none;
  }
  .artist li {
    margin: 5px 0;
  }

  .right {
    position: relative;
    .edit-container {
      position: absolute;
      left: -35px;
      top: 0;
    }

    .img-desc {
      margin: 10px 0;
    }
  }
  .vodal-container {
    h3 {
      line-height: 1.5em;
      border-bottom: 1px solid $commonGray;
    }
    footer {
      padding-top: 10px;
      border-top: 1px solid $commonGray;
    }
    .confirm-btn-group {
      margin-top: 4%;
    }
    .confirm-btn-group button {
      width: 35%;
      max-width: 100px;
    }
  }

  @media screen and (max-width: 720px) {
    .main-container {
      flex-direction: column;

      .left {
        width: 100%;
        .info {
          width: 90%;
        }
        .single-page-view {
          width: 90%;
        }
      }
      .right {
        margin-top: 30px;
        width: 100%;
      }
    }
  }
  .item {
    position: absolute;
    width: 95%;
    font-size: 1.2em;
    cursor: pointer;

    img {
      width: 100%;
    }

    .item-info {
      display: none;
      position: absolute;
      /*bottom: 0;*/
      left: 0;
      right: 0;
      padding: 3% 5%;
      background: black;
      color: white;
      font-weight: normal;
      opacity: .6;
      animation: item-info-display .2s;
    }
  }
  .item:hover .item-info {
    display: block;
    bottom: 0;
  }
  @keyframes item-info-display
  {
    from {
      bottom: -50px;
    }
    to {
      bottom: 0;
    }
  }

  @keyframes myfirst2
  {
    from {
      bottom: -50px;
    }
    to {
      bottom: 0;
    }
  }

  .admin-panel {
    position: absolute;
    top: -25px;
    left: 44%;
    z-index: 10;
    width: 50%;

    .add-btn, .edit-btn {
      cursor: pointer;
      margin: 0 3%;
    }
  }

  .icon-group {
    position: absolute;
    right: 8%;
    top: 5%;

    .minus-btn, .edit-btn {
      font-size: 1.5em;
      margin: 5%;
    }

    .icon-lg {
      padding: 5px;
      border-radius: 5px;
      background: #95A5A6;
      font-weight: bold;
    }
  }
  .wtf {  
    margin:0 auto; 
  }
  .small {   
    width: 90%;
    justify-content: center;
    align-items: center;
    margin:0 auto; 
  }
  .ach {
    height: 70px;
    width: 500px;
    background-color: #827430;
    padding-left: 3em;
  }
  .ach > p {
    font-size: 40pt
  }
</style>
