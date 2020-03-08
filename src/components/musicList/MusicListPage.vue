<!--  -->
<template>
  <div class="warpper">
    <div class="top">
      <j-nav class="pd23 fixed" @returnPage="returnPage">歌单</j-nav>
      <div class="ablum-info pd23">
        <div class="ablum-info-top">
          <div class="ablum-info-topl">
            <img :src="imgUrl" alt />
            <span>
              <i class="date-song bofang"></i>
              {{playCount | setPlay}}
            </span>
          </div>
          <div class="ablum-info-topr">
            <p class="album-title">{{albumTitle}}</p>
            <div class="creator">
              <div class="img-info">
                <img :src="creatorImgUrl + '?param=200y200'" alt />
              </div>
              <span>
                {{author}}
                <i class="date-song iconfontjiantou5"></i>
              </span>
            </div>
            <div class="dec-wrapper">
              <span>{{description}}</span>
              <i class="date-song iconfontjiantou5"></i>
            </div>
          </div>
        </div>
        <div class="ablum-info-link">
          <div class="comments" @click="goComments">
            <i class="date-song pinglun"></i>
            <span>{{commentCount | setCom}}</span>
          </div>
          <div class="comments">
            <i class="date-song fenxiang"></i>
            <span>{{shareCount | setShare}}</span>
          </div>
          <div class="comments">
            <i class="date-song xiazai"></i>
            <span>下载</span>
          </div>
          <div class="comments">
            <i class="date-song duoxuankuang"></i>
            <span>多选</span>
          </div>
        </div>
      </div>
    </div>
    <div class="play pd23">
      <div>
        <span class="play-all">
          <i class="date-song cbofang"></i>播放全部
        </span>
        <span class="count">(共{{musicCount}}首)</span>
      </div>
      <div class="collection">+ 收藏({{subscribedCount | setCol}})</div>
    </div>
    <div class="info">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import JNav from 'components/base/JNav'

const setNum = function (val) {
  if (!val) {
    return ''
  }
  if (val > 100000000) {
    val = ((val / 100000000).toFixed(1)) + '亿'
  } else if (val > 10000) {
    val = ((val / 10000).toFixed(1)) + '万'
  }
  return val
}
export default {
  data() {
    return {
    }
  },
  props: {
    playCount: {
      type: Number
    },
    imgUrl: {
      type: String
    },
    author: {
      type: String
    },
    description: {
      type: String
    },
    albumTitle: {
      type: String
    },
    creatorImgUrl: {
      type: String
    },
    commentCount: {
      type: Number
    },
    shareCount: {
      type: Number
    },
    musicCount: {
      type: Number
    },
    subscribedCount: {
      type: Number
    }
  },
  components: {
    JNav
  },
  filters: {
    setCom: function (val) {
      if (!val) {
        return '评论'
      }
      return setNum(val)
    },
    setShare: function (val) {
      if (!val) {
        return '分享'
      }
      return setNum(val)
    },
    setCol: function (val) {
      if (!val) {
        return ''
      }
      return setNum(val)
    },
    setPlay: function (val) {
      if (!val) {
        return ''
      }
      return setNum(val)
    }
  },
  created() { },
  methods: {
    returnPage() {
      this.$router.go(-1)
    },
    goComments() {

    }
  }
}

</script>

<style lang='less' scoped>
@import url("//at.alicdn.com/t/font_1394963_t6jt71rtm9.css");
@import url("~style/global.less");
.topFixed {
  position: fixed;
  width: 100%;
  height: 1rem;
  background-color: #ee5253;
  z-index: 9;
}
.fixed {
  .topFixed();
  top: 0;
}
.warpper {
  height: 100vh;
  position: relative;
  overflow: scroll;
  .top {
    height: 6rem;
    background-color: #ee5253;
    color: #fff;
    width: 100%;
    .ablum-info {
      padding-top: 1.5rem;
      .ablum-info-top {
        display: flex;
        justify-content: space-between;
        height: 3rem;
        .ablum-info-topl {
          height: 2.6rem;
          width: 2.6rem;
          position: relative;
          border-radius: 0.2rem;
          overflow: hidden;
          img {
            width: 100%;
          }
          span {
            position: absolute;
            top: 0.1rem;
            right: 0.1rem;
            font-size: 0.28rem;
            color: #fff;
            i {
              font-size: 0.15rem;
            }
          }
        }
        .ablum-info-topr {
          width: 3.6rem;
          height: 2.6rem;
          display: flex;
          flex-direction: column;
          .album-title {
            font-size: 0.36rem;
            line-height: 1.5;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            overflow: hidden;
            -webkit-box-orient: vertical;
          }
          .creator {
            height: 1rem;
            color: #ccc;
            display: flex;
            align-items: center;
            .img-info {
              width: 0.6rem;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 100%;
              }
            }
          }
          .dec-wrapper {
            color: #ccc;
            display: flex;
            align-items: center;
            span {
              width: 3rem;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              overflow: hidden;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
      .ablum-info-link {
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin-top: 0.1rem;
        .comments {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          i {
            font-size: 0.4rem;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
  .play {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.3rem;
    .play-all {
      i {
        margin-right: 0.08rem;
      }
    }
    .count {
      font-size: 0.23rem;
      color: #999;
    }
    .collection {
      font-size: 0.25rem;
      box-sizing: border-box;
      color: #fff;
      height: 0.7rem;
      padding: 0 0.23rem;
      line-height: 0.7rem;
      margin-top: 0.05rem;
      background-color: #dd001b;
      border-radius: 0.4rem;
    }
  }
  .info {
    box-sizing: border-box;
    width: 100%;
    padding: 0.1rem 0.23rem;
  }
}
</style>
