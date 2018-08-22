<template>
  <div>
    <el-row>
      <carousel :products="banners"></carousel>
    </el-row>
    <el-row><p></p></el-row>
    <el-row><p></p></el-row>
    <el-row><p></p></el-row>
    <el-row>
      <div class="manage_icon" v-if="isLogin">
        <el-button type="danger" icon="el-icon-circle-plus" circle @click="createProductInfo.show = true"></el-button>
      </div>
      <ProductInput :show="createProductInfo.show"
                  @hide="createProductInfo.show = false"
                  :title="createProductInfo.title"
                  @onConfirmBtnClick="onConfirmBtnClick"></ProductInput>
      <InputVodal :vodalText="updateVodalInfo"
                  :show="updateVodalInfo.show"
                  @hide="updateVodalInfo.show = false"
                  @onConfirmBtnClick="onChangeRank"
                  :extraData="updateVodalInfo.extraData">
      </InputVodal>  
      <ConfirmVodal :vodalText="confirmVodalText"
                      :show="confirmVodalText.show"
                      @hide="confirmVodalText.show = false"
                      @onConfirmBtnClick="onConfirmDeleteBtnClick"
                      :extraData="confirmVodalText.extraData">
                      </ConfirmVodal>          
      <div class="title">     
        NEWEST SHOW/EVENT
      </div>
      <div class="small" >  
        <!-- <div class="followers">
          <el-row>
           <el-col :span="1"><p></p></el-col> 
           <el-col :span="6"> 
              <item-card></item-card>
           </el-col>
           <el-col :span="1"><p></p></el-col>   
          </el-row>
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
          <el-row><p class="dname">{{item.title}}</p></el-row>
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>    
        </div>             -->
        <div class="followers">
        <div v-for="(item, index) in products" :key="index" class="follower">
          <el-row>
           <el-col :span="1"><p></p></el-col> 
           <el-col :span="6"> 
             <div class="manage_icon" v-if="isLogin">
               <!-- <el-button type="danger" icon="el-icon-edit" circle></el-button> -->
               <el-button type="danger" icon="el-icon-delete" circle @click="onDeleteBtnClick(item.id)"></el-button>
                       
               <el-button type="danger" icon="el-icon-sort" circle @click="onAddBanner(item.id)"></el-button>
               <el-button type="danger" @click="onUpdateBtnClick(item.id, item.banner_rank)">rank: {{item.banner_rank}}</el-button>
             </div>           
              <img :src="item.img_url" class="smallimg" :border="false" @click="onItemClick (item.id)"/>
           </el-col>
           <el-col :span="1"><p></p></el-col>   
          </el-row>
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
          <el-row><p class="dname">{{item.title}}</p></el-row>
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
        </div>        
        </div>          
      </div>
        <!-- <ItemCard v-for="item in products" :title="item.title" :cover="item.img_url" :desc="item.session"></ItemCard> -->
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import toastr from 'toastr'
  import ProductService from '@/service/ProductService'
  import env from '@/config/env'
  import carousel from '@/views/components/carousel'
  import ItemCard from '@/views/components/ItemCard'
  import ProductInput from '@/views/admin/components/ProductInput'
  import ConfirmVodal from '@/views/components/ConfirmVodal'
  import InputVodal from '@/views/components/InputVodal'
  export default {
    data: function () {
      return {
        products: [],
        banners: [],
        t: 'aa',
        updateVodalInfo: {
          show: false,
          extraData: null,
          title: '修改',
          content: '更新rank',
          placeholder: 'input rank',
          inputText: null
        },
        confirmVodalText: {
          title: '删除',
          content: '是否删除这条首页信息？',
          extraData: null,
          show: false
        },
        createProductInfo: {
          show: false,
          title: '创建Product'
        }
      }
    },
    props: ['imgs'],
    components: {
      carousel,
      ItemCard,
      ProductInput,
      ConfirmVodal,
      InputVodal
    },
    methods: {
      ...mapGetters({
        checkLogin: 'checkLogin'
      }),
      onItemClick (productId) {
        this.$router.push({
          name: 'showDisplay',
          params: {
            showId: productId
          }
        })
      },
      async getItems () {
        let respBody = await ProductService.getOutsideBannerItems(this)
        if (respBody.code === env.RESP_CODE.SUCCESS) {
          this.products = respBody.msg.products
        } else {
          toastr.error('加载数据失败！')
        }
      },
      async getBannerItems () {
        let respBody = await ProductService.getInsideBannerItems(this)
        if (respBody.code === env.RESP_CODE.SUCCESS) {
          this.banners = respBody.msg.products
        } else {
          toastr.error('加载数据失败！')
        }
      },
      async onConfirmBtnClick (result) {
        if (result.result) {
          let respBody = await ProductService.create(this, result.data)
          if (respBody.code === env.RESP_CODE.SUCCESS) {
            window.location.reload()
            toastr.success('创建成功！')
          } else {
            toastr.error('创建失败！')
          }
          this.createProductInfo.show = false
        }
      },
      async onConfirmDeleteBtnClick (result) {
        if (result.result) {
          let respBody = await ProductService.delete(this, {
            id: result.extraData
          })
          if (respBody.code === env.RESP_CODE.SUCCESS) {
            toastr.success('删除成功！')
            window.location.reload()
          } else {
            toastr.error('删除失败！')
          }
        }
        this.confirmVodalText.show = false
      },
      async onAddBanner (result) {
        console.log('the id')
        console.log(result)
        let respBody = await ProductService.updateShow(this, {
          id: result, banner: true
        })
        if (respBody.code === env.RESP_CODE.SUCCESS) {
          window.location.reload()
        } else {
          toastr.error('失败！')
        }
      },
      async onChangeRank (result) {
        console.log('the id')
        console.log(result)
        let index = result.extraData
        let rank = parseFloat(result.inputText)
        let respBody = await ProductService.updateShow(this, {
          id: index, banner_rank: rank
        })
        if (respBody.code === env.RESP_CODE.SUCCESS) {
          this.updateVodalInfo.show = false
          window.location.reload()
        }
        this.updateVodalInfo.show = false
      },
      onDeleteBtnClick (productId) {
        this.confirmVodalText.extraData = productId
        this.confirmVodalText.show = true
      },
      onUpdateBtnClick (index, brank) {
        this.updateVodalInfo.extraData = index
        this.updateVodalInfo.inputText = brank
        this.updateVodalInfo.show = true
      }
    },
    mounted () {
      this.getItems()
      this.getBannerItems()
    },
    computed: {
      isLogin () {
        return this.checkLogin()
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-carousel__item h3 {
    color: #000000;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
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
  .followers {
    display: flex;
    flex-wrap: wrap;
    border: 0px solid #dcdfe6;
    padding: 20px 15px 15px;
    justify-content: space-around;
    font-weight: 300;
    letter-spacing: 1px;
    width: 80%;background: #caab72;
  }
  .follower {
    text-align: center;
    font-size: 12px;
    margin: 3px;
  }   
  .smallimg{
      width: 400px;
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
    width: 80%;background: #caab72;
    margin:0 auto; 
    font-weight: bolder;
    font-size: 30pt;
  }
  .dname{
    font-size: 15px;
    font-weight: bolder;
  }  
  .manage_icon{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

