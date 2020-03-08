<!--  -->
<template>
  <div class="banner-container">
    <van-swipe :autoplay="3000" indicator-color="#dd001b">
      <van-swipe-item v-for="(image,index) in bannerList" :key="index">
        <img class="banner-img" :src="image.pic" />
        <span class="title" :style="{background:image.titleColor}">{{image.typeTitle}}</span>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import api from 'api'
export default {
  data() {
    return {
      bannerList: []
    }
  },
  created() {
    this.getBannerSwiper()
  },
  methods: {
    async getBannerSwiper() {
      const res = await api.getBannerSwiper()
      if (res.status === 200 && res.data && res.data.code === 200) {
        this.bannerList = res.data.banners
      }
    }
  }
}

</script>

<style lang='less' scoped>
@import url("~style/global.less");
.banner-container {
  box-sizing: border-box;
  padding: 0.2rem;
  width: 100%;
  overflow: hidden;
  height: 0;
  padding-bottom: 40%;
  .banner-img {
    width: 100%;
    height: 100%;
    border-radius: @imgBorderRadius;
  }
  .title {
    position: absolute;
    right: 0;
    bottom: 0;
    color: #fff;
    font-size: smaller;
    padding: 3px 6px;
    opacity: 0.8;
    border-top-left-radius: @imgBorderRadius;
  }
}
</style>
