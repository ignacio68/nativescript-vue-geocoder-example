<template>
  <GridLayout
    class="searchbar"
    ref="searchbar"
    columns="auto, auto, auto"
    height="48"
    :backgroundColor="searchbarBackGroundColor"
    :borderColor="searchbarBorderColor"
    :borderRadius="borderRadius"
  >
    <Image
      class="search-icon"
      col="0"
      :tintColor="iconColor"
      src="res://ic_search_white_36dp"
    />
    <TextField
      v-model="searchedString"
      ref="textfield"
      class="search-text"
      col="1"
      :width="textFieldWidth"
      verticalAlignment="center"
      :backgroundColor="searchbarBackGroundColor"
      :color="textColor"
      :fontSize="textFontSize"
      :isEnabled="true"
      :editable="true"
      keyboardType="url"
      returnKeyType="search"
      :hint="hint"
      :maxLength="maxLengthText"
      :text="searchedString"
      :autocorrect="false"
      @returnPress="onTextChange"
      @textChange="onTextChange"
    />
    <Image
      class="remove-icon"
      col="2"
      :tintColor="iconColor"
      src="res://ic_clear_black_36dp"
      @tap="onClear"
    />
  </GridLayout>
</template>

<script script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "CustomSearchBar",
  props: {
    borderRadius: {
      type: Number,
      default: 0,
    },
    searchbarBackGroundColor: {
      type: String,
      default: "white",
    },
    searchbarBorderColor: {
      type: String,
      default: "white",
    },
    iconColor: {
      type: String,
      default: "black"
    },
    textFieldWidth: {
      type: Number,
      default: 200
    },
    textColor: {
      type: String,
      default: "black"
    },
    textFontSize: {
      type: Number,
      default: 16
    },
    hint: {
      type: String,
      default: "Search..."
    },
    maxLengthText: {
      type: Number,
      default: 200
    },
    isListViewVisible: {
      type: Boolean,
      default: false
    }

  },
  data(){

    return {
      searchedString: '',
    }
  },

  watch: {
    isListViewVisible(newValue, oldVal) {
      const searchbar = this.$refs.searchbar.nativeView
      newValue ? (searchbar.borderBottomLeftRadius = 0, searchbar.borderBottomRightRadius = 0) : (searchbar.borderBottomLeftRadius = this.borderRadius, searchbar.borderBottomRightRadius = this.borderRadius)
    }
  },

  methods: {
    // onReturnPress() {
    //   this.$emit('on-return-press', this.searchedString)
    // },
    hiddenSoftKeyboard() {
        this.$refs.textfield.nativeView.dismissSoftInput()
      },

    onTextChange() {
      console.log(`onTextChange: ${this.searchedString}`)
       this.$emit('on-text-change', this.searchedString)
    },

    onClear() {
      this.hiddenSoftKeyboard()
      this.searchedString = ""
      this.$emit('on-clear')
    }
  }
})
</script>

<style lang="scss" scoped>
// @import '../../app-variables';

// .searchbar {
//   border-color: $primary-light;
//   &[text] {
//     padding-left: 8;
//     color: $primary-variant;
//     vertical-align: center;
//     font-size: $font-sz-l;
//   }
// }
.search-icon .remove-icon{
  margin: 8;
  width: 12;
  height: 12;
}

.search-text {
  margin: {
    top: 8;
    bottom: 8;
    left: 0;
    right: 0;
  }
}
</style>