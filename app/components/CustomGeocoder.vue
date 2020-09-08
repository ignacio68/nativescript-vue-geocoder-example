<template>
  <GridLayout rows="auto, auto">
    <SearchBar
      row="0"
      id="Geocoder"
      v-model="searchedLocation"
      :width="width"
      :hint="hint"
      :text="searchedLocation"
      color="#668d8e"
      backgroundColor="white"
      borderRadius="16"
      @textChange="onTextChange"
      @clear="onClear"
      @submit="onSubmit"
    />
    <ListView
      id="geocoderList"
      ref="geocoderList"
      row="1"
      :width="width"
      for="location in locationsList"
      @itemTap="onItemTap"
      >
        <v-template>
          <StackLayout>
            <Label :text="formatedTextLocation(location)" />
          </StackLayout>
        </v-template>
    </ListView>
  </GridLayout>
</template>

<script script lang="ts">
import Vue from 'vue'

// import * as geocoding from 'nativescript-geocoding'
import { searchLocations } from '@/services/geocodingService'

import { Location } from '@/services/types'

export default Vue.extend({
  name: "CustomGeocoder",
  props: {
    width: {
      type: Number,
      default: 200
    },
    hint: {
      type: String,
      default: "Search..."
    },
    minimumCharactersToSearch: {
      type: Number,
      default: 3
    }

  },

  data(){

    return {
      searchedLocation: '',
      locationsList: void 0,
    }
  },

  mounted() {
    this.resetLocationList()
  },

  watch: {
    async searchedLocation() {
      if (this.searchedLocation.length >= 3) {
        this.resetLocationList()
        await this.fetchLocationsList()
      }
      console.log(`locationsList: ${JSON.stringify(this.locationsList)}`)
    }
  },

  methods: {
    async fetchLocationsList() {
      this.locationsList = await searchLocations(this.searchedLocation)
    },

    resetSearchBar() {
      this.searchedLocation = ""
    },

    resetLocationList() {
      this.locationsList = []
    },

    async onSubmit() {
      this.resetLocationList()
      await this.fetchLocationsList()
    },

    onTextChange() {
      console.log(`onTextChange: ${this.searchedLocation}`)
    },

    onClear() {
      this.resetSearchBar()
      this.resetLocationList()
    },

    removeEmptyKeys(object) {
      Object.keys(object).forEach((key) => (!object[key] && object[key] !== undefined) && delete object[key])
      return object
    },

    formatedTextLocation(location) {
      const cleanedLocation = this.removeEmptyKeys(location)
      return `${cleanedLocation.thoroughfare} ${cleanedLocation.subThoroughfare} ${cleanedLocation.postalCode} ${cleanedLocation.locality}`

    },

    onItemTap(e) {
      console.log(`Item tap: ${JSON.stringify(e.item)}`)
      this.$emit('on-location-search', e.item)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../app-variables';

// .Geocoder {
//   border-color: $primary-light;
//   height: 64;
//   &[text] {
//     padding-left: 8;
//     color: $primary-variant;
//     vertical-align: center;
//     font-size: $font-sz-xxl;
//   }
// }
// .search_icon {
//   width: 36;
//   height: 36;
// }
// .remove_icon {
//   width: 36;
//   height: 36;
//   rotate: 45;
// }
</style>