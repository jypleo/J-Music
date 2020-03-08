<!--  -->
<template>
  <div class="play-page">
    <div class="mask" v-show="isFull"></div>
    <div class="content pd23" v-show="isFull">
      <j-nav class="nav" @returnPage="returnPage">
        <div class="nav-info">
          <p class="title">{{name}}</p>
          <p class="arts">
            <span class="art" v-for="(item,index) in artists" :key="index">{{item.name}}</span>
          </p>
        </div>
      </j-nav>
      <playing :imgUrl="imgUrl" v-show="playingShow"></playing>
      <fun-buttons :isLike="isLike" @update_isLike="update_isLike"></fun-buttons>
      <bar :allTime="totalTime" :time="playTime" :width="progressWidth" @time="changeTime"></bar>
      <play-menu></play-menu>
    </div>
    <small-audio
      v-show="!isFull"
      :imgUrl="imgUrl"
      @returnFull="returnFull"
      @play="toggle"
      @changeMode="changeMode"
      @showAudioList="showAudioList"
      :name="name"
      :artist="artists"
      :mode="palyMode"
      :lyric="nowLyric"
    ></small-audio>
    <audio
      :src="url"
      ref="audio"
      autoplay
      @canplay="ready"
      @error="error"
      preload="auto"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import api from 'api'
