<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <play-music v-show="AUDIO_LIST.length"></play-music>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PlayMusic from 'views/Play'
export default {
  name: 'app',
  components: {
    PlayMusic
  },
  computed: {
    ...mapGetters([
      'FULL_SCREEN',
      'AUDIO_LIST'
    ])
  }
}
</script>

<style>
#app {
  height: 100vh;
  width: 100vw;
}
</style>
