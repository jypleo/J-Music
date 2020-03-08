<!--  -->
<template>
  <div class="icons-container">
    <icon v-for="(item,index) in iconsList" :key="index" :icons="item" :bgcolor="true">
      <span class="today" v-if="item.text === '每日推荐'">{{today}}</span>
    </icon>
  </div>
</template>

<script>
import { findIcons } from 'data/dataStore'
import Icon from 'components/base/icon'
export default {
  data() {
    return {
      iconsList: []
    }
  },
  computed: {
    today: function () {
      return new Date().getDate()
    }
  },
  components: {
    Icon
  },
  created() {
    this.iconsList = findIcons()
  },
  methods: {}
}

</script>

<style lang='less' scoped>
@import url("~style/global.less");
.icons-container {
  display: flex;
  justify-content: space-around;
  height: 1.3rem;
  align-items: center;
  padding: 0.2rem 0 0.3rem;
  .today {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.2rem;
  }
}
</style>
