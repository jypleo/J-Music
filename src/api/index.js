import apiConfig from './config'

export default {
  getBannerSwiper() {
    return window.axios.get(apiConfig.bannerSwiper)
  },
  getSongList(limit = 10, order = 'hot', cat) {
    return window.axios.get(apiConfig.songList, {
      params: {
        limit,
        order,
        cat
      }
    })
  },
  getNewDishAPI(limit = 10, offset) {
    return window.axios.get(apiConfig.newDish, {
      params: {
        limit,
        offset
      }
    })
  },
  getNewSongsAPI(type = 0) {
    return window.axios.get(apiConfig.newSongs, {
      params: {
        type
      }
    })
  },
  /**
  *  使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url
  * 调用此接口 , 传入的音乐 id( 可多个 , 用逗号隔开 )
  * 可以获取对应的音乐的 url( 不需要登录 )
  * @param {*} id 音乐 id
  * @param {*} br 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
  */
  getMusicUrl(id, br) {
    return window.axios.get(apiConfig.getMusicUrl, {
      params: {
        id,
        br
      }
    })
  },
  /**
 * 传入歌曲 id, 可获取音乐是否可用
 * @param {*} id 歌曲 id
 * @param {*} br 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 */
  checkMusic(id, br) {
    return window.axios.get(apiConfig.checkMusic, {
      params: {
        id,
        br
      }
    })
  },
  getMusicLyric(id) {
    return window.axios.get(apiConfig.getMusicLyric, {
      params: {
        id
      }
    })
  },
  getAlbumDetail(id, s = 5) {
    return window.axios.get(apiConfig.albumDetail, {
      params: {
        id,
        s
      }
    })
  },
  setLikeMusic(id, like) {
    return window.axios.get(apiConfig.setLikeMusic, {
      params: {
        id,
        like
      }
    })
  }
}
