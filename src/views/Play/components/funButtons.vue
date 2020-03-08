<!--  -->
<template>
  <div class="wrapper">
    <i
      class="audio"
      @click="changeLikeStatus(curPlayMusic.id)"
      :class="{audioshoucang: isLike, audioshoucang1:!isLike}"
    ></i>
    <i class="audio audioxiazai"></i>
    <i class="audio audiocaidan"></i>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from 'api'
export default {
  props: {
    isLike: {
      type: Boolean
    }
  },
  data() {
    return {
    }
  },
  computed: {
    _isLike: {
      get() {
        return this.isLike
      },
      set(val) {
        this.$emit('update_isLike', val)
      }
    },
    ...mapGetters({ curPlayMusic: 'AUDIO_ING_SONG' })
  },
  created() { },
  methods: {
    /**
    * 添加喜欢歌曲
    * 删除已喜欢歌曲
    */
    async changeLikeStatus(id) {
      const { data } = await api.setLikeMusic(id, !this.isLike)
      if (data.code === 200) {
        // 成功
        this._isLike = !this.isLike
      }
    }
  }
}

</script>

<style lang='less' scoped>
.wrapper {
  display: flex;
  justify-content: space-around;
  color: #fff;
  align-items: center;
  .audio {
    font-size: 0.5rem;
    color: #bdc3c7;
    &.audioshoucang {
      color: #e74c3c;
    }
  }
}
</style>
