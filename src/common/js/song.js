import { getLyric, getSongsUrl } from 'api/song'
import { ERR_OK } from 'api/config'
// import { Base64 } from 'js-base64'



export default class Song {
    constructor ({id, mid, singer, name, album, duration, image, url}) {//传值较多时用数组，也可以直接传值
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.filename = `C400${this.mid}.m4a`
        this.url = url
    }
}
//工厂模式创造歌曲，不然我们在每个需要创造歌曲的组件都要写这么长的代码，不简洁
export function createSong (musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid, 
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: musicData.url
    })
}

//处理歌手数据
function filterSinger (singer) {
    let ret = []
    if(!singer){
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join('/')
}


export function isValidMusic(musicData) {
    return musicData.songid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
  }
  
  export function processSongsUrl(songs) {
    if (!songs.length) {
      return Promise.resolve(songs)
    }
    return getSongsUrl(songs).then((res) => {
      if (res.code === ERR_OK) {
        let midUrlInfo = res.url_mid.data.midurlinfo
        midUrlInfo.forEach((info, index) => {
          let song = songs[index]
          song.url = `http://dl.stream.qqmusic.qq.com/${info.purl}`
        })
      }
      return songs
    })
  }



