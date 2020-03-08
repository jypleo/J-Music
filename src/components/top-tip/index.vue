<!--  -->
<template>
  <transition name="tip-show" mode="out-in">
    <div class="tip" v-show="isTip">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
let timer = null
export default {
  data() {
    return {
      isTip: false
    }
  },
  created() { },
  methods: {
    showTip() {
      this.isTip = true
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        this.hideTip()
      }, 3000)
    },
    hideTip() {
      this.isTip = false
    }
  }
}

</script>

<style lang='less' scoped>
.tip {
  display: flex;
  position: fixed;
  left: 0;
  top: 1.2rem;
  width: 100%;
  justify-content: center;
}
</style>
