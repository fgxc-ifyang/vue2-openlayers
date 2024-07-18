<template>
  <div>
    <div class="map_index">
      <!-- 定义地图容器与相关样式（宽高等） -->
      <div id="app">
        <yl-map @handleDownFeatureEvent="handleDownFeatureEvent" ref="map" :mapUrl="mapUrl">
          <yl-line :lineData="lineData" :lineFun="lineFun" v-if="tabIndex==1"></yl-line>
          <yl-point :pointData="pointData" :pointFun="pointFun" :pointAnimation="tabIndex==3" v-if="tabIndex==3 || tabIndex == 2" :zIndex="3"></yl-point>
          <yl-fiy-line :pointData="pointData" :pointFun="flyPointFun" :lineData="lineDataFiy" :lineFun="flyLineFun" v-if="tabIndex == 4" :zIndex="4"></yl-fiy-line>
          <yl-geo-json :geoJsonUrl="geoJsonUrl" v-if="tabIndex==5" :zIndex="2"></yl-geo-json>
        </yl-map>
      </div>
      <div class="btn-list">
        <div class="btn" @click="changeTab(item, index + 1)" v-for="(item, index) in tableList" :key="index" :class="tabIndex==(index+1)?'active':''">{{ item.name }}</div>
      </div>
    </div>
    <div id="popup">
      <MapPopup :visible.sync="showDialog">
        <template slot="map-popup-title">
          {{ popupContent?.nodeName }}
        </template>
        <template slot="map-popup-main">
          {{ popupContent }}
        </template>
      </MapPopup>
    </div>
  </div>
</template>

<script>
import { sichuan } from "../data/510000";
import { returnFlyingSpotData } from "../data/testData";
let pointDataList = [];
returnFlyingSpotData().data.locationInfo.forEach(el=>{
  pointDataList.push({
    info: el,
    lat: el.latitude,
    lng: el.longitude
  })
})
// openlayers叠加mapbox自定义底图
let accessToken = 'pk.eyJ1IjoiZ2FwNDE3IiwiYSI6ImNseTlsc2J3ZDBvZGwybHNhanhnbWRibTMifQ.QSQ15RREYt2jYX79hNeMnA';
let mapBoxStyleId = 'clybcf4b900dp01pf94zj0mbh';
let mapboxUserName = 'gap417'
let baseUrl = `https://api.mapbox.com/styles/v1/${mapboxUserName}/${mapBoxStyleId}/tiles/256/{z}/{x}/{y}?access_token=${accessToken}`

import MapPopup from "./MapPopup";
export default {
  name: 'App',
  components: {
    MapPopup
  },
  data() {
    return {
      mapUrl: baseUrl,
      tabIndex: 0,
      tableList: [
        {name: '线型示例'},
        {name: '点位示例'},
        {name: '点位扩散示例'},
        {name: '飞线示例'},
        {name: 'geoJson数据示例'},
      ],
      geoJsonUrl: 'https://geo.datav.aliyun.com/areas_v3/bound/510000.json',
      showDialog: false,
      popupContent: null,
      geoJsonState: true,
      lineState: true,
      pointState: false,
      fiyState: false,
      lineDataFiy: returnFlyingSpotData().data.relationship,
      pointFun:(element)=>{
          return {
            style: {
              src: element.subType==2?require("@/assets/images/warehouse_map_success.png"):require("@/assets/images/warehouse_map_warning.png"),
              scale: 1,
            },
            type: 'Icon'
          }
      },//点样式
      lineFun:()=>{
          return {
              color: 'rgb(76, 255, 255)',
              width: 6
          }
      },//线样式
      flyPointFun:(element)=>{
        return {
            style: {
              src: element.subType==2?require("@/assets/images/w_mj_map.png"):require("@/assets/images/red_circle.png"),
              scale: 1,
            },
            type: 'Icon'
          }
      },//飞点样式
      flyLineFun:(element)=>{
          if(element){
            if(element.status==1){
              return {
                color: [76, 255, 255, 0.6],
                width: 1.5
              }
            }else{
              return {
                color: [179, 178, 116, 1],
                width: 1.5
              }
            }
          }
          return {
            color: [76, 255, 255, 0.6],
            width: 1.5
          }
      },//飞线样式
      lineData:[],//线性数据结构
      pointData: pointDataList,//点数据结构
    }
  },
  methods:{
    //地图元素点击事件
    handleDownEvent(){

    },
    handleDownFeatureEvent(event){
      this.popupContent = event.value;
      this.$refs.map.showPopup({
        element: document.getElementById('popup'),
        position: event.evtCoordinate,
        offset: [5, -20],
        positioning: "bottom-center",
        duration: 250
      });
      this.showDialog = true;
      this.$refs.map.fitCenter(event.evtCoordinate);
    },

    //注意:closeOverlay()、refMapData()、fitView()使用:  给地图添加ref
    
    //关闭弹框
    closeOverlay(){
      this.$refs.map.close();
      this.showDialog = false;
    },
    //刷新地图叠加层数据
    // refMapData(){
    //   this.$bus.$emit(this.$refs.map.mapId + "ready", {});
    // },
    //移动焦点位置   传入值features:Array
    // fitView(feature){
      // this.$refs.map.fitViewfeatures([feature]);
    // },
    // 切换选项卡
    changeTab(item, index) {
      if (index == this.tabIndex) {
        return;
      }
      this.tabIndex = index;
      this.closeOverlay();
    },
  },
  mounted(){
    // 模拟改变线型数据值
    this.lineData = [{
      data: sichuan().features[0].geometry.coordinates[0],
      info: sichuan().features[0].properties.name,
    }]
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/map-base.scss";

:deep() html, body, #app {
  height: 100%;
  margin: 0px;
}

::v-deep ::-webkit-scrollbar {
  width: 0.5vh !important;
  height: 0.5vh !important;
}

::v-deep ::-webkit-scrollbar-thumb {
  border-radius: 2px !important;
  background: rgba(31, 92, 153, 1) !important;
}

.map_index {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  i {
    font-size: 1.2vh;
  }

  img {
    width: 1.5vh;
    height: 1.5vh;
  }

  #map {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
  }

}


.map-popup-style{
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  max-width: 200px;
  word-break: break-all;
  white-space: normal;
}

.btn-list{
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .btn{
    display: flex;
    flex: 1;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.8vh;
    background: #093159;
    color: rgba(184, 203, 229, 1);
    font-size: 1.25vh;
    padding: 1vh 0.8vh;
    border-radius: 2px;
    cursor: pointer;
    &:hover{
      color: #409eff;
    }
  }
  .active{
    background: rgba(25, 140, 255, 1);
  }
}
:deep() .ol-zoom-in{
  background: #093159;
  color: #fff !important;
  border-radius: 5px;
  padding: 5px;
  font-size: 12px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover{
    color: #fff;
  }
}
:deep() .ol-zoom-out{
  background: #093159;
  color: #fff !important;
  border-radius: 5px;
  padding: 5px;
  font-size: 12px;
  cursor: pointer;
  &:hover{
    color: #fff;
  }
}
:deep() .ol-control{
  background: transparent;
}
</style>
