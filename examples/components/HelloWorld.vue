<template>
  <div>
    <div class="map_index" v-show="mapShow">
      <MapLoading v-if="loading"></MapLoading>
      <div class="top_border"></div>
      <div class="left_border"></div>
      <div class="right_border"></div>
      <div class="bottom_border">
        <div
          class="bottom_border_item"
          v-for="(item, index) in menuList"
          :key="index"
          @click="changeMenu(index)"
        >
          <img
            :src="
              require(`@/assets/images/bottom_${index}${
                menuIndex == index ? '_choose' : ''
              }.png`)
            "
          />
          <div
            :class="
              menuIndex == index
                ? 'bottom_item_title active'
                : 'bottom_item_title'
            "
          >
            {{ item.label }}
          </div>
        </div>
      </div>
      <!-- 定义地图容器与相关样式（宽高等） -->
      <div id="app">
        <yl-map @handleDownEvent="handleDownEvent" ref="map">
          <template slot="yl-map-layers">
            <yl-line :lineData="lineData" :lineFun="lineFun" v-if="lineState"></yl-line>
            <yl-geo-json geoJsonUrl="https://geo.datav.aliyun.com/areas_v3/bound/510000_full.json" v-if="geoJsonState" :zIndex="2"></yl-geo-json>
            <yl-point :pointData="pointData" :pointFun="pointFun" :pointAnimation="true" v-if="pointState" :zIndex="3"></yl-point>
            <yl-fiy-line :pointData="pointData" :pointFun="flyPointFun" :lineData="lineDataFiy" :lineFun="flyLineFun" v-if="fiyState" :zIndex="4"></yl-fiy-line>
          </template>
          <template slot="yl-map-overlay">
              <!-- <div class="map-popup-style">{{ popupContent }}</div> -->
              <MapPopup :visible.sync="showDialog" style="z-index: 99999999;">
                <template slot="map-popup-title">
                  {{ popupContent?.nodeName }}
                </template>
                <template slot="map-popup-main">
                  {{ popupContent }}
                </template>
              </MapPopup>
          </template>
        </yl-map>
      </div>
      <!-- 机构条件过滤 -->
      <div
        class="map-filter-warp"
        @click.stop="
          () => {
            orgFilter = tabIndex == 0 ? !orgFilter : false;
          }
        "
      >
        <div class="map-filter-warp-left">
          <img :src="require('@/assets/images/org.png')" />
          <div v-if="chooseOrg.length > 0" class="map-choose-org">
            <div class="map-choose-org-left">已选择</div>
            <div class="map-choose-org-title">{{ chooseOrg[0].orgName }}</div>
            <div v-if="chooseOrg.length > 1" class="map-choose-org-right">
              等{{ chooseOrg.length }}个公司
            </div>
          </div>
          <span v-else>全部运营公司</span>
        </div>
        <div class="map-filter-warp-right">
          <i :class="`el-icon-arrow-${orgFilter ? 'down' : 'right'}`" />
        </div>
      </div>
      <!-- 机构条件展开 -->
      <div
        class="map-filter-warp-select"
        v-if="orgFilter"
        id="mapFilterWarpSelect"
      >
        <div
          class="map-filter-warp-select-item"
          :key="index"
          v-for="(item, index) in orgTree"
          @click="changeOrgFilter(index)"
          :class="item.state ? 'map-filter-warp-select-item-active' : ''"
        >
          <div class="map-filter-warp-select-left">
            <img :src="require('@/assets/images/org.png')" v-if="!item.state" />
            <i class="el-icon-check" v-else />
            <span>{{ item.orgName }}</span>
          </div>
          <div class="map-filter-warp-select-right">
            <i class="el-icon-arrow-right" />
          </div>
        </div>
      </div>
      <!-- 选项卡 -->
      <div class="map-tab">
        <div
          class="map-tab-item"
          v-for="(item, index) in tabList"
          :key="index"
          :class="tabIndex == index ? 'map-tab-item-active' : ''"
          @click="changeTab(index)"
        >
          <img :src="require(`@/assets/images/tab_${index}.png`)" />
          <span>{{ item.label }}</span>
        </div>
      </div>
      <!-- 监测管理 -->
      <RealtimeMonitor v-if="menuIndex == 0" />

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

