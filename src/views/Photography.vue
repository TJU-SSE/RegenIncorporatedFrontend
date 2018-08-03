<template>
  <div>
    <el-row>
      <photocarousel :products="products"></photocarousel>
    </el-row>
    <el-row><p></p></el-row>
    <el-row><p></p></el-row>
    <el-row><p></p></el-row>
    <el-row>
        <div class="title">PHOTOGRAPHY</div>
      <div class="small">
        
        <div class="followers">
        <div v-for="(item, index) in products" :key="index" class="follower">
          <el-row>
           <el-col :span="1"><p></p></el-col> 
           <el-col :span="6"> 
              <img :src="item.imgUrl" class="smallimg" :border="false" @click="onItemClick (item.designerId)"/>
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
    </el-row>
  </div>
</template>

<script>
  import toastr from 'toastr'
  import ArtistService from '@/service/ArtistService'
  import env from '@/config/env'
  import photocarousel from '@/views/components/photocarousel'
  import ItemCard from '@/views/components/ItemCard'

  export default {
    data: function () {
      return {
        products: []
      }
    },
    props: ['imgs'],
    components: {
      photocarousel,
      ItemCard
    },
    methods: {
      onItemClick (productId) {
        this.$router.push({
          name: 'portfolio',
          params: {
            designerId: productId
          }
        })
      },
      async getItems () {
        let respBody = await ArtistService.getAllByIdentity(this, {
          identity: 'styling',
          pageOffset: 1
        })
        if (respBody.code === env.RESP_CODE.SUCCESS) {
          this.products = respBody.msg.artists
          console.log('here')
          console.log(this.products)
        } else {
          toastr.error('加载数据失败！')
        }
      }
    },
    mounted () {
      this.getItems()
    },
    computed: {
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
      width: 300px;
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
</style>

