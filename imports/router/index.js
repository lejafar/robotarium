import Vue from 'vue'
import Router from 'vue-router'

import PageList from '../ui/PageList'
import PageEditor from '../ui/PageEditor'
import Landing from '../ui/Landing'

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
      path: '/pages',
      name: 'page-list',
      component: PageList
    },
    {
      path: '/page/:pageId',
      name: 'page-editor',
      component: PageEditor
    }
  ]
})
