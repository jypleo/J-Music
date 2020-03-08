<!--  -->
<template>
  <div class="img-card" :style="{width}" @click="toDetail()">
    <span class="tag" v-if="playCount">
      <i class="card cardbofang"></i>
      {{playCount | setPlayCount}}
    </span>
    <div class="img-card-pic">
      <img :src="bacgImg + '?param=200y200'" class="image" />
    </div>
    <div class="dec">{{ dec }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'album' // 默认歌单，dish:专辑
    },
    dec: {
      type: String
    },
    bacgImg: {
      type: String
    },
    id: {
      type: Number
    },
    playCount: {
      type: Number
    },
    width: {
      type: String,
      default: '2.1rem'
    }
  },
  filters: {
    setPlayCount: function (val) {
      if (!val) {
        return ''
      }
      if (val > 100000000) {
        val = ((val / 100000000).toFixed(1)) + '亿'
      } else if (val > 10000) {
        val = Math.floor(val / 10000) + '万'
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
    toDetail() {
      this.$router.push({ name: 'albumPage', params: { type: this.type, pageId: this.id } })
    }
  }
}

</script>

<style lang='less' scoped>
@import url("//at.alicdn.com/t/font_1396631_tp8pq8axas.css");
@import url("~style/global.less");
.img-card {
  position: relative;
  margin-top: 0.3rem;
  .tag {
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
    font-size: 0.2rem;
    color: #fff;
    .cardbofang {
      font-size: 0.18rem;
    }
  }
  .img-card-pic {
    border-radius: 0.2rem;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .dec {
    .twoLinesEllipsis();
    font-size: 0.23rem;
    margin-top: 0.2rem;
    letter-spacing: 1px;
    line-height: 0.3rem;
  }
}
</style>
