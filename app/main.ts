import Vue from 'nativescript-vue'
import Map from './views/Map.vue'
import VueDevtools from 'nativescript-vue-devtools'

Vue.registerElement('Mapbox', () => require('nativescript-mapbox').MapboxView)

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}


// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({

  render: h => h('frame', [h(Map)])
}).$start()
