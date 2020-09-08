<template>
  <GridLayout
    class="SearchLocation"
    columns="auto, 300"
  >
    <Image
      class="search_icon m-8"
      col="0"
      tintColor="#668d8e"
      src="res://ic_search_white_36dp"
    />
    <RadAutoCompleteTextView
      ref="autocomplete"
      class="search_text m-y-8 m-x-0"
      col="1"
      verticalAlignment="middle"
      :minimumCharactersToSearch="minimumCharactersToSearch"
      :hint="hint"
      :noResultsText="noResultsText"
      :completionMode="completionMode"
      :suggestMode="suggestMode"
      :displayMode="displayMode"
      :layaoutMode="layoutMode"
      :items="locations"
      @tokenAdded="onTokenAdded"
      @tokenRemoved="onTokenRemoved"
      @tokenSelected="onTokenSelected"
      @tokenDeselectd="onTokenDeselected"
      @textChanged="onTextChanged"
      @didAutocomplete="onDidAutoComplete"
      @suggestionViewBecameVisible="onSuggestionViewBecameVisible"
    >
      <SuggestionView
        ~suggestionView
        suggestionViewHeight="200"
      >
        <StackLayout
          v-suggestionItemTemplate
          orientation="vertical"
        >
          <v-template scope="item">
            <StackLayout orientation="vertical">
              <Label
                :text="item.text"
              />
            </StackLayout>
          </v-template>
        </StackLayout>
      </SuggestionView>
    </RadAutoCompleteTextView>
  </GridLayout>
</template>

<script script lang="ts">
import Vue from 'vue'

import * as geocoding from 'nativescript-geocoding'

import { searchLocations } from '@/services/geocodingService'

import {
  AutoCompleteSuggestMode,
  AutoCompleteCompletionMode,
  AutoCompleteDisplayMode,
  AutoCompleteLayoutMode,
  TokenModel } from 'nativescript-ui-autocomplete'

import RadAutoComplete from 'nativescript-ui-autocomplete/vue'
Vue.use(RadAutoComplete)

export default Vue.extend({
  name: "Geocoder",
  props: {
    hint: {
      type: String,
      default: 'Search...'
    },
    noResultsText: {
      type: String,
      default: 'No match results'
    },
    minimumCharactersToSearch: {
      type: Number,
      default: 3
    },
    // locations: {
    //   type: Array,
    //   default: []
    // }
  },
  data(){

    return {
      location:'',
      locations: new Array<TokenModel>(),
      suggestMode: AutoCompleteSuggestMode.Suggest,
      // suggestMode: AutoCompleteSuggestMode.SuggestAppend, // TODO: Testing
      completionMode: AutoCompleteCompletionMode.StartsWith,
      // completionMode: AutoCompleteCompletionMode.Contains, // TODO: Testing
      displayMode: AutoCompleteDisplayMode.Tokens,
      layoutMode: AutoCompleteLayoutMode.Wrap,
    }
  },

  methods: {
    // getLocation(index: number) {
    //   const location = this.locations[index]
    //   return new TokenModel(location, null)
    // },

    // getLocationsCount() {
    //   return this.locations.length
    // },
    tokenString(location: any) {
      return `${location.name}`
    },

    suggestPopulation(query: string) {
      console.log(`suggestPopulation: ${query}`)
      this.$refs.autocomplete.setLoadSuggestionsAsync(async (query) => {
        await searchLocations(query)
          .then((locationsCollection: any[]) =>{
            // const locationsCollection = results
            locationsCollection.map(location => this.locations.push(new TokenModel(this.tokenString(location), null)))
          })
          .catch(error => {
              const message = `Error fetching remote data: ${error.message}`
              console.log(message)
          })
        // const fetchLocations = new Promise((resolve, reject) => {
        // const fetchLocations = new Promise((resolve, reject) => {
        //   searchLocations(query)
        //     .then((result: any[]) => {
        //       const locationsCollection = result
        //       // const locations: Array<TokenModel> = new Array()
        //       locationsCollection.map( location => this.locations.push(new TokenModel(this.tokenString(location), null)))
        //       resolve (this.locations)
        //     })
        //     .catch(error => {
        //       const message = `Error fetching remote data: ${error.message}`
        //       console.log(message)
        //       alert(message)
        //       reject()
        //     })
        // })
      })
    },

    onTokenSelected({ token }) {
      console.log(`Selected Token: ${token.text}`)
      this.$emit('on-location-search', token.text)
    },

    onTextChanged({ text }) {
      console.log(`onTextChange: ${text}`)
      if(text.length >= this.minimumCharactersToSearch) this.suggestPopulation(text)
    },

    /*** PRUEBAS ***/
    onTokenAdded({ token }) {
      console.log(`Added Token: ${token.text}`)
    },

    onTokenRemoved({ token }) {
      console.log(`Removed Token: ${token.text}`)
    },

    onTokenDeselected({ token }) {
      console.log('onTokenDeselected')
    },

    onDidAutoComplete({ text }) {
      console.log('onDidAutoComplete')
    },

    onSuggestionViewBecameVisible({ object }) {
      console.log('onSuggestionViewBecameVisible')
    }

    // removeLocation() {
    //   this.location = ""
    // },
  }
})
</script>

<style lang="scss" scoped>
@import '../app-variables';

.search_icon {
  width: 36;
  height: 36;
}
// RadAutoCompleteTextView.search_text {
// margin: 5 10;
// padding: 0 6;
// color: #00C147;
// background: white;
// token-item-spacing: 12;
// display-mode: tokens;
// layout-mode: horizontal;
// }

// RadAutoCompleteTextView.search_text Token {
// color: #00C147;
// background: white;
// border-radius: 20;
// border-color: #00C147;
// border-width: 4;
// font-weight: bold;
// }

// RadAutoCompleteTextView.search_text Token:selected {
// color: white;
// background: #00C147;
// }

// RadAutoCompleteTextView.search_text Token TokenClearButton {
// color: #00C147;
// }

// RadAutoCompleteTextView.search_text Token:selected TokenClearButton {
// color: white;
// }


// RadAutoCompleteTextView.search_text ClearButton {
// color: #00C147;
// }

RadAutoCompleteTextView {
  height: 36;
  font-size: $font-sz-m;
}

RadAutoCompleteTextView:focus {
  height: 36;
  color: $primary-variant;
  font-size: $font-sz-l;
}

RadAutoCompleteTextView Token {
  font-size: $font-sz-l;
  background:white;
}

RadAutoCompleteTextView Token:selected{
  background: chartreuse;
}

RadAutoCompleteTextView SuggestionView{
  background-color: green;
  font-size: $font-sz-m;
}

RadAutoCompleteTextView ClearButton{
  color: #668d8e;
}

RadAutoCompleteTextView TextView{
  background: yellow;
}
</style>