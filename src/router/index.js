import Vue from 'vue'
import Router from 'vue-router'
import Recomment from 'components/recommend/Recommend'
import Rank from 'components/rank/Rank'
import Singer from 'components/singer/Singer'
import Search from 'components/search/Search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recomment
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
  ]
})
