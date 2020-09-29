<template>
    <Page
      actionBarHidden="true"
      backgroundSpanUnderStatusBar="false"
    >
      <GridLayout
        columns="*, auto"
        rows="*"
        class="map"
      >
        <MapBox
          ref="map"
          row="0"
          col="0"
          colSpan="2"
          left="0"
          top="0"
          width="100%"
          height="100%"
          :accessToken="accessToken"
          latitude="0"
          longitude="0"
          :zoomLevel="15"
          :hideCompass="true"
          :disableRotation="true"
          :disableScroll="false"
          :disableZoom="false"
          :showUserLocation="true"
          @mapReady="onMapReady"
        />
        <StackLayout
          row="0"
          col="1"
          backgroundColor="transparent"
        >
          <Geocoder
            class="search-location_bar"
            :borderRadius="16"
            hint="Search..."
            :width="300"
            searchBarFontColor="black"
            searchBarBackgroundColor="green"
            textFieldHintColor="gray"
            listViewBackgroundColor="white"
            textFieldBackgroundColor="ghostwhite"
            @on-location-search="locationSearchResult"
          />
        </StackLayout>
      </GridLayout>
    </Page>
</template>

<script lang="ts">
import Vue from 'vue'

import Geocoder from '@/components/Geocoder.vue'

import { mapToken } from '@/setup/map'

import { MapboxMarker } from "@nstudio/nativescript-mapbox"

export default Vue.extend({
  name: 'MapComponent',
  components: {
    Geocoder,
  },
  data() {
    return {
      accessToken: mapToken,
      map: null,
      userMarker: {
        id: 1,
        lat: 0,
        lng: 0
      }
    }
  },
  methods: {
    onMapReady(e) {
      console.log('MAP READY!')
      this.map = e.map
      this.map.setCenter()
      this.addMarker()
    },

    animatedCamera(value) {
      this.map.animateCamera({
        target: {
          lat: value.latitude,
          lng: value.longitude
        },
        zoomLevel: 15, // Android
        bearing: 270, // Where the camera is pointing, 0-360 (degrees)
        tilt: 50,
        duration: 5000 // default 10000 (milliseconds)
      })
      this.updateMarker(value)
    },

    addMarker() {
      this.map.addMarkers([
        this.userMarker
      ])
    },

    updateMarker(value) {
      this.userMarker.update({
        lat: value.latitude,
        lng: value.longitude
      })
    },

    locationSearchResult(result){
      console.log(`locationSearchResult: ${JSON.stringify(result)}`)
      const location = result
      console.log(`longitude: ${location.longitude}`)
      console.log(`latitude: ${location.latitude}`)
      // this.map.setCenter([location.longitude, location.latitude], {animated: true})
      this.animatedCamera(location)
    },
  }
})
</script>

<style scoped>
  .search-location_bar{
    margin: 16;
  }
</style>
