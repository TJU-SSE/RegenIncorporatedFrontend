<template>
    <div class="card">
        <div>
            <!-- <div class="icon"></div> -->
            <div class="imageDiv">
                <img :src="cover" class="image">
            </div>
        </div>
        <div class="info">
            <p class="title">{{title}}</p>
            <div class="bottom clearfix">
            <time class="desc">{{desc}}</time>
            </div>
        </div>
    </div>
</template>  

<style scoped>
  .card {
    margin: 10px;
    border: 0 !important;
    border-radius: 0 !important;
  }

  .info {
      padding-top: 15px;
  }

  .title {
      font-size: 20px;
  }

  .desc {
    font-size: 13px;
    color: #666666;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
  }

  .icon {
      width: 48px;
      height: 48px;
      background: url("../../../static/img/play.svg") center center;
      background-size: 48px 48px;
      opacity: 1;
      margin: auto;
      z-index: 100;
  }

  div div :hover {
      opacity: 1;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

<script>
export default {
  data () {
    return {
      currentDate: new Date()
    }
  },
  props: ['cover', 'title', 'desc', 'isVideo']
}
</script>
