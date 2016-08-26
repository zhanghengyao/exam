import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterConfig from './router'
import App from './App'

Vue.use(VueRouter)
const router = new VueRouter({
  hashbang: true,
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true
})
RouterConfig(router)
router.start(App,'#app')
