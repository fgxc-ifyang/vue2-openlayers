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
import { Stroke, Style} from "ol/style";

//线性
import LineString from "ol/geom/LineString";

import { localConvertArray } from "../../utils/gps";

export default {
  name: "YlLine",
  props: {
    lineData:{
      type:Array,
      default:function () {
        return []
      }
    },
    lineFun:{
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
    showLayer:{
      type:Boolean,
      default:true
    }
  },
  watch:{
    lineData: {
      handler(newVal){
        // 判断newVal 数据类型为Array并且数据不为空数组
        let ol = Array.isArray(newVal) && newVal.length>0;
        if(ol){
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
        this.addLineLayer();
      
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
        return null
      }
    },
    // 加载线型图层
    addLineLayer(){
        let featureLines = []
        if(this.lineData && this.lineData.length>0){
          for(let i in this.lineData){
            if(this.lineData[i].data.length>0){
              for(let x in this.lineData[i].data){
                if(this.lineData[i].data[x].length>1){
                    // 设置  feature
                    let featureLine = new Feature({
                      geometry: new LineString(localConvertArray(this.lineData[i].data[x])),
                      _md_: this.lineData[i].info
                    });
                    featureLine.setStyle(this.setLineStyle(this.lineData[i].info));
                    featureLines.push(featureLine);
                }
              }
            }
          }
          if(featureLines.length>0){
            // 设置  线性数据源
            let LineSource = new VectorSource({
                features: featureLines
            });
            // 设置  线性图层
            let LineLayer = new VectorLayer({
                source: LineSource,
                style:new Style({
                    stroke: new Stroke({
                        width: 6,
                    })
                }),
                type: "Line",
            });
            //添加  线性图层
            LineLayer.setVisible(this.showLayer);
            this.map.addLayer(LineLayer);
            this.mapLayers.push(LineLayer);
          }
        }
    },
  },
  beforeCreate() {
  },
  created() {
    // bus 事件监听
    // todo  事件监听  优化
    // 任务调度
    // 兼容 vue3没有bus
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
</style>