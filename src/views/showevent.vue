<template>
  <div>
    <el-row>
      <carousel :products="products"></carousel>
    </el-row>
    <el-row><p></p></el-row>
    <el-row><p></p></el-row>
    <el-row><p></p></el-row>
    <el-row>
      <div class="title">NEWEST SHOW/EVENT</div>
      <div class="small">  
        <div class="followers">
          <el-row>
           <el-col :span="1"><p></p></el-col> 
           <el-col :span="6"> 
              <item-card></item-card>
           </el-col>
           <el-col :span="1"><p></p></el-col>   
          </el-row>
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
          <!-- <el-row><p class="dname">{{item.title}}</p></el-row> -->
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>    
        </div>            
      </div>
        <!-- <ItemCard v-for="item in products" :title="item.title" :cover="item.img_url" :desc="item.session"></ItemCard> -->
    </el-row>
  </div>
</template>

<script>
  import toastr from 'toastr'
  import ProductService from '@/service/ProductService'
  import env from '@/config/env'
  import carousel from '@/views/components/carousel'
  import ItemCard from '@/views/components/ItemCard'

  export default {
    data: function () {
      return {
        products: [],
        t: 'aa'
      }
    },
    props: ['imgs'],
    components: {
      carousel,
      ItemCard
    },
    methods: {
      onItemClick (productId) {
        this.$router.push({
          name: 'showDisplay',
          params: {
            showId: productId
          }
        })
      },
      async getItems () {
        let respBody = await ProductService.getAll(this, 1)
        if (respBody.code === env.RESP_CODE.SUCCESS) {
          this.products = respBody.msg.products
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
</style>

