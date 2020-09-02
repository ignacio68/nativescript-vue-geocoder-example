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
        :latitude="userLatitude"
        :longitude="userLongitude"
        :zoomLevel="zoomLevel"
        :hideCompass="true"
        :disableRotation="true"
        :disableScroll="false"
        :disableZoom="false"
        :showUserLocation="true"
        @mapReady="onMapReady"
      />
      <GridLayout
        class="right-menu"
        rows="auto, auto, auto"
        columns="auto"
        row="0"
        col="1"
      >
        <GeocoderFake
          class="search-location_bar m-16"
          row="0"
          :hint="$t('lang.components.geocoder.hint')"
          :textFieldWidth="200"
          :maxLengthText="360"
          @on-location-search="locationSearchResult"
        />
        <!-- <Geocoder
          class="search-location_bar m-16"
          row="0"
          :minimumCharactersToSearch="3"
          :hint="$t('lang.components.geocoder.hint')"
          :noResultsText="$t('lang.components.geocoder.noResultsText')"
          :textFieldWidth="200"
          :maxLengthText="360"
          @on-location-search="locationSearchResult"
        /> -->
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue'

import Geocoder from '@/components/Map/Geocoder.vue'
import GeocoderFake from '@/components/Map/GeocoderFake.vue'

import { setMap, getMap as map } from '@/store/map'

export default Vue.extend({
  name: 'MapComponent',
  components: {
    // Geocoder,
    GeocoderFake,
  },
  props: {
    accessToken: {
      type: String,
      required: true
    },
    zoomLevel: {
      type: Number,
      default: 12
    },
    userLatitude: {
      type: String,
      required: true
    },
    userLongitude: {
      type: String,
      required: true
    }
  },
  data() {
    return {
    }
  },
  computed:{
    map,
  },
  methods: {
     onMapReady(e) {
      console.log('MAP READY!')
      const map = e.map
      setMap(map)
      this.$emit('on-map-ready', e)
    },
    locationSearchResult(result){
      console.log(`locationSearchResult: ${JSON.stringify(result)}`)
    },
  }
})
</script>

<style lang="scss" scoped>
  @import '../../app-variables';

  .right-menu {
    background-color: transparent;
  }
  .search-location_bar{
    border-radius: 16;
  }
</style>
