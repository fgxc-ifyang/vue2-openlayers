<template>
    <div class="yl-map-wapper">
      <div :id="mapId" :ref="mapId" style="height:100%;width:100%;">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  import { Map, View } from "ol";
  import 'ol/ol.css'; // 引入 OpenLayers 的样式
  import TileLayer from "ol/layer/Tile";
  import XYZ from 'ol/source/XYZ';
  
  //弹框
  import Overlay from "ol/Overlay";

  
  //自定义事件方法
  import {
    defaults as defaultInteractions,
    Pointer as PointerInteraction
  } from "ol/interaction";
  
  export default {
    name: "YlMap",
    props: {
      mapUrl: {
        type: String,
        default: 'https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
      },
      center: {
        type: Array,
        default: function() {
          return [104.06, 30.67];
        }
      },
      zoom: {
        type: Number,
        default: 7
      },
      zooms: {
        type: Array,
        default: function() {
          return [5, 20];
        }
      }
    },
    data() {
      return {
        timeout: null,
        content:null,//内容
        mapId: null,//地图id
        map: null,//地图
        view: null,
        overlay:null,//弹框
      };
    },
    methods: {
      //弹窗
      showPopup(parms){
        if(parms&&parms.element){
          //弹窗显示方法
          this.overlay = new Overlay({
            element: document.getElementById('popup'),
            //是否自动平移，即假如标记在屏幕边缘，弹出时自动平移地图使弹出框完全可见
            autoPan: parms.duration!=null?true:false,
            autoPanAnimation: {
              duration: parms.duration
            },
            offset: [5, -25], // 偏移量
            positioning: "bottom-center", // 对齐方式
            coordinate: [104.06, 30.67], // 位置
            ...parms
          });
          //设置overlay的显示位置
          this.overlay.setPosition(parms.position);
          //显示overlay
          this.map.addOverlay(this.overlay);
        }

      },
      close(){
        //弹窗关闭方法（防止外部调用此方法——所以先要判断是否为空）
        this.overlay ? this.overlay.setPosition(undefined) : "";
      },
      fitViewfeatures(features,state = false,zoom,duration) {
        let box1, box2, box3, box4;
        let box1s = [];
        let box2s = [];
        let box3s = [];
        let box4s = [];
        for (let i in features) {
          let po = features[i].getGeometry().extent_;
          if (po) {
            box1s.push(po[0]);
            box2s.push(po[1]);
            box3s.push(po[2]);
            box4s.push(po[3]);
          }
        }
        if (box1s && box2s && box3s && box4s) {
          box1 = Math.min.apply(null, box1s);
          box2 = Math.min.apply(null, box2s);
          box3 = Math.max.apply(null, box3s);
          box4 = Math.max.apply(null, box4s);
          let view = this.map.getView();
          // let size = this.map.getSize();
          let mzoom = view.getZoom();
          let coorBox = [box1, box2, box3, box4];
          //fit()其它属性无效--暂定解决方案   animate
          view.fit(coorBox);
          if(state){
            view.animate({
              zoom: zoom?mzoom:zoom,
              duration: duration?1000:duration,
            });
          }

        }
      },
      fitViewSource(source) {
        let view = this.map.getView();
        var feature = source.getFeatures()[0];
        var polygon = feature.getGeometry();
        view.fit(polygon, { padding: [50, 50, 50, 150] });
      },
      fitViewfeature(feature) {
        let view = this.map.getView();
        var polygon = feature.getGeometry();
        view.fit(polygon, { padding: [300, 300, 300, 150] });
      },
      fitCenter(center, zoom, duration= 700) {
      let view = this.map.getView();
      let mzoom = view.getZoom();
      function flyTo(location) {
        view.animate({
          center: location,
          duration: duration,
          zoom: mzoom?mzoom:zoom
        });
      }
      if (center[0] && center[1]) {
        flyTo(center);
      }
    },
      CustomEvent() {
        let _this = this;
        class Drag extends PointerInteraction {
          constructor() {
            super({
            handleDownEvent: handleDownEvent,
            handleDragEvent: handleDragEvent,
            handleMoveEvent: handleMoveEvent,
            handleUpEvent: handleUpEvent,
            });

            /**
             * @type {import("../src/ol/coordinate.js").Coordinate}
             * @private
             */
            this.coordinate_ = null;

            /**
             * @type {string|undefined}
             * @private
             */
            this.cursor_ = 'pointer';

            /**
             * @type {Feature}
             * @private
             */
            this.feature_ = null;

            /**
             * @type {string|undefined}
             * @private
             */
            this.previousCursor_ = undefined;
          }
        }
        /**
         * 按下的方法
         */
        function handleDownEvent(evt) {
          let map = evt.map;
          map.forEachFeatureAtPixel(evt.pixel, function(feature) {
            //防抖
            function debounce(fn, wait) {
              if(!_this.timeout!=null){
                _this.timeout = setTimeout(()=>{
                  clickEvent();
                  _this.timeout = null
                }, wait)
              }
            }
            debounce(clickEvent, 500);
            //点击后执行的事件
            function clickEvent() {
              // 点击回调事件
              _this.$emit("handleDownFeatureEvent",{evtCoordinate:evt.coordinate, value:feature.values_._md_==undefined?feature.values_:feature.values_._md_, feature:feature,evt:evt,featureCoordinate:feature.getGeometry().getCoordinates()});
            }
          });
          _this.$emit("handleDownEvent",evt)
        }
  
        /**
         * 移动后的点位方法
         *
         */
        function handleDragEvent(evt) {
          let deltaX = evt.coordinate[0] - this.coordinate_[0];
          let deltaY = evt.coordinate[1] - this.coordinate_[1];
          let geometry = this.feature_.getGeometry();
          geometry.translate(deltaX, deltaY);
          this.coordinate_[0] = evt.coordinate[0];
          this.coordinate_[1] = evt.coordinate[1];
        }
  
        /**
         * 移动的方法
         */
        function handleMoveEvent(evt) {
          if (this.cursor_) {
            let map = evt.map;
            let feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
              return feature;
            });
            let element = evt.map.getTargetElement();
            if (feature) {
              if (element.style.cursor != this.cursor_) {
                this.previousCursor_ = element.style.cursor;
                element.style.cursor = this.cursor_;
              }
            } else if (this.previousCursor_ !== undefined) {
              element.style.cursor = this.previousCursor_;
              this.previousCursor_ = undefined;
            }
          }
        }
  
        /**
         * 放开的方法
         */
        function handleUpEvent() {
          this.coordinate_ = null;
          this.feature_ = null;
          return false;
        }
        return Drag;
      }
    },
    created() {
      // console.info("map-created");
      this.mapId = "map" + new Date().getTime();
    },
    mounted() {
      let CustomEvent = this.CustomEvent();
      // console.info("地图组件挂载,id:" + this.mapId);
      let view = new View({
        center: this.center,
        projection: "EPSG:4326",
        zoom: this.zoom,
        minZoom: this.zooms[0],
        maxZoom: this.zooms[1],
      });
      this.view = view;
      const map = new Map({
        interactions: defaultInteractions().extend([new CustomEvent()]),
        target: this.$refs[this.mapId],
        layers: [
          new TileLayer({
            source: new XYZ({
            url: this.mapUrl
          }),
            name: "底图"
          })
        ],
        view: view
      });
      this.map = map;
      // this.$bus.$emit(this.mapId + "ready", {});
    },
    beforeDestroy() {
      // console.info("map-beforeDestroy");
      if (this.map) {
        this.map.setTarget(null);
        this.map = null;
      }
    },
  };
  </script>
  
  <style scoped>
  .yl-map-wapper {
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 80%;
    font-family: Source Han Sans CN;
    font-weight: 400;
  }
  /* .popup-close{
    position: absolute;
    right: 5px;
    top:5px;
    cursor: pointer;
  } */
  /* .ol-popup{
    position:fixed;
    z-index: 9999999999;
  } */
  </style>