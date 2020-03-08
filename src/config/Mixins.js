export const audio = {
  props: {
    mode: {
      type: Number
    }
  },
  computed: {
    modeClass: function () {
      switch (this.mode) {
        case 0: // 列表循环
          return 'audioxunhuan'
        case 1: // 单曲循环
          return 'audiosingle-loop'
        case 2: // 随机播放
          return 'audiosuiji'
      }
    }
  },
  methods: {
    changeMode() {
      this.$emit('changeMode')
    },
    showAudioList() {
      this.$emit('showAudioList')
    }
  }
}
