import Vue from 'vue'
import Router from 'vue-router'
import Ranking from '@/components/ranking'
import MRanking from '@/components/mranking'
import TopRanking from '@/components/top'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/ranking'
    },
    {
      path: '/ranking',   // tv端页面
      name: 'Ranking',
      component: Ranking
    },
    {
      path: '/mranking',  // 手机端首页
      name: 'Mranking',
      component: MRanking
    },
    {
      path: '/top',  // top10
      name: 'TopRanking',
      component: TopRanking
    },
    {
      path: '*',  // 手机端首页
      name: 'Ranking',
      component: Ranking
    }
  ]
})
