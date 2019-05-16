<template>
  <div class="singer">
      <listview :data="singers"></listview>
  </div>
</template>
<script>
import { getSingerList } from "api/singer.js";
import { ERR_OK } from "api/config.js";
import Listview from 'base/listview/listview'
import Singer from 'common/js/singer.js'
export default {
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
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
        //   this.singers = res.data.list;
          this.singers = this._normalizeSinger(res.data.list)
        //   console.log(this.singers)
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
