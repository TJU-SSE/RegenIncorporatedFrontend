<template>
  <div>
    <el-row>
    </el-row>
    <el-row>

    </el-row>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
      }
    },
    props: ['imgs'],
    components: {
    },
    methods: {
    },
    mounted () {
    },
    computed: {
    }
  }
</script>

<style scoped lang="scss">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .carousel{
    width: 70%;
    align-content: center;
    align-items: center;
    text-align:center;
    margin:0 auto
  }
</style>
