import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/landing',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/Lorikeet',
      name: 'Lorikeet',
      component: () => import( /* webpackChunkName: "PickupTree" */ '@/modules/Lorikeet/LorikeetPage.vue')

    },
    {
      path: '*',
      redirect: '/Lorikeet'
    }
  ]
})