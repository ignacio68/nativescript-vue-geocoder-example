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
          :zoomLevel="12"
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
          <!-- <CustomGeocoder
            class="search-location_bar m-16"
            hint="Search..."
            :textFieldWidth="200"
            :maxLengthText="360"
            @on-location-search="locationSearchResult"
          /> -->
          <Geocoder
            class="search-location_bar m-16"
            :minimumCharactersToSearch="3"
            hint="Search..."
            noResultsText="No match results"
            :textFieldWidth="200"
            :maxLengthText="360"
            @on-location-search="locationSearchResult"
          />
        </StackLayout>
      </GridLayout>
    </Page>
</template>

<script lang="ts">
import Vue from 'vue'

import Geocoder from '@/components/Geocoder.vue'
import CustomGeocoder from '@/components/CustomGeocoder.vue'

// import { setMap, getMap as map } from '@/store/map'

import { mapToken } from '@/setup/map'


export default Vue.extend({
  name: 'MapComponent',
  components: {
    Geocoder,
    // CustomGeocoder,
  },
  data() {
    return {
      accessToken: mapToken,
      map: null,
    }
  },
  methods: {
     onMapReady(e) {
      console.log('MAP READY!')
      this.map = e.map
      // const map = e.map
      // setMap(map)
      // this.$emit('on-map-ready', e)
    },
    locationSearchResult(result){
      console.log(`locationSearchResult: ${JSON.stringify(result)}`)
      const location = result[0]
      console.log(`longitude: ${location.longitude}`)
      console.log(`latitude: ${location.latitude}`)
      this.map.setCenter([location.longitude, location.latitude], {animated: true})
    },
  }
})
</script>

<style lang="scss" scoped>
  .right-menu {
    background-color: transparent;
  }
  .search-location_bar{
    border-radius: 16;
  }
</style>
