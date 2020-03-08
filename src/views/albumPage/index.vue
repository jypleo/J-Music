<!--  -->
<template>
  <div>
    <music-list-page
      :imgUrl="albumInfo.coverImgUrl"
      :playCount="albumInfo.playCount"
      :author="albumInfo.creator.nickname || ''"
      :description="albumInfo.description"
      :albumTitle="albumInfo.name"
      :creatorImgUrl="albumInfo.creator.avatarUrl"
      :commentCount="albumInfo.commentCount"
      :shareCount="albumInfo.shareCount"
      :musicCount="albumInfo.trackCount"
      :subscribedCount="albumInfo.subscribedCount"
    >
      <page-item
        v-for="(item,index) in albumInfo.tracks"
        :key="index"
        :songName="item.name"
        :artists="item.ar"
        :albumName="item.al.name"
        :num="index + 1"
        @beginSong="setAudioList(item, index)"
        :curSong="item.id === curPlayMusic.id"
      ></page-item>
    </music-list-page>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MusicListPage from 'components/musicList/MusicListPage'
import PageItem from 'components/musicList/PageItem'
import api from 'api'

export default {
  data() {
    return {
      albumInfo: {},
      pageId: 0,
      type: ''
    }
  },
  components: {
    MusicListPage,
    PageItem
  },
  created() { },
  activated() {
    this.pageId = this.$route.params.pageId
    if (this.pageId) {
      this.type = this.$route.params.type
      this.getAlbumDetail(this.pageId)
    } else {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapGetters({ curPlayMusic: 'AUDIO_ING_SONG' })
  },
  methods: {
    async getAlbumDetail(id) {
      const res = await api.getAlbumDetail(id)
      if (res.status === 200 && res.data && res.data.code === 200) {
        this.albumInfo = res.data.playlist
      }
      console.log(this.albumInfo)
    },
    setAudioList(item, index) {
      this.selectPlay({
        list: this.albumInfo.tracks,
        index
      })
    },
    ...mapActions(['selectPlay', 'startPlayAll'])
  }
}

</script>

<style lang='less' scoped>
</style>
