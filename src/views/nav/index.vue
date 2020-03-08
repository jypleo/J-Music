<!--  -->
<template>
  <div>
    <nav class="nav-wrapper">
      <div class="nav-left">
        <i class="nav iconnav ripple"></i>
      </div>
      <ul class="nav-center">
        <router-link tag="li" class="nav-title ripple" replace to="/home">我的</router-link>
        <router-link tag="li" class="nav-title ripple" replace to="/find">发现</router-link>
        <router-link tag="li" class="nav-title ripple" replace to="/friend">朋友</router-link>
        <router-link tag="li" class="nav-title ripple" replace to="/videoPage">视频</router-link>
      </ul>
      <div class="nav-right">
        <!-- 注意link时要加上/ 要不然会出现异常情况 -->
        <router-link to="/search" tag="i" class="nav iconsousuo ripple"></router-link>
      </div>
      <div></div>
    </nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created() { },
  methods: {}
}

</script>

<style lang='less' scoped>
@import url("~style/global.less");
@import url("//at.alicdn.com/t/font_1298894_8b2aso7zegl.css");
@height: 1rem;
.navIcon {
  width: @height;
  height: @height;
  text-align: center;
}
.nav-wrapper {
  width: 100%;
  height: @height;
  box-sizing: border-box;
  display: flex;
  padding: 0 0.23rem;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
  line-height: @height;
  background-color: #fff;
  .nav-left {
    display: flex;
    flex: 2;
    justify-content: left;
    .iconnav {
      .navIcon();
    }
  }
  .nav-center {
    display: flex;
    flex: 6;
    color: #999;
    font-size: 0.24rem;
    li {
      flex: 1;
    }
  }
  .nav-right {
    flex: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .iconsousuo {
      .navIcon();
    }
  }
}
</style>
