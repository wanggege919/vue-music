<template>
    <div class="m-tab">
        <router-link tag="div" to="/recommend">
            <span>推荐</span>
        </router-link>
        <router-link tag="div" to="/singer">
            <span>歌手</span>
        </router-link>
        <router-link tag="div" to="/rank">
            <span>排行</span>
        </router-link>
        <router-link tag="div" to="/search">
            <span>搜索</span>
        </router-link>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
    .m-tab
        width 100%
        height 44px
        display flex
        justify-content center
        align-items center
        font-size $font-size-medium
        div
            width 25%
            height 44px
            display flex
            justify-content center
            align-items center
            color $color-text-l
            box-sizing border-box
            span 
                padding-bottom 6px
                border-bottom 2px solid transparent
            &.router-link-active
                span
                    color $color-theme
                    border-bottom: 2px solid $color-theme
                    

</style>
