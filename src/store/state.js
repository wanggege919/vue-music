//在state里面是一些最底层的，最基本的属性
import {playMode} from 'common/js/config'
const state = {
    singer: {},
    playing: false, //是否播放，暂停
    fullScreen: false, //是否满屏
    playlist: [], //播放列表
    sequenceList: [], //顺序播放列表
    mode: playMode.sequence, //播放模式
    currentIndex: -1, 
}


export default state

