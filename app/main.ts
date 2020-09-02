import Vue from 'nativescript-vue'
// import Map from './views/Map.vue'
import MapComponent from './components/MapComponent.vue'
import VueDevtools from 'nativescript-vue-devtools'

import RadAutoComplete from 'nativescript-ui-autocomplete/vue'
Vue.use(RadAutoComplete)

Vue.registerElement('Mapbox', () => require('nativescript-mapbox').MapboxView)

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}


// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({

  render: h => h('frame', [h(MapComponent)])
}).$start()
