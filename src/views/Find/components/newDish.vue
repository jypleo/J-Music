<!--  -->
<template>
  <div class="wrapper pd23">
    <div class="title">
      <div class="rec">
        <span :class="{active:type==='newdish'}" @click="type='newdish'">新碟</span>
        <i>|</i>
        <span :class="{active:type==='newsong'}" @click="type='newsong'">新歌</span>
      </div>
      <div class="square">
        <span v-show="type==='newdish'">更多新碟</span>
        <span v-show="type==='newsong'">新歌推荐</span>
      </div>
    </div>
    <div class="img-card-container" v-show="type==='newdish'">
      <img-card
        v-for="item in newDishList"
        :key="item.id"
        :dec="item.name"
        :bacgImg="item.picUrl"
        :id="item.id"
      ></img-card>
    </div>
    <div class="img-card-container" v-show="type==='newsong'">
      <img-card
        v-for="item in newSongList"
        :key="item.id"
        :dec="item.name"
        :bacgImg="item.album.blurPicUrl"
      ></img-card>
    </div>
  </div>
</template>

<script>
import api from 'api'
import utils from 'config/utils'
import ImgCard from 'components/base/imgCard'
export default {
  data() {
    return {
      newDishList: [],
      newSongList: [],
      type: 'newdish'
    }
  },
  components: {
    ImgCard
  },
  created() {
    this.getNewDishList()
    this.getNewSongsList()
  },
  methods: {
    async getNewDishList() {
      const res = await api.getNewDishAPI()
      if (res.status === 200 && res.data && res.data.code === 200) {
        this.newDishList = utils.getRandElmentFromArry(res.data.albums, 3)
      }
    },
    async getNewSongsList() {
      const res = await api.getNewSongsAPI()
      if (res.status === 200 && res.data && res.data.code === 200) {
        this.newSongList = utils.getRandElmentFromArry(res.data.data, 3)
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
    margin-top: 0.4rem;
    .rec {
      font-size: 0.24rem;
      .active {
        font-size: 0.3rem;
        font-weight: 700;
      }
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
