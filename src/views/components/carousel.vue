<template>
  <div>
    <el-row>
      <div class="carousel">
        <div >
          <el-carousel autoplay="false" type="card" height="700px" arrow="always">
            <el-carousel-item v-for="item in products">
                <div class="cimg" style="height: 100%; width: 100%">
                  <img class="img"  :src="item.img_url" @click="onItemClick(item.id)">
                </div>
            </el-carousel-item>
          </el-carousel>  
        </div>      
      </div>
    </el-row>
    <el-row>

    </el-row>
  </div>
</template>

<script>

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
      onItemClick (productId) {
        this.$router.push({
          name: 'showDisplay',
          params: {
            showId: productId
          }
        })
      }
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
</style>

