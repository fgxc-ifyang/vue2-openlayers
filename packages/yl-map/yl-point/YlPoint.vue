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
import {easeOut} from 'ol/easing';
import {unByKey} from 'ol/Observable';

export default {
  name: "YlPoint",
  props: {
    pointData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    pointAnimation: {
      type: Boolean,
      default: false
    },
    pointInitAnimation: {
      type: Object,
      default: function () {
        return {
          key: 'subType',
          value: 1
        };

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
    radius: {
      type: Number,
      default: 15,
    },
    color: {
      type: String,
      default: "255, 168, 0",
    },
    showLayer: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    pointData: {
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
        this.checkPointAnimation();
      })
    },
    // 清空所有定时器
    clearAllInterval() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    // 判断是否开启点位扩散动画
    checkPointAnimation() {
      if (this.pointAnimation) {
        if (this.interval) { // 定时器存在，需清空
          clearInterval(this.interval)
        }
        // 执行点位扩散方法（设置定时器原因：一直执行扩散动画否则只动画一次）
        this.pointAnimationFc();
        this.interval = window.setInterval(this.pointAnimationFc, 2000);
      }
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
    // 点位扩散动画
    pointAnimationFc() {
      // 优化自执行函数 减少重复执行
      if(this.showLayer){
      // 有点则不添加，开启动画
      let featurePoints = this.mapLayers[0].getSource().getFeatures();
      featurePoints = featurePoints.filter(item => item.values_._md_[this.pointInitAnimation.key] == this.pointInitAnimation.value);
      // 开启动画
      let start = new Date().getTime(), duration = 3000, _this = this;
      let listenerKey = this.mapLayers[0].on("postrender", function (event) {
        let vectorContext = getVectorContext(event);
        let frameState = event.frameState;
        for (let i in featurePoints) {
            let flashGeom = featurePoints[i].getGeometry().clone();
            let elapsed = frameState.time - start;
            let elapsedRatio = elapsed / duration;
            let radius = easeOut(elapsedRatio) * 15 + _this.radius;
            let opacity = easeOut(1 - elapsedRatio);

            let style = new Style({
              image: new CircleStyle({
                radius: radius,
                stroke: new Stroke({
                  color: "rgba("+_this.color+", " + opacity + ")",
                  width: 0.25 + opacity,
                }),
              }),
            });

            vectorContext.setStyle(style);
            vectorContext.drawGeometry(flashGeom);
            if (elapsed > duration) {
              unByKey(listenerKey);
              return;
            }
            _this.map.render();
          }
      });
      }
    },
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
    addPointLayer() {
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
          });
          //添加  点图层
          PointLayer.setVisible(this.showLayer)
          this.map.addLayer(PointLayer);
          this.mapLayers.push(PointLayer);
        }
      }
      this.loading = false;
    },
  },
  beforeCreate() {},
  created() {
    // bus 事件监听
    // todo  事件监听  优化
    // 任务调度
    // 兼容 vue3没有bus
    this.$bus.$on(this.$parent.mapId + "ready", () => {
      this.initData();
    });
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {
    this.removeLayer();
    this.clearAllInterval();
  },
};
</script>

<style scoped>
</style>