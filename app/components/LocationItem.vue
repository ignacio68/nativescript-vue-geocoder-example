<template>
  <GridLayout
    class="item-wrapper"
    rows="28, 36"
    height="64"
    :backgroundColor="listItemBackgroundColor"
    borderBottomRightRadius="16"
    borderBottomLeftRadius="16"
  >
    <Label
      class="item-title"
      row="0"
      :fontSize="itemTitleFontSize"
      :color="itemTitleFontColor"
      :text="itemTitle(item)"
    />
    <GridLayout
      row="1"
      columns="auto, auto, auto, auto, auto"
      class="item-text__wrapper"
    >
      <Label
        v-if="item.thoroughfare"
        class="item-text"
        row="0"
        col="0"
        :fontSize="itemTextFontSize"
        :color="itemTextFontColor"
        :text="item.thoroughfare"
      />
      <Label
        v-if="item.subThoroughfare"
        class="item-text"
        row="0"
        col="1"
        :fontSize="itemTextFontSize"
        :color="itemTextFontColor"
        :text="item.subThoroughfare"
      />
      <Label
        v-if="item.locality"
        class="item-text"
        row="0"
        col="2"
        :fontSize="itemTextFontSize"
        :color="itemTextFontColor"
        :text="item.locality"
      />
      <Label
        v-if="item.postalCode"
        class="item-text"
        row="0"
        col="3"
        :fontSize="itemTextFontSize"
        :color="itemTextFontColor"
        :text="item.postalCode"
      />
      <Label
        v-if="item.country"
        class="item-text"
        row="0"
        col="4"
        :fontSize="itemTextFontSize"
        :color="itemTextFontColor"
        :text="item.country"
      />
    </GridLayout>
  </GridLayout>
</template>


<script>
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
      itemTitleFontSize: {
        type: String,
        default:"16"
      },
      itemTitleFontColor: {
        type: String,
        default: "black"
      },
      itemTextFontSize: {
        type: String,
        default:"16"
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
  .item-text__wrapper {
    padding: {
      bottom: 16;
      left: 16;
      right: 16;
    }
  }
  .item-text {
    padding-right: 8;
  }
</style>