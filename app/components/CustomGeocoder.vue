<template>
  <GridLayout rows="auto, auto">
    <SearchBar
      row="0"
      id="Geocoder"
      v-model="searchedLocation"
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
      row="1"
      for="location in locationsList"
      @itemTap="onItemTap"
      >
        <v-template>
          <StackLayout>
            <Label :text="location.name" />
          </StackLayout>
        </v-template>
    </ListView>
  </GridLayout>

  <!-- <GridLayout
    class="Geocoder"
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
  </GridLayout> -->
</template>

<script script lang="ts">
import Vue from 'vue'

import { ItemEventData } from "tns-core-modules/ui/list-view"

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
    },
    minimumCharactersToSearch: {
      type: Number,
      default: 3
    }

  },
  data(){

    return {
      searchedLocation: '',
      locationsList: [],
    }
  },

  methods: {
    searchLocation(query: string) {
      const fetchLocation = geocoding.getLocationFromName(query)
      .then(result =>{
        let location = []
        location.push(result)
        return location
        }, error => console.log(`Error: ${error.message || error}`)
      )
      return fetchLocation
    },

    searchLocations(query) {
      const fetchLocations = geocoding.getLocationListFromName(query, 5)
      .then(locations =>{
        console.log(`Found: ${locations.length}`)
        locations.map(result => this.locationsList.push(result))
        }, error => console.log(`Error: ${error.message || error}`)
      )
    },

    async onSubmit() {
      await this.searchLocations(this.searchedLocation)
      // const locations = await this.searchLocations(this.searchedLocation)
      // console.log(`La dirección buscada es: ${JSON.stringify(locations[0].name)}`)
      // this.$emit('on-location-search', locations[0])
    },

    onTextChange() {
      console.log(`onTextChange: ${this.searchedLocation}`)
      // if(this.searchedLocation >= this.minimumCharactersToSearch) this.searchLocations(this.searchedLocation)
    },

    onClear() {
      this.searchedLocation = ""
      this.locationsList = []
    },

    onItemTap(e) {
      console.log(`Item tap`)
      this.$emit('on-location-search', e.item)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../app-variables';

.Geocoder {
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