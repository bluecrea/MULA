import Vue from 'vue'
import Router from 'vue-router'

const index = r => require.ensure([], () => r(require('../page/index')), 'index');
const item = r => require.ensure([], () => r(require('../page/item')), 'item');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/item',
      name: 'item',
      component: item
    }
  ]
})
