import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = r => require.ensure([], () => r(require('../page/index')), 'index');
const order = r => require.ensure([], () => r(require('../page/order')), 'order');
const history = r => require.ensure([], () => r(require('../page/history')), 'history');
const charts = r => require.ensure([], () => r(require('../page/charts')), 'charts');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/history',
      name: 'history',
      component: history
    },
    {
      path: '/charts',
      name: 'charts',
      component: charts
    }
  ]
})
