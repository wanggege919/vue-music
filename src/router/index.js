import Vue from 'vue'
import Router from 'vue-router'
import Recomment from 'components/recommend/Recommend'
import Rank from 'components/rank/Rank'
import Singer from 'components/singer/Singer'
import Search from 'components/search/Search'
import SingerDetail from 'components/singer-detail/singer-detail'
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
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    
  ]
})