import JNav from 'components/base/JNav'
import Playing from './components/playing'
import Bar from './components/bar'
import PlayMenu from './components/playMenu'
import FunButtons from './components/funButtons'
import SmallAudio from './components/small'
import { mapGetters, mapMutations } from 'vuex'
import utils from 'config/utils'
export default {
  components: {
    JNav,
    Playing,
    Bar,
    PlayMenu,
    FunButtons,
    SmallAudio
  },
  data() {
    return {
      url: '',
      totalTime: 0,
      playTime: '00:00',
      progressWidth: 0,
      imgUrl: '',
      artists: '',
      palyTime: 0,
      name: '',
      nowLyric: '',
      isShowAudioList: false,
      isLike: false
    }
  },
  computed: {
    ...mapGetters({
      curPlayMusic: 'AUDIO_ING_SONG',
      palyState: 'PLAY_STATE',
      curPlayIndex: 'AUDIO_ING_INDEX',
      musicList: 'AUDIO_LIST',
      isFull: 'FULL_SCREEN',
      palyMode: 'MODE',
      playList: 'PLAY_LIST',
      offsetLyric: 'OFFSET_LYRIC',
      playingShow: 'PLAYING_SHOW'
    })
  },
  filters: {
    setName: function (val) {
      const reg = /<\/?.+?\/?>/g
      val = val.replace(reg, '')
      return val
    }
  },
  watch: {
    curPlayMusic(newVal, oldVal) {
      console.log('newval', newVal)
      if (newVal === oldVal) return
      this.$nextTick(() => {
        this.checkMusic(newVal.id) // 检查音乐是否能播放，取得歌曲url开始播放
        this.totalTime = newVal.duration ? newVal.duration
          : newVal.dt ? newVal.dt : ''
        this.artists = newVal.album ? newVal.album.artists
          : newVal.ar ? newVal.ar : ''
        this.imgUrl = newVal.album ? newVal.album.picUrl
          : newVal.al ? newVal.al.picUrl
            : newVal.album ? newVal.album.artist.img1v1Url
              : newVal.coverUrl ? newVal.coverUrl : ''
        this.name = this.setName(newVal.name)
      })
    }
  },
  created() { },
  methods: {
    /**
   * 去除名字的标签
   */
    setName(val) {
      const reg = /<\/?.+?\/?>/g
      val = val.replace(reg, '')
      return val
    },
    async checkMusic(id) {
      const res = await api.checkMusic(id)
      if (res.data.success) {
        this.getMusicUrl(id)
      }
    },
    async getMusicUrl(id) {
      const { data } = await api.getMusicUrl(id)
      if (data.code === 200) {
        this.url = data.data[0].url
        this.audioTimeUpdate()
        this.toPlay()
      }
    },
    /**
   * 添加歌曲时间更新事件
   */
    audioTimeUpdate() {
      this.$refs.audio.addEventListener('timeupdate', this.setTime)
    },
    /**
     * 播放歌曲
     */
    toPlay() {
      this.$refs.audio.play()
      this.setState(true)
    },
    /**
   * 暂停歌曲
   */
    toPause() {
      this.$refs.audio.pause()
      this.setState(false)
    },
    /**
     * 转换为小播放器
     */
    returnPage() {
      this.setFull(false)
    },
    /**
     * 转换为大播放器
     */
    returnFull() {
      this.setFull(true)
    },
    /**
     * 播放暂停事件
     */
    toggle() {
      if (this.palyState) {
        this.toPause()
      } else {
        this.toPlay()
      }
    },
    /**
     * 改变歌曲播放模式
     */
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setMode(mode)
      let shufflePlayList
      if (mode === 2) {
        shufflePlayList = utils.getShuffleArry(this.list)
      } else {
        shufflePlayList = this.list
      }
      this.resetCurrentIndex(shufflePlayList)
      this.setPlayList(shufflePlayList)
    },
    /**
    * 设置当前播放索引
    * 当在切换随机播放时，通过寻找原来的歌曲id来实现不会切换歌曲index
    */
    resetCurrentIndex(list) {
      const index = list.findIndex(item => {
        return item.id === this.curPlayMusic.id
      })
      this.setIndex(index)
    },
    /**
    * 显示歌曲列表
    */
    showAudioList() {
      console.log('列表信息')
      this.isShowAudioList = !this.isShowAudioList
    },
    /**
   *  当浏览器可以播放资源时
   */
    ready() {
      this.readySong = true
    },
    /**
    * 当在资源加载期间发生错误时
    */
    error() {
      this.readySong = true
    },
    /**
     * 当歌曲播放完成之后
     * 根据不同的播放模式进行不同的事件
     */
    end() {
      switch (this.mode) {
        case 0:
          this.nextSong()
          break
        case 1:
          this.loop()
          break
        case 2:
          this.nextSong()
          break
      }
    },
    /**
    * 更新当前歌曲喜欢状态
    */
    update_isLike(val) {
      this.isLike = val
    },
    /**
    * 设置进度条长度
    */
    setProgress(val) {
      if (val < 0 || val > 100) {
        return
      }
      this.progressWidth = val
    },
    /**
    * 当改变进度条时改变歌曲播放时间
    */
    changeTime(time) {
      console.log(time)
      const audio = this.$refs.audio
      const current = time * audio.duration / 100
      audio.currentTime = current
    },
    /**
     * 设置当前播放时长
     */
    setTime() {
      // 首先我们计算到当前的播放时间
      const audio = this.$refs.audio
      const minutes = Math.floor(audio.currentTime / 60)
      const seconds = Math.floor(audio.currentTime - minutes * 60)
      let minuteValue = ''
      let secondValue = ''
      // 进行格式转换，当分钟小于10的时候，在前面加0
      if (minutes < 10) {
        minuteValue = '0' + minutes
      } else {
        minuteValue = minutes
      }
      // 秒数的格式设置
      if (seconds < 10) {
        secondValue = '0' + seconds
      } else {
        secondValue = seconds
      }
      // 进行时间值拼接，展示到页面
      const audioTime = minuteValue + ':' + secondValue
      this.playTime = audioTime
      // // 进度条的长度计算
      const barLength = audio.currentTime / audio.duration * 100
      this.setProgress(barLength)
      // 设置歌词偏移
      // const playTime = audio.currentTime + this.offsetLyric
      // const index = this.getCurrentIndex(playTime, this.ruleLyric)
      // this.nowLyricIndex = index
      // 设置歌词显示
      // this.showLyric(index, this.ruleLyric)
      // 设置歌词页面的显示规则,传入当前歌词索引信息
      // this.$refs.lyric.setCurrent(this.nowLyricIndex)
    },
    ...mapMutations({
      setState: 'SET_PLAY_SATE',
      setIndex: 'SET_AUDIO_INDEX',
      setFull: 'SET_FULL_SCREEN',
      setMode: 'SET_AUDIO_MODE',
      setPlayList: 'SET_PLAY_LIST',
      setPlayingShow: 'SET_PLAYING_SHOW'
    })
  }
}

</script>

<style lang='less' scoped>
@import url("//at.alicdn.com/t/font_1410851_orgxdud5s8j.css");
@import url("~style/global.less");
.content {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background-color: #7f8c8d;
  .nav {
    height: 0.7rem;
    color: #fff;
    .nav-info {
      .title {
        line-height: 0.35rem;
        font-size: 0.28rem;
      }
      .arts {
        line-height: 0.25rem;
        font-size: 0.24rem;
        color: #bdc3c7;
        .art {
          &::after {
            content: "/";
          }
          &:last-child::after {
            content: "";
          }
        }
      }
    }
  }
}
</style>
