import {
  SET_CUR_PLAY_LIST,
  SET_CUR_PLAY_INDEX,
  SET_CUR_SHOW_LIST,
  SET_PLAY_SATE,
  SET_FULL_SCREEN
} from './mutation-types'
export default {
  [SET_CUR_PLAY_LIST](state, list) {
    state.playList = list
  },
  [SET_CUR_PLAY_INDEX](state, index) {
    state.audioIngIndex = index
  },
  [SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [SET_PLAY_SATE](state, flag) {
    state.playState = flag
  },
  [SET_CUR_SHOW_LIST](state, list) {
    state.audioList = list
  }
}
