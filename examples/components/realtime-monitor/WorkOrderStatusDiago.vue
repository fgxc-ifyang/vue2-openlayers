<template>
  <PublicDiago @closeDiago="closeDiago" class="work_order_status_diago">
    <template slot="title">实施工单状态</template>
    <div slot="content" class="work_order_status_diago_content">
      <div class="transaction_stattions">
        <div v-for="(item,index) in buttons" :key="index"
             @click="changeType(index)"
             :class="`transaction_stattion ${active===index?'transaction_active':''}`">{{ item }}
        </div>
      </div>

      <div class="work_order_status_diago_text dis_flex just_content_space_between">
        <div class="work_order_status_diago_text_item dis_flex align_items_center just_content_center color_qi"
             v-for="(item,index) in textList" :key="index">
          <img class="h_50 w_50" :src="item.logo" alt="">
          <div class="marg_left10 font_16">
            <div class="work_order_status_diago_text_item_title">{{ item.title }}</div>
            <div class="work_order_status_diago_text_item_title marg_top5">
              <span class="color_white font_weight_700 font_22 font_family_DIN">{{ item.count }}</span>单
            </div>
          </div>
        </div>
      </div>

      <div class="work_statis w_100 just_content_space_between dis_flex align_items_center">
        <div style="flex: 1" class="dis_flex just_content_center">
          <div class="workStatisPie" ref="workStatisPie"></div>
        </div>

        <div class="work_statis_content">
          <div class="work_item" v-for="(item,index) in workData" :key="index">
            <div class="work_item_img text-center">
              <img :src="require(`../../assets/images/work${index+1}.png`)"
                   alt="">
              <div class="color_white font_weight_700 font_16 text-center marg_top10">{{ item.title }}</div>
            </div>
            <div class="color_qi font_14">
              <div>未完成</div>
              <div class=" marg_top10"><span
                  class="color_white font_weight_700 font_22">{{ item.noCompleteNumber }}</span>单
              </div>
            </div>

            <div class="color_qi font_14">
              <div>正在处理</div>
              <div class=" marg_top10"><span class="color_white font_weight_700 font_22">{{ item.waitNumber }}</span>单
              </div>
            </div>

            <div class="color_qi font_14">
              <div>平均完成时间</div>
              <div class=" marg_top10">
                <span class="color_white font_weight_700 font_22">00</span>小时<span
                  class="color_white font_weight_700 font_22">00</span>分钟
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </PublicDiago>
</template>

<script>
import PublicDiago from "../charge-separation/box/PublicDiago";
import {annularEchartsOptions} from "../../assets/js/common";
import {EleResize} from "@/utils/echarts/esresize";

export default {
  name: "WorkOrderStatusDiago",
  components: {PublicDiago},
  data() {
    return {
      active: 0,
      buttons: ['未完成', '已完成'],

      textList: [
        {
          logo: require('../../assets/images/work_error.png'),
          title: '未完成工单',
          count: 29,
        }, {
          logo: require('../../assets/images/work_wait.png'),
          title: '待受理工单',
          count: 29,
        },
        {
          logo: require('../../assets/images/work_su.png'),
          title: '正在处理工单',
          count: 29,
        },
      ],
      workData: [
        {
          title: '一级工单',
          noCompleteNumber: 11,
          waitNumber: 11
        },
        {
          title: '二级工单',
          noCompleteNumber: 11,
          waitNumber: 11
        },
        {
          title: '三级工单',
          noCompleteNumber: 11,
          waitNumber: 11
        },
      ],
      data: [
        {
          value: 10, name: '一级工单', itemStyle: {
            color: '#E05A5A'
          },
        },
        {
          value: 10, name: '二级工单', itemStyle: {
            color: '#FAC15F'
          },
        },
        {
          value: 10, name: '三级工单', itemStyle: {
            color: '#1966FF'
          },
        },
      ],
    }
  },
  mounted() {
    this.initWorkStatisPie();
  },

  methods: {
    closeDiago() {
      this.$bus.$emit('openStatusDiago', false);
    },
    changeType(index) {
      this.active = index;
    },
    initWorkStatisPie() {
      this.$refs.workStatisPie?.removeAttribute('_echarts_instance_');
      // 获取容器
      const workStatisPie = this.$refs.workStatisPie;

      // 初始化 ECharts 实例
      const myChart = this.$echarts.init(workStatisPie, 'dark');
      let options = JSON.parse(JSON.stringify(annularEchartsOptions));
      options.title.text = '未完成工单情况';
      options.legend = {bottom: '0', icon: 'circle'},
          options.series[0].data = this.data;
      myChart.setOption(options);

      EleResize.on(this.$refs.workStatisPie, function () {
        myChart.resize()
      })

    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/map-base.scss";
::v-deep .public_diago_box {
  width: 65% !important;
  height: 80%!important;
}
.work_item_img {
  img {
    width: 36px;
    height: 46px
  }
}

.workStatisPie {
  width: 350px;
  height: 400px;
  //margin-left: 150px
}

.work_statis_content {
  width: 580px;
  margin-right: 30px
}

.work_statis {
  margin-top: 40px;
}

.transaction_stattions {
  display: flex;
  align-items: center;

  .transaction_stattion {
    height: 30px;
    width: 60px;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    color: #B8CBE5;
    @include background_img_set('../../assets/images/not_station.png');
  }

  .transaction_active {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 700;
    color: #FFFFFF;
    @include background_img_set('../../assets/images/station.png');
  }
}

.work_order_status_diago_text {
  margin-top: 32px;

  .work_order_status_diago_text_item {
    flex: 1;
    height: 95px;
    @include background_img_set('../../assets/images/diago_text_box.png');

  }

  .work_order_status_diago_text_item {
    margin-right: 10px;
  }

  .work_order_status_diago_text_item:not(:first-child) {
    margin-left: 10px;
  }
}

.work_item {
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 112px;
  background: #1A446C;
  border-radius: 10px 10px 10px 10px;
  align-items: center;
  //padding-left: 30px;

}

.work_item:not(:first-child) {
  margin-top: 20px;
}
</style>
