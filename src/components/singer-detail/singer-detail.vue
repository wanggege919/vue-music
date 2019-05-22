<template>
  <transition appear name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs = 'songs'></music-list>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong, processSongsUrl} from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default {
    name: 'SingerDetail',
    components: {
      MusicList
    },
    data () {
      return {
        songs: []
      }
    },
    computed: {
      title () {
        return this.singer.name
      },
      bgImage () {
        return this.singer.avatar
      },
        ...mapGetters([
            'singer'
        ])
    },
    created () {
        this._getSingerDetail ()
    },
    methods: {
      _getSingerDetail () {
        //如果singerDetail没有数据时，回到singer页面
        //因为整个数据的获取是通过点击singer里面的歌手触发的，如果不点击，直接进入，那就会得不到数据
        //所以要加一层判断
        if(!this.singer.id){
          this.$router.push('/singer')
          return
        }
        getSingerDetail (this.singer.id) .then((res) =>{
          if(res.code === ERR_OK) {
            processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
              this.songs = songs
              // console.log(this.songs)
            })
          }
        })
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if(musicData.songid && musicData.albumid){
            ret.push(createSong(musicData))
          }

        })
        return ret
      }
    }
};
</script>
<style lang="stylus" scoped>

.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
