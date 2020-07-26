import Vue from 'vue'
import Router from 'vue-router'

import PageList from '../ui/PageList'
import PageEditor from '../ui/PageEditor'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
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
