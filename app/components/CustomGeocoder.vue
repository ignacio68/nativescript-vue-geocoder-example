<template>
  <GridLayout
    class="SearchLocation"
    columns="auto, 200, auto"
  >
    <Image
      class="search_icon m-8"
      col="0"
      tintColor="#668d8e"
      src="res://ic_search_white_36dp"
    />
    <TextField
      v-model="location"
      class="search_text m-y-8 m-x-0"
      col="1"
      :width="textFieldWidth"
      verticalAlignment="center"
      borderColor="white"
      color="#668d8e"
      isEnabled="isEnabled"
      editable="isEditable"
      keyboardType="url"
      returnKeyType="search"
      fontSize="18"
      :hint="hint"
      :maxLength="maxLengthText"
      :text="location"
      @returnPress="onReturnPress"
      @textChange="onTextChange"
    />
    <Image
      class="remove_icon m-8"
      col="2"
      tintColor="#668d8e"
      src="res://ic_add_white_36dp"
      @tap="removeLocation"
    />
  </GridLayout>
</template>

<script script lang="ts">
import Vue from 'vue'

import * as geocoding from 'nativescript-geocoding'

export default Vue.extend({
  name: "CustomGeocoder",
  props: {
    textFieldWidth: {
      type: Number,
      default: 200
    },
    hint: {
      type: String,
      default: "Search..."
    },
    maxLengthText: {
      type: Number,
      default: 200
    }

  },
  data(){

    return {
      location: '',
    }
  },

  methods: {
    searchLocation(query) {
      const fetchLocation = geocoding.getLocationFromName(query)
      .then(result =>{
        console.log(`Found: ${JSON.stringify(result)}`)
        return result
        }, error => console.log(`Error: ${error.message || error}`)
      )
      return fetchLocation
    },

    searchLocations(query) {
      const fetchLocations = geocoding.getLocationListFromName(query, 5)
      .then(results =>{
        console.log(`Found: ${results.length}`)
        let locations = []
        results.map(result => locations.push(result))
        return locations
        }, error => console.log(`Error: ${error.message || error}`)
      )
      return fetchLocations
    },

    async onReturnPress() {
      const locations = await this.searchLocations(this.location)
      console.log(`La dirección buscada es: ${JSON.stringify(locations[0])}`)
      this.$emit('on-location-search', locations)
    },

    onTextChange() {
      console.log(`onTextChange: ${this.location}`)
    },

    removeLocation() {
      this.location = ""
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../app-variables';

.SearchLocation {
  border-color: $primary-light;
  height: 64;
  &[text] {
    padding-left: 8;
    color: $primary-variant;
    vertical-align: center;
    font-size: $font-sz-xxl;
  }
}
.search_icon {
  width: 36;
  height: 36;
}
.remove_icon {
  width: 36;
  height: 36;
  rotate: 45;
}
</style>