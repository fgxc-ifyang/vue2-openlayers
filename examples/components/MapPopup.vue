<template>
  <div id="warehouse-popup" class="map-popup" v-if="visible">
    <img
      class="close_diago"
      @click="close"
      src="../assets/images/close_diago.png"/>
    <div class="map-popup-title">
      <slot name="map-popup-title"></slot>
    </div>
    <div class="map-popup-main">
      <slot name="map-popup-main"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapPopup',
  props: {
    visible: {  
      type: Boolean,  
      default: false  
    }  
  },
  data() {
    return {
      popupShow: false,
    };
  },
  methods: {
    close() {  
      this.$emit('update:visible', false);  
    }  
  }
};
</script>

<style lang="scss" scoped>
.map-popup {
  position: relative;
  width: 28.43vw;
  height: 17.34vw;
  background-image: url("../assets/images/warehouse_map_popup.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.56vw 1.56vw 1.56vw;
  // position: absolute;
  // left: 50vw;
  // top: 50vh;
  .map-popup-title{
    font-size: 18px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 700;
    color: #ffffff;
    height: 2.86vw;
    display: flex;
    align-items: center;
  }
  .map-popup-main {
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 14px;
    margin-top: 0.625vw;
    padding: 1vw 1vw 0 1vw;
    flex-direction: column;
  }
}
.close_diago {
  height: 28px;
  width: 28px;
  margin-right: 20px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 5px;
}
</style>