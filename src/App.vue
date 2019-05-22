<template>
  <div id="app">
    <Mheader></Mheader>
    <Mtab></Mtab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import Mheader from 'components/m-header/m-header'
import Mtab from 'components/tab/Tab'
import Player from 'components/player/player'
export default {
  name: 'App',
  components: {
    Mheader,
    Mtab,
    Player
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
  #app
    color $color-theme
</style>
