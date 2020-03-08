<!--  -->
<template>
  <div class="bottom-audio border-top pd23">
    <div class="icon">
      <img :src="imgUrl" alt />
    </div>
    <div class="info">
      <p class="name">{{name}}</p>
      <p class="arts">{{lyric | emptyCon}}</p>
    </div>
    <div class="func">
      <span class="play">
        <i
          class="audio"
          @click.stop="play"
          :class="{audiozantingtingzhi: isPlay, audiobofang2: !isPlay}"
        ></i>
      </span>

      <i class="menu audio audioliebiao" @click.stop="showAudioList"></i>
    </div>
  </div>
</template>

<script>
import { audio } from 'config/Mixins'
import { mapGetters } from 'vuex'
export default {
  mixins: [audio],
  props: {
    imgUrl: {
      type: String
    },
    name: {
      type: String
    },
    lyric: {
      type: String
    },
    artist: {
      type: [Array, String]
    }
  },
  computed: {
    ...mapGetters({ isPlay: 'PLAY_STATE' })
  },
  filters: {
    emptyCon: function (val) {
      if (!val) {
        return '-'
      }
      return val
    }
  },
  data() {
    return {
    }
  },
  created() { },
  methods: {
    play() {
      this.$emit('play')
    },
    returnFull() {
      this.$emit('returnFull')
    }
  }
}

</script>

<style lang='less' scoped>
@import url("~style/global.less");
.bottom-audio {
  height: 1rem;
  display: flex;
  align-items: center;
  width: 100vw;
  position: fixed;
  bottom: 0;
  z-index: 9;
  background-color: #fff;
  .icon {
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    overflow: hidden;
    transform-origin: center;
    animation: rotating 24s linear infinite;
    img {
      width: 0.7rem;
      height: 0.7rem;
    }
  }
  .info {
    margin-left: 0.16rem;
    width: 4.6rem;
    .name {
      .ellipsis();
      font-size: 0.26rem;
      line-height: 1.5;
    }
    .arts {
      .ellipsis();
      font-size: 0.2rem;
      line-height: 1.5;
    }
  }
  .func {
    .audio {
      box-sizing: border-box;
      margin-left: 0.12rem;
      font-size: 0.4rem;
    }
    .play {
      display: inline-block;
      text-align: center;
      line-height: 0.4rem;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
      margin-left: 0.1rem;
      .audio {
        margin-left: 0;
        font-size: 0.3rem;
      }
    }
  }
}
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
