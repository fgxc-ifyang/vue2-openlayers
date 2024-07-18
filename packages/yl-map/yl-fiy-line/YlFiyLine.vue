<template>
    <div></div>
  </template>
  <script>
  /**
   * 点
   */
  
  import "ol/ol.css";
  import VectorSource from "ol/source/Vector";
  import Feature from "ol/Feature";
  import Point from "ol/geom/Point";
  import VectorLayer from "ol/layer/Vector";
  import Icon from "ol/style/Icon";
  import { Circle as CircleStyle, Stroke, Style} from "ol/style";
  
  import { gpsToGd } from "../../utils/gps";
  
  import {getVectorContext} from 'ol/render';
  import GeoJSON from 'ol/format/GeoJSON';
  import * as turf from '@turf/turf';
  import Fill from 'ol/style/Fill';
  
  export default {
    name: "YlFiyLine",
    props: {
      pointData: {
        type: Array,
        default: function () {
          return [];
        },
      },
      lineData: {
        type: Array,
        default: function () {
          return [];
        },
      },
      pointFun: {
        type: Function,
        default: function () {
          return () => {
            return {
              src: null,
              scale: null,
            };
          };
        },
      },
      lineFun: {
        type: Function,
        default: function () {
          return () => {
            return {
              color: null,
              width: null
            }
          }
        }
      },
      doStyle: {
        type: Object,
        default: function () {
          return {
            color: [200, 255, 255, 1],
            width: 1
          }
        }
      },
      showLayer: {
        type: Boolean,
        default: true,
      },
      zIndex: {
        type:Number,
        default:1
      }
    },
    watch: {
      pointData:{
        handler(newVal){
          // 判断newVal 数据类型为Array并且数据不为空数组
          let ol = Array.isArray(newVal) && newVal.length>0;
          if(ol){
            this.initData();
          }
        },
        immediate: true,
      },
      showLayer() {
        if (this.mapLayers.length > 0) {
          for (let i in this.mapLayers) {
            this.mapLayers[i].setVisible(this.showLayer);
          }
        }
      },
    },
    data() {
      return {
        mapLayers: [],
        map: null,
        interval: null,
      };
    },
    methods: {
      initData(){
        this.$nextTick(()=>{
          this.setMap();
          this.removeLayer();
          this.addPointLayer();
        })
      },
      // 设置map对象  为上层组件的map对象
      setMap(){
        if(this.map==null){
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
      // 设置  线性样式
      setLineStyle(info){
        // 优化 方法调用 多次调用问题
        let style = this.lineFun(info);
        if(style&&style.color&&style.width){
          let lintStyle = new Style({
            stroke: new Stroke({
              //地图连线的样式
              color: style.color,
              width: style.width
            }),
          })
          return lintStyle;
        }else{
          return new Style({
              stroke: new Stroke({
              color: [76, 255, 255, 0.6],
              width: 1.5
              })
          })
        }
      },
      // 回调方法设置动画点样式
      // 注释原因===========
      // 点位动画样式设置 太频繁，导致地图卡顿
      // setDoStyle(){
        // let style = this.doFun(info);
        // if (this.doStyle) {
        //   let pointStyle = new Style({
        //     image: new Icon(style.style),
        //     text: style.text || null,
        //   });
        //   return pointStyle;
        // } else if (style.type == "Circle") {
          // return new Style({
          //   image: new CircleStyle({
          //   fill: new Fill({
          //       color: this.doStyle?.color || [200, 255, 255, 1]
          //   }),
          //   radius: this.doStyle?.width || 1
          //   })
          // })
        // } else {
        //   return new Style({
        //     image: new CircleStyle({
        //     fill: new Fill({
        //         color: [200, 255, 255, 1]
        //     }),
        //     radius: 1
        //     })
        //   })
        // }
      // },
      // 设置  点样式
      setPointStyle(info) {
        let style = this.pointFun(info);
        if (style.type == "Icon") {
          let pointStyle = new Style({
            image: new Icon(style.style),
            text: style.text || null,
          });
          return pointStyle;
        } else if (style.type == "Circle") {
          let circleStyle = new Style({
            image: new CircleStyle(style.style),
            text: style.text || null,
          });
          return circleStyle;
        } else {
          return null
        }
      },
      // 加载点飞线图层
      addPointLayer() {
        let turfFormat = new GeoJSON();
        function getTurfArcFeature(start, end, opt) {
          let line = turf.lineString([
            start,
            [start[0] + (end[0] - start[0]) * 0.4,
            start[1] + (end[1] - start[1]) * 0.65],
            end
          ]);
          let curved = turf.bezierSpline(line);
          let length = turf.length(curved, { units: 'meters' });
          let bF = turfFormat.readFeature(curved);
          // bF.getGeometry().transform('EPSG:4326', 'EPSG:3857');
          bF.setProperties(opt);
          bF.set("length", length);
          return bF;
        }
        let featurePoints = [];
        if (this.pointData && this.pointData.length > 0) {
          for (let i in this.pointData) {
            let featurePoint = new Feature({
              geometry: new Point(
                gpsToGd(this.pointData[i].lng, this.pointData[i].lat)
              ),
              _md_: this.pointData[i].info,
            });
            featurePoint.setStyle(this.setPointStyle(this.pointData[i].info));
            featurePoints.push(featurePoint);
          }
          
          if (featurePoints.length > 0) {
            // 设置  点数据源
            let PointSource = new VectorSource({
              features: featurePoints,
            });
            // 设置  点图层
            let PointLayer = new VectorLayer({
              source: PointSource,
              zIndex: this.zIndex
            });
            //添加  点图层
            PointLayer.setVisible(this.showLayer);
            this.map.addLayer(PointLayer);
            this.mapLayers.push(PointLayer);
            let arcLinesFeature = [];
            if(this.lineData?.length>2){
              this.lineData.forEach((item) => {
              if(item.from[0]&&item.from[1]&&item.to[0]&&item.to[1]){
                let tempF = getTurfArcFeature([parseFloat(item.from[0]),parseFloat(item.from[1])], [parseFloat(item.to[0]),parseFloat(item.to[1])], { 'status': item.status });
                arcLinesFeature.push(tempF);
                
              }
            })
            if(!this.showLayer) return;
              let dotStyle = new Style({
                image: new CircleStyle({
                  fill: new Fill({
                    color: this.doStyle?.color || [200, 255, 255, 1]
                  }),
                  radius: this.doStyle?.width || 1
                })
              })
              PointLayer.on('postrender', (evt) => {
                let veContext = getVectorContext(evt);
                arcLinesFeature.forEach((item,index) => {
                  veContext.drawFeature(item, this.setLineStyle(item.values_));
                  // veContext.drawFeature(item, item?.values_?.status==2?wStyle:arcStyle);
                  let time = (evt.frameState.time - item.get('start')) / 1000;
                  let frac = time / 5-index/arcLinesFeature.length;
                  if (!item.get('start')) item.set('start', new Date().getTime());
                  if (frac>=1) {
                    item.set('start', new Date().getTime());
                    frac=0;
                  }
                  let along = item.getGeometry().getCoordinateAt(frac);
                  let pF=new Feature(new Point(along));
                  // veContext.drawFeature(pF, this.setDoStyle(item.values_));
                  veContext.drawFeature(pF, dotStyle);
                })
                this.map.render()
              })
            }
          }
        }
        this.loading = false;
      },
    },
    beforeCreate() {},
    created() {
      // this.$bus.$on(this.$parent.mapId + "ready", () => {
      //   if (this.map == null) {
      //     this.map = this.$parent.map;
      //   }
      //   if (this.mapLayers.length > 0) {
      //     for (let i in this.mapLayers) {
      //       this.map.removeLayer(this.mapLayers[i]);
      //     }
      //     this.mapLayers = [];
      //   }
      //   this.addPointLayer();
      // });
    },
    beforeMount() {},
    mounted() {},
    beforeDestroy() {
      // 销毁地图内容
      this.removeLayer();
    },
  };
  </script>
  
  <style scoped>
  </style>