import RealtimeMonitor from "./realtime-monitor/RealtimeMonitor";
import MapPopup from "./MapPopup";
export default {
  name: 'App',
  components: {
    RealtimeMonitor,
    MapPopup
  },
  data() {
    return {
      showDialog: false,
      popupContent: null,
      geoJsonState: true,
      lineState: true,
      pointState: false,
      fiyState: false,
      mapShow: true,
      mapChargesNodesShow: false,
      mapMastNodesShow: false,
      tabList: [
        {
          label: "收费节点",
          value: 0,
        },
        {
          label: "省干网",
          value: 0,
        },
        {
          label: "备品备件",
          value: 0,
        },
      ],
      tabIndex: 0,
      openNetworkDialog: false,
      orgTree: [
        {
          orgName: "全部运营公司",
          orgId: null,
          state: true,
        },
      ],
      map: null,
      orgFilter: false,
      chooseOrg: [],
      layerGroup: null,
      loading: false,
      menuList: [
        {
          label: "实时监测",
        },
        {
          label: "收费清分",
        },
        {
          label: "设备状态",
        },
        {
          label: "传输监测",
        },
        {
          label: "运维管理",
        },
      ],
      menuIndex: 0,
      netId: 1,
      currentData: {},
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
                color:null,
                width:null
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
        lineData:[
        ],//线性数据结构
        pointData: pointDataList,//点数据结构
    }
  },
  methods:{
    //地图元素点击事件
    handleDownEvent(coordinate, value){
      if(value&&value.nodeName){
        this.popupContent = value;
        this.$refs.map.showPopup({
          position: coordinate,
          offset: [5, -5],
          positioning: "bottom-center",
          duration: 250
        });
        this.showDialog = true;
      }else{
        // this.closeOverlay();
      }
    },

    //注意:closeOverlay()、refMapData()、fitView()使用:  给地图添加ref
    
    //关闭弹框
    closeOverlay(){
        this.$refs.map.close();
        this.showDialog = false;
    },
    //刷新地图叠加层数据
    refMapData(){
        this.$bus.$emit(this.$refs.map.mapId + "ready", {});
    },
    //移动焦点位置   传入值features:Array
    // fitView(feature){
      // this.$refs.map.fitViewfeatures([feature]);
    // },
    mastBack() {
      this.mapShow = true;
      this.mapMastNodesShow = false;
    },
    goback() {
      this.mapShow = true;
      this.mapChargesNodesShow = false;
    },
    // 切换选项卡
    changeTab(index) {
      if (index == this.tabIndex) {
        return;
      }
      if (index == 0) {
        this.pointState = false;
        this.fiyState = false;
        this.lineState = true;
      } else
      if(index== 1){
        this.lineState = false;
        this.pointState = false;
        this.fiyState = true;
      }
      if(index== 2){
        this.lineState = false;
        this.fiyState = false;
        this.pointState = true;
      }
      this.tabIndex = index;
      this.closeOverlay();
    },
    // 加载机构点位信息
    initData() {

    },
    // 机构点位点击事件
    orgMarkerClick() {
      this.removeChargeLayer();
      this.$refs.orgPopup.popupShow = false;
      // 隐藏点位数据
      this.layerGroup.visibleLayerGroup("orgPoint", false); // 设置隐藏
    },
    // 清空收费节点图层组
    removeChargeLayer() {
      this.layerGroup.visibleLayerGroup("chargePoint");
      this.layerGroup.removeLayerGroup("chargePoint");
    },
    alarmCount(count) {
      if (count == 0) {
        return "success";
      } else if (count == 1) {
        return "warning";
      } else {
        return "error";
      }
    },
    // 点位添加点击事件
    chargePointAddClick(iconMarker) {
      const chargeMarkerClick = iconMarker.addClick((e) => {
        // position为点击的位置，item 为 create时的附加的属性, zoom 为当前层级
        const { item } = e;
        // 回调
        this.chargeMarkerClick(item);
      }, "chargeMarkerClick");
      // 将这个事件添加到地图（统一管理）
      this.map.addInteraction(chargeMarkerClick);
    },
    chargePointAddHover(iconMarker) {
      const chargeMarkerHover = iconMarker.addHover((e) => {
        if (e.hover && e.item && !e.isCluster) {
          const { featurePosition, item } = e;
          this.$refs.chargePopup.chargeInfo = item.data;
          // 移入
          this.$refs.chargePopup.popupShow = true;
          // 在地图上创建一个覆盖物弹窗，会去自动绑定dom
          this.map.addOverlay({
            id: "charge-overlay", // 建议并且可自定义的id，指定id的目的是方便删除或复用（不会反复创建）
            position: featurePosition, // 必须，传入的点击位置（经纬度坐标）
            element: this.$refs.chargePopup.$el, // 必须，要绑定的 HTMLElement
            offset: [5, -25], // 偏移量
            positioning: "bottom-center", // 对齐方式
          });
        } else {
          this.$refs.chargePopup.popupShow = false;
        }
      }, "chargeMarkerHover");
      // 将这个事件添加到地图（统一管理）
      this.map.addInteraction(chargeMarkerHover);
    },
    // 门架、收费站点击事件
    chargeMarkerClick() {
      this.mapShow = false;
      this.mapChargesNodesShow = true;
    },
    // 改变机构筛选
    changeOrgFilter(index) {
      if (index != 0) {
        // 说明是已经选中的，判断选中机构数是否大于1
        if (this.orgTree[index].state) {
          let chooseArr = this.orgTree.filter((item) => item.state);
          if (chooseArr.length == 1) {
            return;
          }
        }
        this.orgTree[index].state = !this.orgTree[index].state;
        // 判断是否选择了其他公司
        let flag = false;
        this.chooseOrg = [];
        for (let i = 1; i < this.orgTree.length; i++) {
          if (this.orgTree[i].state) {
            flag = true;
            this.chooseOrg.push(this.orgTree[i]);
          }
        }
        this.orgTree[0].state = !flag;
      } else {
        // 判断全部选择是否已经选中，如果选中点击则不做任何操作
        if (this.orgTree[0].state) {
          return;
        } else {
          // 如果没选中，则选中，同时取消其他机构的选择
          this.orgTree.map((item) => {
            item.state = false;
          });
          this.orgTree[0].state = true;
          this.chooseOrg = [];
        }
      }
      if (this.chooseOrg.length > 0) {
        this.orgMarkerClick(this.chooseOrg);
      } else {
        this.layerGroup.visibleLayerGroup("orgPoint", true); // 设置显示
        this.removeChargeLayer();
        // 初始地图
        this.map.setCenter([102.342457, 30.627687]);
        this.map.setZoom(6.5);
      }
    },
    changeMenu(index) {
      this.menuIndex = index;
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

  .map-filter-warp {
    top: 95px;
    left: 400px;
    position: absolute;
    background: rgba(18, 54, 89, 0.92);
    width: 192px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #1a4d80;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;
    flex-shrink: 0;
    overflow: hidden;

    .map-filter-warp-left {
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      color: #b8cbe5;
      display: flex;
      align-items: center;
      margin-right: 0.5vw;
      flex: 1;
      overflow: hidden;

      span {
        margin-left: 0.5vw;
        font-size: 1.5vh;
        flex-shrink: 0;
      }

      .map-choose-org {
        flex: 1;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;

        .map-choose-org-left {
          margin-left: 0.5vw;
          font-size: 1.5vh;
          flex-shrink: 0;
        }

        .map-choose-org-title {
          margin: 0 0.5vw;
          color: #fff;
          font-size: 1.6vh;
          white-space: nowrap; //不支持换行
          overflow: hidden; //隐藏多出部分文字
          text-overflow: ellipsis; //用省略号代替多出部分文字
          width: 7vw;
        }

        .map-choose-org-right {
          font-size: 1.5vh;
          flex-shrink: 0;
        }
      }
    }

    .map-filter-warp-right {
      font-size: 1.2vh;
      align-items: center;
      color: #fff;
      flex-shrink: 0;
      display: flex;
    }
  }

  .map-filter-warp-select {
    top: calc(95px + 4.5vh + 0.3vh);
    left: 400px;
    position: absolute;
    background: rgba(18, 54, 89, 0.92);
    width: 212px;
    max-height: 40vh;
    border-radius: 4px;
    border: 1px solid #1a4d80;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    .map-filter-warp-select-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5vh;
      cursor: pointer;

      .map-filter-warp-select-left {
        font-family: Microsoft YaHei, Microsoft YaHei;
        font-weight: 400;
        color: #b8cbe5;
        white-space: nowrap; //不支持换行
        overflow: hidden; //隐藏多出部分文字
        text-overflow: ellipsis; //用省略号代替多出部分文字
        align-items: center;
        display: flex;

        img,
        i {
          width: 1.4vh;
          height: 1.4vh;
        }

        span {
          margin-left: 0.5vw;
          font-size: 1.5vh;
        }

        i {
          color: #90e865;
        }
      }

      .map-filter-warp-select-right {
        font-size: 1.5vh;
        display: flex;
        align-items: center;
        color: #fff;
      }
    }

    .map-filter-warp-select-item-active {
      background: rgba(20, 61, 102, 1);
    }
  }

  .map-tab {
    top: 95px;
    right: 400px;
    position: absolute;
    background: linear-gradient(270deg, #051c33 0%, #062340 49%, #051c33 100%);
    border-radius: 4px;
    border: 1px solid rgba(20, 112, 204, 1);
    padding: 8px;
    width: 82px;
    display: flex;
    flex-direction: column;

    .map-tab-item {
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

      img {
        width: 2.2vh;
        height: 2.2vh;
        margin-bottom: 1vh;
      }
    }

    .map-tab-item-active {
      background: rgba(25, 140, 255, 1);
    }

    .map-tab-item:last-child {
      margin-bottom: 0;
    }
  }

  .top_border {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    height: 75px;
    width: 100%;
    @include background_img_set("../assets/images/top_box.png");
  }

  .left_border {
    position: absolute;
    z-index: 100;
    top: 75px;
    height: calc(100% - 75px);
    width: 22px;
    left: 0;
    @include background_img_set("../assets/images/left_box.png");
  }

  .right_border {
    position: absolute;
    z-index: 100;
    top: 75px;
    height: calc(100% - 75px);
    width: 22px;
    right: 0;
    @include background_img_set("../assets/images/right_box.png");
  }

  .bottom_border {
    position: absolute;
    z-index: 100;
    //height: calc(100% - 75px);
    height: 60px;
    width: 100%;
    bottom: 0;
    @include background_img_set("../assets/images/bottom_box.png");
  }
}

.top_border {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  height: 75px;
  width: 100%;
  @include background_img_set("../assets/images/top_box.png");
}

.left_border {
  position: absolute;
  z-index: 100;
  top: 75px;
  height: calc(100% - 75px);
  width: 22px;
  left: 0;
  @include background_img_set("../assets/images/left_box.png");
}

.right_border {
  position: absolute;
  z-index: 100;
  top: 75px;
  height: calc(100% - 75px);
  width: 22px;
  right: 0;
  @include background_img_set("../assets/images/right_box.png");
}

.bottom_border {
  position: absolute;
  z-index: 100;
  //height: calc(100% - 75px);
  height: 60px;
  width: 100%;
  bottom: 0;
  @include background_img_set("../assets/images/bottom_box.png");
  display: flex;
  align-items: center;
  justify-content: center;
  .bottom_border_item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    flex: 1;
    max-width: 8%;
    cursor: pointer;
    img {
      margin-top: 3px;
    }
    .bottom_item_title {
      font-size: 22px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      color: #b8cbe5;
      margin-left: 8px;
    }
    .active {
      font-size: 24px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 700;
      color: #ffffff;
    }
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
</style>
