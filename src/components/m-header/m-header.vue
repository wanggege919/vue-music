<template>
    <div class="m-header">
        <div class="logo"></div>
        <div class="text">Chicken Music</div>
    </div>
</template>
<script>
export default {
    name: 'Mheader'
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl'
@import '~common/stylus/variable.styl'
    .m-header
        height 44px
        font-size $font-size-large
        display flex
        justify-content center
        align-items center
        color $color-theme
        .logo
            width 30px 
            height 32px
            bg-image('logo')
            margin-right 10px
            background-size 30px 32px
</style>
