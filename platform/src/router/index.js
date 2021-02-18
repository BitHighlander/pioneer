import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import routes from './routes'
import store from '../store'

Vue.use(VueRouter)
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    fallback: false,
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    // mode: process.env.VUE_ROUTER_MODE,
    // base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
