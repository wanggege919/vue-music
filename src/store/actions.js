//在一个动作中多次修改mutations，往往用actions封装一下
//不能直接改变状态，改变的是mutations
import * as types from './mutation-types'

export const selectPlay = function ({commit, state},{list, index}) {
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}
