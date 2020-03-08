<!--  -->
<template>
  <div class="wrapper pd23">
    <div class="title">
      <div class="rec">推荐歌单</div>
      <div class="square">歌单广场</div>
    </div>
    <div class="img-card-container">
      <img-card
        v-for="item in songList"
        :key="item.id"
        :dec="item.name"
        :bacgImg="item.coverImgUrl"
        :id="item.id"
        :playCount="item.playCount"
      ></img-card>
    </div>
  </div>
</template>

<script>
import ImgCard from 'components/base/imgCard'
import api from 'api'
import utils from 'config/utils'
export default {
  data() {
    return {
      songList: []
    }
  },
  components: {
    ImgCard
  },
  created() {
    this.getRecSongList()
  },
  methods: {
    async getRecSongList() {
      const res = await api.getSongList()
      if (res.status === 200 && res.data && res.data.code === 200) {
        this.songList = utils.getRandElmentFromArry(res.data.playlists, 6)
        console.log(this.songList)
      }
    }
  }
}

</script>

<style lang='less' scoped>
@import url("~style/global.less");
.wrapper {
  .title {
    height: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    .rec {
      font-size: 0.3rem;
      font-weight: 700;
    }
    .square {
      box-sizing: border-box;
      margin-left: auto;
      font-size: 0.2rem;
      border: 1px solid #ccc;
      padding: 0.1rem;
      border-radius: 0.23rem;
      letter-spacing: 0.05rem;
    }
  }
  .img-card-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
