<template>
    <div></div>
  </template>
  <script>
  /**
   * 线
   */
  
  import "ol/ol.css";
  import VectorSource from "ol/source/Vector";
  import Feature from "ol/Feature";
  import VectorLayer from "ol/layer/Vector";
  import { Stroke, Style, Fill} from "ol/style";
  
  //线性
  import LineString from "ol/geom/LineString";
  
  import { localConvertArray } from "../../utils/gps";
  
  export default {
    name: "YlLayer",
    props: {
      lineData:{
        type:Array,
        default:function () {
          return []
        }
      },
      fun:{
        type:Function,
        default:function () {
          return ()=>{
            return {
              color:null,
              width:null
            }
          }
        }
      },
      showLyer:{
        type:Boolean,
        default:true
      }
    },
    watch:{
      lineData(){
        if(this.map==null){
          this.map = this.$parent.map;
        }
        if(this.mapLayers.length>0){
          for(let i in this.mapLayers){
            this.map.removeLayer(this.mapLayers[i])
          }
          this.mapLayers = []
        }
        this.addLayer();
      },
      showLyer(){
        if(this.mapLayers.length>0){
          for(let i in this.mapLayers){
            this.mapLayers[i].setVisible(this.showLyer)
          }
        }
      }
    },
    data() {
      return {
        mapLayers:[],
        map:null,
      };
    },
    methods: {
      removeLayer(){
        if(this.mapLayers.length>0){
          for(let i in this.mapLayers){
            this.map.removeLayer(this.mapLayers[i])
          }
          this.mapLayers = []
        }
      },
      setMap(){
        if(this.map==null){
          this.map = this.$parent.map;
        }
      },
      addLayer(){
        // 创建GeoJSON源
          const geojsonSource = new VectorSource({
            url: 'https://geo.datav.aliyun.com/areas_v3/bound/510000_full.json', // 替换为你的GeoJSON文件路径
            format: new GeoJSON(),
          });
          
          // 创建GeoJSON图层
          const geojsonLayer = new VectorLayer({
            source: geojsonSource,
            style: new Style({
              fill: new Fill({
                color: 'rgba(255, 0, 0, 0.2)',
              }),
              stroke: new Stroke({
                color: '#ff0000',
                width: 2,
              }),
              image: new CircleStyle({
                radius: 7,
                fill: new Fill({
                  color: '#ff0000',
                }),
              }),
            }),
          });
          this.mapLayers.push(geojsonLayer);
          // 将GeoJSON图层添加到地图
          map.addLayer(geojsonLayer);
      },
    },
    beforeCreate() {
    },
    created() {
      // this.$bus.$on(this.$parent.mapId + "ready", () => {
      //   if(this.map==null){
      //     this.map = this.$parent.map;
      //   }
      //   if(this.mapLayers.length>0){
      //     for(let i in this.mapLayers){
      //       this.map.removeLayer(this.mapLayers[i])
      //     }
      //     this.mapLayers = []
      //   }
      //   this.addLayer();
      // });
    },
    beforeMount() {
    },
    mounted() {
    }
  };
  </script>
  
  <style scoped>
  </style>