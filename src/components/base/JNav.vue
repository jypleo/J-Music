<!--  -->
<template>
  <nav class="warpper-nav">
    <i class="phone iconzuojiantou" @click="returnPage"></i>
    <span>
      <slot></slot>
    </span>
  </nav>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created() { },
  methods: {
    returnPage() {
      this.$emit('returnPage')
    }
  }
}

</script>

<style lang='less' scoped>
@import url("//at.alicdn.com/t/font_1351323_oxqdjg3rufq.css");
.warpper-nav {
  display: flex;
  align-items: center;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.4rem;
  i {
    font-size: 0.7rem;
    margin-right: 0.1rem;
  }
}
</style>
