<template>
  <div class="singer" ref="singer">
      <listview :data="singers" @select = 'selectSinger' ref="list"></listview>
      <router-view></router-view>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import { getSingerList } from "api/singer.js";
import { ERR_OK } from "api/config.js";
import Listview from 'base/listview/listview'
import Singer from 'common/js/singer.js'
import {playlistMixin} from 'common/js/mixin.js'
export default {
  mixins: [playlistMixin],
  data() {
    return {
      singers: {}
    }
  },
  components: {
      Listview
  },
  created() {
    this._getSingerList();
  },
  methods: {
     handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.$el.style.bottom = bottom
      this.$refs.list.refresh()
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'//将mutations里面的SET_SINGER方法映射到该组件的 setSinger 方法中
    }),
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      // this.$store.commit('SET_SINGER', singer)
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      });
    },
    _normalizeSinger(list) {
        let map = {
            hot: []
        }
        for (let i = 0; i < list.length; i++) {
            if(i<10){
                map.hot.push(new Singer({
                title: '热门',
                id: list[i].Fsinger_mid,
                name: list[i].Fsinger_name
              })
              )
            }
            
            const key = list[i].Findex
            if(!map[key]) {
                map[key] = []
            }
            map[key].push(new Singer({
                title: key,
                id: list[i].Fsinger_mid,
                name: list[i].Fsinger_name
              }))
        }
        //上面的map对象中ABC……是没有顺序的，当然在浏览器上看着是有顺序的，其实没有，下面就是排序
        let hash = {}
        let keyList = []
        hash['热门'] = map['hot']
        for(let key in map){
            keyList.push(key)
        }
        keyList = keyList.sort().slice(1,-1)
        keyList.forEach((value) => {
            hash[value] = map[value]
        })
        return hash
    }
  }
  
}
</script>
<style lang="stylus" scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
