import {
  SET_CUR_PLAY_LIST,
  SET_CUR_PLAY_INDEX,
  SET_CUR_SHOW_LIST,
  SET_PLAY_SATE,
  SET_FULL_SCREEN
} from './mutation-types'
import config from 'config/utils'
function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

export default {
  selectPlay({
    commit,
    state
  }, {
    list,
    index
  }) {
    commit(SET_CUR_SHOW_LIST, list)
    if (state.mode === 2) {
      const randomList = config.getShuffleArry(list)
      commit(SET_CUR_PLAY_LIST, randomList)
      index = findIndex(randomList, state.audioList[index])
    } else {
      commit(SET_CUR_PLAY_LIST, list)
    }
    commit(SET_CUR_PLAY_INDEX, index)
    commit(SET_PLAY_SATE, true)
    commit(SET_FULL_SCREEN, true)
  }
}
