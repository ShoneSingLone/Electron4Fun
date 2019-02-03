import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/Lorikeet',
      name: 'Lorikeet',
      component: require('@/modules/Lorikeet/LorikeetPage.vue').default
    },
    {
      path: '*',
      redirect: '/Lorikeet'
    }
  ]
})