<template>
    <div class="recommend" ref="recommend">
        <Scroll ref="scroll" class="recommend-content" :data="discList">
          <div>

            <div v-if="recommends.length" class="slider-wrapper">
              <!--为什么加v-if，因为recommends请求是一个异步操作，需要时间，可能数据还没回来，
              轮播组件的mounted中的初始化就已经完成了，所以加上v-if，数据不回来，就把这些dom隐藏掉-->
              <div class="slider-content">
                <Slider>
                  <div v-for="item of recommends" :key="item.id">
                    <a :href="item.linkUrl">
                      <img :src="item.picUrl" alt="">
                    </a>
                  </div>
                </Slider>
              </div>
            </div>
            <div class="recommend-list">
              <h1 class="list-title">
                热门歌单推荐
              </h1>
              <ul>
                <li v-for="item of discList" :key="item.dissid" class="item">
                  <div class="icon">
                    <img width="60" height="60" v-lazy="item.imgurl" alt="">
                  </div>
                  <div class="text">
                    <h2 class="name">{{item.creator.name}}</h2>
                    <p class="desc">{{item.dissname}}</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
          <div class="loading-container" v-show="!discList.length">
            <Loading></Loading>
          </div>
        </Scroll>
    </div>
</template>
<script>
import Loading from 'base/loading/Loading'
import {getRecommend, getDiscList} from 'api/recommend.js'
import {ERR_OK} from 'api/config.js'
import Slider from 'base/slider/Slider'
import Scroll from 'base/scroll/Scroll'
import {playlistMixin} from 'common/js/mixin.js'
export default {
    name: 'recommend',
    components: {
      Slider,
      Scroll,
      Loading
    },
    data () {
      return {
        recommends: [],
        discList: []
      }
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.$el.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _getRecommend(){
        getRecommend().then((res)=>{
          this.recommends = res.data.slider
        })
      },
      _getDiscList () {
        getDiscList () .then((res)=>{
          this.discList = res.data.list
        })
      }
    },
    created () {
      this._getRecommend()
      this._getDiscList()
    }
}
</script>
<style lang="stylus" scoped>
   @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 40%
        overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>