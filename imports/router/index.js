import Vue from 'vue'
import Router from 'vue-router'

import PageList from '../ui/PageList'
import PageEditor from '../ui/PageEditor'
import Landing from '../ui/Landing'
import Stls from '../ui/Stls'

import ThreeD from '../ui/slides/3D'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/stls',
      name: 'stls',
      component: Stls
    },
    {
      path: '/pages',
      name: 'page-list',
      component: PageList
    },
    {
      path: '/page/:pageId',
      name: 'page-editor',
      component: PageEditor
    },
    {
      path: '/slides/3d',
      name: '3d',
      component: ThreeD
    },
  ]
})
