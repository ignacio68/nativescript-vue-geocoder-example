<template>
  <GridLayout
    id="geocoder"
    rows="auto, auto"
    :width="width"
  >
    <CustomSearchBar
      row="0"
      :borderRadius="borderRadius"
      :searchbarBackGroundColor="searchbarBackGroundColor"
      :iconColor="iconColor"
      :textColor="searchBarFontColor"
      :textFontSize="16"
      :isListViewVisible="isListViewVisible"
      @on-text-change="onTextChange"
      @on-clear="onClear"
    />
    <ListView
      id="geocoder-list"
      ref="locations-list"
      row="1"
      :borderBottomLeftRadius="borderRadius"
      :borderBottomRightRadius="borderRadius"
      :backgroundColor="listViewBackgroundColor"
      :height="listViewHeight"
      :separatorColor="listViewBackgroundColor"
      for="location in locationsList"
      @itemTap="onItemTap"
      >
        <v-template>
          <LocationItem
            class="locations-list-item"
            :item="location"
            :listItemBackgroundColor="listViewBackgroundColor"
            :itemFontSize="itemFontSize"
            :itemTitleFontColor="itemTitleFontColor"
            :itemTextFontColor="itemTextFontColor"
            :borderRadius="borderRadius"
          />
        </v-template>
    </ListView>
  </GridLayout>
</template>

<script script lang="ts">
  import Vue from 'vue'

  import { setInterval, clearInterval } from '@nativescript/core/timer'
  import * as geocoding from 'nativescript-geocoding'

  import { searchLocations } from '@/services/geocodingService'

  import { Location } from '@/services/types'

  import CustomSearchBar from './CustomSearchBar.vue'
  import LocationItem from './LocationItem.vue'

  export default Vue.extend({
    name: "Geocoder",

    components: {
      CustomSearchBar,
      LocationItem,
    },

    props: {
      borderRadius: {
        type: Number,
        default: 16
      },
      width: {
        type: Number,
        default: 200
      },
      hint: {
        type: String,
        default: "Search..."
      },
      searchbarBackGroundColor: {
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
      iconColor: {
        type: String,
        default: "black"
      },
      minimumCharactersToSearch: {
        type: Number,
        default: 3
      },
      interval: {
        type: Number,
        default: 1000
      },
      listViewBackgroundColor: {
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

      isListViewVisible() {
        return this.listViewHeight ? true : false
      },
    },

    mounted() {
      this.resetLocationList()
    },

    watch: {
      searchedLocation() {
        if (this.searchedLocation.length >= this.minimumCharactersToSearch) this.loadSearch()
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

      // hiddenSearchBar() {
      //   this.$refs.searchBar.nativeView.dismissSoftInput()
      // },

      resetSearchBar() {
        this.searchedLocation = ""
      },

      resetLocationList() {
        this.locationsList = []
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

      onClear() {
        // this.hiddenSearchBar()
        this.resetSearchBar()
        this.resetLocationList()
      },

      onTextChange(string) {
        console.log(`onTextChange: ${string}`)
        this.searchedLocation = string
      },
      // onTextChange(e) {
      //   console.log(`onTextChange: ${e.value}`)
      //   this.$emit('on-text-change', e)
      // },

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

  .locations-list-item {
    border-bottom-left-radius: 16;
    border-bottom-right-radius: 16;
  }
  .locations-list:last-child {
    // border-bottom-left-radius: 16;
    // border-bottom-right-radius: 16;
    background-color: red;
  }
</style>