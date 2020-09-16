<template>
  <GridLayout
    id="geocoder"
    rows="auto, auto"
    :width="width"
  >
    <SearchBar
      id="geocoder-searchbar"
      row="0"
      v-model="searchedLocation"
      :hint="hint"
      :text="searchedLocation"
      :color="searchBarFontColor"
      :backgroundColor="searchBarBackgroundColor"
      fontSize="64"
      :textFieldHintColor="textFieldHintColor"
      :textFieldBackgroundColor="textFieldBackgroundColor"
      @textChange="onTextChange"
      @clear="onClear"
      @submit="onSubmit"
    />
    <ListView
      id="geocoder-list"
      ref="locations-list"
      row="1"
      :height="listViewHeight"
      :separatorColor="listItemBackgroundColor"
      borderBottomLeftRadius="16"
      borderBottomRightRadius="16"
      for="location in locationsList"
      @itemTap="onItemTap"
      >
        <v-template>
          <LocationItem
            class="locations-list-item"
            :item="location"
            :listItemBackgroundColor="listItemBackgroundColor"
            :itemFontSize="itemFontSize"
            :itemTitleFontColor="itemTitleFontColor"
            :itemTextFontColor="itemTextFontColor"
          />
        </v-template>
    </ListView>
  </GridLayout>
</template>

<script script lang="ts">
  import Vue from 'vue'

  import { setInterval, clearInterval } from 'tns-core-modules/timer'

  import * as geocoding from 'nativescript-geocoding'

  import { searchLocations } from '@/services/geocodingService'

  import { Location } from '@/services/types'

  import LocationItem from './LocationItem.vue'

  export default Vue.extend({
    name: "Geocoder",

    components: {
      LocationItem,
    },

    props: {
      width: {
        type: Number,
        default: 200
      },
      hint: {
        type: String,
        default: "Search..."
      },
      searchBarBackgroundColor: {
        type: String,
        default: "white"
      },
      searchBarFontColor: {
        type: String,
        default: "black"
      },
      textFieldHintColor: {
        type: String,
        default: "black"
      },
      textFieldBackgroundColor: {
        type: String,
        default: "ghostwhite"
      },
      minimumCharactersToSearch: {
        type: Number,
        default: 3
      },
      interval: {
        type: Number,
        default: 1000
      },
      listItemBackgroundColor: {
        type:String,
        default: "white"
      },
      itemFontSize: {
        type: String,
        default:"16"
      },
      itemTitleFontColor: {
        type: String,
        default: "black"
      },
      itemTextFontColor: {
        type: String,
        default: "black"
      },
    },

    data(){
      return {
        searchedLocation: '',
        oldSearchedLocation: '',
        locationsList: [],
      }
    },

    computed: {
      listViewHeight() {
        return this.locationsList ? this.locationsList.length * 64 : 0
      },
    },

    mounted() {
      this.resetLocationList()
    },

    watch: {
      searchedLocation() {
        if (this.searchedLocation.length === this.minimumCharactersToSearch) this.loadSearch()
        console.log(`locationsList: ${JSON.stringify(this.locationsList)}`)
      },
    },

    methods: {
      setOldSearchedLocation() {
        this.oldSearchedLocation = this.searchedLocation
      },

      async fetchLocationsList() {
        console.log('fetchLocationsList()')
        this.locationsList = await geocoding.getLocationListFromName(this.searchedLocation, 5)
      },

      resetSearchBar() {
        this.searchedLocation = ""
      },

      resetLocationList() {
        this.locationsList = []
      },

      onClear() {
        this.resetSearchBar()
        this.resetLocationList()
      },

      loadSearch() {
        console.log('loadsearch()')
        const vm = this
        let search = setInterval(() => {
          if(vm.searchedLocation !== vm.oldSearchedLocation) {
            vm.setOldSearchedLocation()
            vm.fetchLocationsList()
          }
          if (vm.searchedLocation.length < vm.minimumCharactersToSearch) clearInterval(search)
        }, vm.interval)
      },

      onSubmit() {
        console.log('onSubmit()')
        this.resetLocationList()
        this.fetchLocationsList()
      },

      onTextChange(e) {
        console.log(`onTextChange: ${e.value}`)
        this.$emit('on-text-change', e)
      },

      onItemTap(args) {
        this.$emit('on-location-search', args.item)
        this.onClear()
      }
    }
  })
</script>

<style lang="scss" scoped>

  // #geocoder-list {
  //   border-bottom-left-radius: 16;
  //   border-bottom-right-radius: 16;
  // }
  // .locations-list-item {
  //   margin-left: 16;
  // }
  // .locations-list-item:last-child {
  //   border-bottom-left-radius: 16;
  //   border-bottom-right-radius: 16;
  // }
</style>