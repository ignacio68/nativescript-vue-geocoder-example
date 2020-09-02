<template>
  <Frame id="map-page">
    <StackLayout>
      <MapComponent
        row="0"
        height="100%"
        :accessToken="accessToken"
        :zoomLevel="15"
        :userLatitude="initialLocation.lat"
        :userLongitude="initialLocation.lng"
        @on-map-ready="onMapReady($event)"
        @set-center="centerCamera()"
      />
    </StackLayout>
  </Frame>
</template>

<script lang="ts">
import Vue from 'vue'

import { mapToken } from '@/setup/map'

import {
          setCenter,
        } from '@/api/map'

import { getMap as map } from '@/store/map'

import {
          getOriginLocation as initialLocation,
          getCurrentUserLocation as userLocation
        } from '@/store/userLocation'

import MapComponent from '@/components/Map/MapComponent.vue'

export default Vue.extend({
  name: 'Map',
  components: {
    MapComponent,
  },
  data() {
    return {
      accessToken: mapToken,
      // initialLocation: {
      //   lat: '0',
      //   lng: '0',
      // },
      // map: void 0,
    }
  },

  computed: {
    map,
    initialLocation,
    // FIXME: the current coordinates are '0'
    userLocation,
    },
  methods: {
    /***** MAP *****/

    onMapReady() {
      console.log('onMapReady()')
    },

    centerCamera() {
      console.log('setCenter()')
      setCenter(this.map)
    },
  }
})
</script>
<style lang="scss" scoped>
</style>
