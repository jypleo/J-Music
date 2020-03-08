<!--  -->
<template>
  <van-pull-refresh class="container" ref="wrapper" v-model="isLoading" @refresh="onRefresh">
    <swipe></swipe>
    <icons></icons>
    <rec-song-list></rec-song-list>
    <new-dish></new-dish>
    <top-tip ref="tip">
      <span class="tips">{{tips}}</span>
    </top-tip>
  </van-pull-refresh>
</template>

<script>
import Swipe from './components/swipe'
import Icons from './components/icons'
import RecSongList from './components/recommendSongList'
import newDish from './components/newDish'
export default {
  data() {
    return {
      isLoading: false,
      tips: '已为你推荐更多有趣的内容'
    }
  },
  components: {
    Swipe,
    Icons,
    RecSongList,
    newDish
  },
  created() { },
  mounted() {
    this.$refs.tip.showTip()
  },
  methods: {
    onRefresh() {

    }
  }
}

</script>

<style lang='less' scoped>
@import url("//at.alicdn.com/t/font_1295705_yfxum6q2gip.css");
.tips {
  box-sizing: border-box;
  font-size: 0.23rem;
  border-radius: 0.3rem;
  padding: 0.1rem 0.2rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
