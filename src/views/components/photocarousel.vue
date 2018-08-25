<template>
  <div>
    <el-row>
      <div class="carousel">
        <div >
          <el-carousel height="700px" arrow="always">
            <el-carousel-item v-for="item in products"
             :style="{'background-image': 'url('+ item.imgUrl +')','cursor': 'pointer', 'background-size': 'auto 100%','background-repeat':'no-repeat','background-position':'center'}">
              <div class="manage_icon" v-if="isLogin">
               <!-- <el-button type="danger" icon="el-icon-delete" circle></el-button> -->
               <el-button type="danger" icon="el-icon-sort" circle @click="onDelBanner(item.id)"></el-button>
             </div>
             <div :style="{'height': '100%','width':'100%'}" @click="onItemClick(item.id)">

                                
            <div class="slide-cover">
            <div class="text">
              <div>
                <h1>{{item.title}}</h1>
              </div>
            </div>
          </div>
             </div> 
            </el-carousel-item>
          </el-carousel>  
        </div>      
      </div>
      <!-- <div class="carousel">
        <div >
          <el-carousel type="card" height="700px" arrow="always">
            <el-carousel-item v-for="item in products">
                <div class="cimg" style="height: 100%; width: 100%">
                  <img class="img"  :src="item.imgUrl" @click="onItemClick(item.designerId)">
                </div>
            </el-carousel-item>
          </el-carousel>  
        </div>      
      </div> -->
    </el-row>
    <el-row>

    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import toastr from 'toastr'
  import ProductService from '@/service/ProductService'
  import env from '@/config/env'
  export default {
    data: function () {
      return {
        // products: []
      }
    },
    props: ['products'],
    components: {
    },
    methods: {
      ...mapGetters({
        checkLogin: 'checkLogin'
      }),
      onItemClick (productId) {
        this.$router.push({
          name: 'portfolio',
          params: {
            designerId: productId
          }
        })
      },
      async onDelBanner (result) {
        console.log('the id')
        console.log(result)
        let respBody = await ProductService.updateShow(this, {
          id: result, banner: false
        })
        if (respBody.code === env.RESP_CODE.SUCCESS) {
        } else {
          toastr.error('失败！')
        }
      }
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
  .dname{
    font-size: 15px;
    font-weight: bolder;
  }
  .manage_icon{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
  }  
  .text {
    color: white;
    position: relative;
    left: 50px;
    top: 400px;
  }

  .text > div {
    // text-align: center;
    background-color: burlywood;
    padding-right: 0.5em;
    padding-left: 0.5em;
  }

  .text h1{
    font-family: Bernard;
    font-weight: bolder;
    font-size: 3em;
  }
  .text p{
    font-family: Bernard;
    font-weight: bold;
    font-size: 2.5em;
  }
  .slide-cover{
    // margin-right: 5%;
    // margin-left: 5%;
    // height: 90%;
    cursor: pointer;
    display: flex;
    // justify-content: center;
    // align-items: center;
  }    
</style>

