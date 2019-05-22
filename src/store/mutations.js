import * as types from './mutation-types'
//为什么下面使用[types.SET_SINGER]，不直接使用 setsinger 这样的函数名呢？
//书写方便，并且有eslink工具会检测到我们书写是否有误，通常mutations都会有一个mutation-types做关联的
const mutations = {
    [types.SET_SINGER] (state, singer) {
        state.singer = singer
    },
    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state, list) {
        state.playlist = list
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },

}

export default mutations
