<template>
  <GridLayout
    class="item-wrapper"
    rows="28, 36"
    height="64"
    fontSize="16"
    :backgroundColor="listItemBackgroundColor"
  >
    <Label
      class="item-title"
      row="0"
      :fontSize="itemFontSize"
      :color="itemTitleFontColor"
      :text="itemTitle(item)"
    />
    <Label
      class="item-text"
      row="1"
      :fontSize="itemFontSize"
      :color="itemTextFontColor"
      :text="resultText(item)"
      />
  </GridLayout>
</template>

<script>
  import { getShortLocationString } from '@/utils/text'

  export default({
    name: "LocationItem",

    props: {
      item: {
        type: Object,
        default: {}
      },
      listItemBackgroundColor: {
        type: String,
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
      }
    },

    data() {
      return {

      }
    },

    methods: {
      itemTitle(item) {
        return item.subThoroughfare ? item.thoroughfare : item.name
      },
      resultText(item) {
        // const resultString = getShortLocationString(item)
        // return `${resultString}`
        return getShortLocationString(item)
      }
    }
  })
</script>

<style lang="scss" scoped>
  .item-title {
    font-weight: bold;
    padding-top: 8;
    padding-left: 16;
  }
  .item-text {
    padding: {
      bottom: 16;
      left: 16;
      right: 16;
    }
  }
</style>