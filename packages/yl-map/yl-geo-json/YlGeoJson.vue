<template>
    <div></div>
  </template>
  <script>
  /**
   * 线
   */
  
  import "ol/ol.css";
  import VectorSource from "ol/source/Vector";
  import VectorLayer from "ol/layer/Vector";
  import { Stroke, Style, Fill} from "ol/style";
  import GeoJSON from 'ol/format/GeoJSON';
  
  export default {
    name: "YlGeoJson",
    props: {
      geoStyle:{
        type:Object,
        default:function () {
          return {
            fillColor: 'rgba(25, 140, 255, 0.2)',
            strokeColor: '#3e95eb',
            strokeWidth: 2,
          }
        }
      },
      geoJsonUrl:{
        type:String,
        default:'https://geo.datav.aliyun.com/areas_v3/bound/510000_full.json'
      },
      showLyer:{
        type:Boolean,
        default:true
      },
      zIndex:{
        type:Number,
        default:1
      }
    },
    watch:{
      showLyer(){
        if(this.mapLayers.length>0){
          for(let i in this.mapLayers){
            this.mapLayers[i].setVisible(this.showLyer)
          }
        }
      },
      // url深度监听
      geoJsonUrl: {
        handler(newVal){
          if(newVal){
            this.initData();
          }
        },
        immediate: true,
      }
    },
    data() {
      return {
        mapLayers:[],
        map:null,
      };
    },
    methods: {
      initData(){
        this.$nextTick(()=>{
          this.setMap();
          this.removeLayer();
          this.addGeoJsonLayer();
        })
      },
      // 设置map对象  为上层组件的map对象
      setMap(){
        if(this.map == null){
          this.map = this.$parent.map;
        }
      },
      // 删除图层
      removeLayer(){
        if(this.mapLayers.length>0){
          for(let i in this.mapLayers){
            this.map.removeLayer(this.mapLayers[i])
          }
          this.mapLayers = []
        }
      },
      // 添加geoJson图层
      addGeoJsonLayer(){
        // 创建GeoJSON源
          const geojsonSource = new VectorSource({
            url: this.geoJsonUrl, // 替换为你的GeoJSON文件路径
            format: new GeoJSON(),
          });
          
          // 创建GeoJSON图层
          const GeoJsonLayer = new VectorLayer({
            source: geojsonSource,
            style: new Style({
                fill: new Fill({
                color: this.geoStyle.fillColor || 'rgba(255, 0, 0, 0.2)',
              }),
              stroke: new Stroke({
                color: this.geoStyle.strokeColor || '#3e95eb',
                width: this.geoStyle.strokeWidth || 2,
              }),
            }),
            zIndex: this.zIndex
          });
          
          // 将GeoJSON图层添加到地图
          GeoJsonLayer.setVisible(this.showLyer);
          this.map.addLayer(GeoJsonLayer);
      },
    },
    beforeCreate() {
    },
    created() {
      this.$bus.$on(this.$parent.mapId + "ready", () => {
        this.initData();
      });
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeDestroy() {
      this.removeLayer();
    },
  };
  </script>
  
  <style scoped>
 *{
    color:rgba(25, 140, 255, 0.24)
 }
  </style>