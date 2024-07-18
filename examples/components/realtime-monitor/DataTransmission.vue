<template>
  <public-box class="data_transmission">
    <template slot="title">实时数据传输</template>
    <div class="data_transmission_content" slot="content">
      <div class="font_weight_700 font_16 color_white dis_flex align_items_center">
        <img class="data_transmission_content_img"
             src="../../assets/images/exception1.png" alt="">
        <span class="font_15">异常收费站</span>
      </div>
      <div class="exceptionStation" ref="exceptionStation"></div>

      <div class="font_weight_700 font_16 color_white dis_flex align_items_center marg_top20">
        <img class="data_transmission_content_img"
             src="../../assets/images/exception2.png" alt="">
        <span class="font_15">异常门架</span>
      </div>
      <div class="exceptionDroom" ref="exceptionDroom"></div>
    </div>
  </public-box>
</template>

<script>
import PublicBox from "../charge-separation/box/PublicBox";
import {deepClone, realDataTransOption} from '../../assets/js/common';
import {EleResize} from "@/utils/echarts/esresize";

export default {
  name: "DataTransmission",
  components: {PublicBox},
  mounted() {
    setTimeout(() => {
      this.initStation();
      this.initDroomChart();
    }, 300)
  },
  data() {
    return{
      exceptionStation: null,
      exceptionDroom: null
    }
  },
  methods: {
    initStation() {
      this.$refs.exceptionStation?.removeAttribute('_echarts_instance_')
      this.exceptionStation = this.$echarts.init(this.$refs.exceptionStation);
      const gradientColor = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {offset: 0, color: 'rgba(25,140,255,1)'},
        {offset: 1, color: 'rgba(25,140,255,0)'}
      ]);
      let option = deepClone(realDataTransOption)
      option.xAxis[0].data = ["交易数据", "治超数据", "车道工控制心跳"];
      option.series[0].data = [0, 40, 80];
      option.color = gradientColor;
      this.exceptionStation.setOption(option);
      EleResize.on(this.$refs.exceptionStation, ()=> {
        this.exceptionStation.resize()
      })
    },

    initDroomChart() {
      this.$refs.exceptionStation?.removeAttribute('_echarts_instance_')
      this.exceptionDroom = this.$echarts.init(this.$refs.exceptionDroom);
      const gradientColor = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {offset: 0, color: 'rgba(25,140,255,1)'},
        {offset: 1, color: 'rgba(25,140,255,0)'}
      ]);
      let option = deepClone(realDataTransOption)
      option.xAxis[0].data = ["交易数据", "治超数据", "车道工控制心跳"];
      option.series[0].data = [0, 40, 80];
      option.color = gradientColor;
      this.exceptionDroom.setOption(option);

      EleResize.on(this.$refs.exceptionDroom, ()=> {
        this.exceptionDroom.resize()
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.exceptionStation {
  height: 240px;
  width: 320px
}

.exceptionDroom {
  height: 240px;
  width: 320px
}

.data_transmission {
  position: absolute;
  z-index: 100;
  top: 410px;
  right: 30px;

  .data_transmission_content {
    width: 100%;
    height: calc(100vh - 490px);
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;

    .data_transmission_content_img {
      height: 24px;
      width: 24px;
      margin-right: 10px
    }
  }
}

</style>
