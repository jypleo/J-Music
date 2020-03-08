<!--  -->
<template>
  <div class="icon-item">
    <div class="icon-img" :class="{bgcolor}">
      <i :class="icons.icon"></i>
      <slot></slot>
    </div>
    <span class="icon-text">{{icons.text}}</span>
  </div>
</template>

<script>
export default {
  props: {
    icons: {
      type: [Object, Array]
    },
    bgcolor: {
      type: Boolean
    }
  },
  data() {
    return {
    }
  },
  created() { },
  methods: {}
}

</script>

<style lang='less' scoped>
.icon-item {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: #000;
  .bgcolor {
    background: linear-gradient(to right, #ff5a4c, #ff1d11);
  }
  .icon-img {
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 50%;
    text-align: center;
    position: relative;
    color: #fff;
    i {
      font-size: 0.5rem !important;
    }
  }
  .icon-text {
    font-size: 0.24rem;
  }
}
</style>
