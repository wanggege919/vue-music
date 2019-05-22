<template>
  <scroll class="listview" 
          ref="listview" 
          :listenScroll = 'listenScroll'
          :probeType = 'probeType'
          @scroll = "scroll"
          >
    <ul>
      <li v-for="(group, key) of data" :key="key" class="list-group" :ref="key">
        <h2 class="list-group-title">{{key}}</h2>
        <ul>
          <li 
          v-for="item of group" 
          :key="item.id" 
          class="list-group-item"
          @click= 'select(item)' 
          >
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut">
      <ul>
        <li class="item" 
        v-for="(item,index) in shortcutList" 
        :key="index"
        :ref="index"
        :class="{'current': currentIndex === index}"
        @touchstart.prevent = 'onShortcutTouchStart'
        @touchmove = 'onShortcutTouchMove'
        @touchend = 'onShortcutTouchEnd'
        @click="handleClickLocation"
        >
        {{item}}
        </li>
      </ul>
    </div>
    <!-- <div class="list-fixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div> -->
    <div v-show="noData" class="loading-container">
      <Loading></Loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/Loading'
import Scroll from "base/scroll/Scroll";
//一个原则，如果你要观测这个数据的变化，就需要定义到 data 中，我们这个组件中，currentIndex 在模板中用到了，
//scrollY 和 diff 都被 watch 了，因为我们需要观测它们的变化做相应的事情。而一些不需要观测变化的数据，
//就不建议定义在 data 中了，会有性能损耗。
export default {
  created () {//为什么写在created，不写在data中，因为在data，props，computed中的数据，
              //vue会自动加上get,set，时刻监视着变化，完成双向绑定
    this.listenScroll = true
    this.listHeight = [] //列表各个模块的高度
    this.probeType = 3
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      // singerList: this.data,
      touchStatus: false,
      letterList: [],
      scrollY: -1,
      currentIndex: 0 //当前高亮letter的索引
    }
  },
  components: {
    Scroll,
    Loading
  },
  computed: {
    shortcutList () {
      // let list = []
      for(let key in this.data){
        this.letterList.push(key.slice(0,1))
      }
      return this.letterList
    },
    // fixedTitle () {
    //   if(!Object.keys(this.data)){

    //   }
    // }
    noData () {
      if(Object.keys(this.data).length === 0){
        return true
      } else if (Object.keys(this.data).length !== 0) {
        return false
      }
    }
  },
  methods: {
    select(item){
      this.$emit('select',item)
    },
    handleClickLocation (e) {
      var location = e.currentTarget.innerText
      if(location === '热'){
        location = '热门'
      }
      const element = this.$refs[location][0]
      this.$refs.listview.scrollToElement(element)
    },
    onShortcutTouchStart (e) {
      this.touchStatus = true
    },
    onShortcutTouchMove (e) {
      if(this.touchStatus) {
        const startY = this.$refs[0][0].offsetTop
        const touchY = e.touches[0].clientY - 150
        const index = Math.floor((touchY - startY) / 18)
        if(index >= 0 && index <= this.letterList.length - 1){
            let letter = this.letterList[index]
            if(letter === '热'){
              var element = this.$refs['热门'][0]
            } else {
              element = this.$refs[letter][0]
            }
            this.$refs.listview.scrollToElement(element)
        }
        
      }
    },
    onShortcutTouchEnd (e) {
      this.touchStatus = false
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _calculateHeight () {
      this.listHeight = []
      //拿到group-list集合
      var list = []
      list.push(this.$refs['热门'])
      for(let i = 0;i<this.letterList.length; i++){
        if(this.letterList[i] !== '热'){
          let item = this.$refs[this.letterList[i]]
           list.push(item)
        } 
      }
      var lists = []
      list.map((value)=>{
        return lists.push(value[0])
      })

      // console.log(lists)
      let height = 0
      this.listHeight.push(height)
      for(let i = 0; i<lists.length; i++){
        let item = lists[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      // console.log(this.listHeight)
    }, 
  },
  watch: {
    data () {
      setTimeout(()=>{
        this._calculateHeight()
      },20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      //当滚动到顶部，newY>0
      if(newY>0){
        this.currentIndex = 0
        return
      }
      //当滚动到页面中间时
      for(let i = 0;i<listHeight.length - 1; i++){
        let height1 = listHeight[i]
        let height2 = listHeight[i+1]
        if(!height2 || (-newY >= height1 && -newY <height2)){
          this.currentIndex = i
          // console.log(this.currentIndex)
          return
        }
      }
      //当滚动到页面底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    }
  }
  
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index:  30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
