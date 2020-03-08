<!--  -->
<template>
  <div class="music-list-item" @click="startPlay">
    <div class="index" v-if="num">
      <span v-show="!curSong">{{ num }}</span>
      <i class="result yinliang" v-show="curSong"></i>
    </div>
    <div class="content">
      <p class="music-name">{{songName}}</p>
      <p class="music-info">
        <span>
          <span class="music-info-art" v-for="(item,index) in artists" :key="index">{{item.name}}</span>
        </span>
        <span class="album-name">{{albumName}}</span>
      </p>
    </div>
    <div class="slider">
      <i class="result diandiandian"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songName: {
      type: String
    },
    artists: {
      type: Array
    },
    albumName: {
      type: String
    },
    num: {
      type: Number
    },
    curSong: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  created() {
    this.curSong = false
  },
  methods: {
    startPlay() {
      this.$emit('beginSong')
    }
  }
}

</script>

<style lang='less' scoped>
@import url("~style/global.less");
@import url("//at.alicdn.com/t/font_1380711_cftenqb5flc.css");
.music-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.2rem;
  .index {
    color: #999;
  }
  .content {
    display: flex;
    flex-direction: column;
    .music-name {
      width: 75vw;
      max-height: 0.4rem;
      line-height: 0.4rem;
      .ellipsis();
    }
    .music-info {
      font-size: 0.23rem;
      height: 0.4rem;
      line-height: 0.4rem;
      width: 75vw;
      color: #dacdcd;
      .ellipsis();
      .music-info-art {
        &::after {
          content: "/";
        }
        &:last-child::after {
          content: "";
        }
      }
      .album-name {
        &::before {
          content: "-";
        }
      }
    }
  }
  .slider {
    color: #ccc;
  }
}
</style>
