<template>
  <div id="app">
    <Mheader></Mheader>
    <Mtab></Mtab>
    <router-view></router-view>
  </div>
</template>

<script>
import Mheader from 'components/m-header/m-header'
import Mtab from 'components/tab/Tab'
export default {
  name: 'App',
  components: {
    Mheader,
    Mtab
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
  #app
    color $color-theme
</style>
