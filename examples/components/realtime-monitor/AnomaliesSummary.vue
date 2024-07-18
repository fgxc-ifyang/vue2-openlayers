<template>
  <public-box class="anomalies_summary">
    <template slot="title">实时异常汇总</template>
    <div
      class="anomalies_summary_content dis_flex flex-warp w_100 align_items_center"
      slot="content"
    >
      <img src="../../assets/images/exception.png" alt="" />
      <div>
        <div
          class="anomalies_summary_content_info_item dis_flex just_content_space_between align_items_center"
          v-for="(item, index) in exceptionData"
          :key="index"
        >
          <div class="anomalies_summary_content_info_title color_qi font_14">
            {{ item.title }}
          </div>
          <div class="anomalies_summary_content_info_data color_qi font_14">
            <span
              class="color_white font_22 font_weight_700 font_family_DIN marg_right10"
              >{{ item.count }}</span
            >个
          </div>
        </div>
      </div>
      <div class="exception_prompt color_qi">
        <div class="exception_prompt_symbol">!</div>
        <div>
          <!--          存在-->
          <span class="color_red font_weight_700 font_18 font_family_DIN">
            <!--            1-->
          </span>
          <!--          处连续5个门架异常-->
          暂无数据
        </div>
      </div>
    </div>
  </public-box>
</template>

<script>
import PublicBox from "../charge-separation/box/PublicBox";
// import { getDeviceAbnormal } from "@/api/map";

export default {
  name: "AnomaliesSummary",
  components: { PublicBox },
  data() {
    return {
      exceptionData: [
        { title: "收费站", count: 0, key: "tollStation" },
        { title: "门架", count: 0, key: "gantry" },
        { title: "省干线", count: 0, key: "economize" },
      ],
      queryData: {
        codes: [],
      },
    };
  },
  created() {
    // this.queryData.codes = this.$store.state.orgIds;
    // this.getDeviceAbnormal();
  },
  mounted() {},
  destroyed() {},
  methods: {
    // getDeviceAbnormal() {
    //   getDeviceAbnormal(this.queryData).then((res) => {
    //     Object.keys(res.data).forEach((key) => {
    //       let index = this.exceptionData.findIndex((item) => item.key == key);
    //       this.exceptionData[index].count = res.data[key];
    //     });
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/map-base.scss";

.anomalies_summary {
  margin-top: 15px;

  .anomalies_summary_content {
    padding: 40px 20px 30px;
    box-sizing: border-box;

    img {
      width: 120px;
      height: 120px;
      margin-left: 25px;
    }

    .anomalies_summary_content_info_item {
      width: 160px;
    }

    .anomalies_summary_content_info_item:not(:first-child) {
      margin-top: 28px;
    }

    .anomalies_summary_content_info_title {
      text-align: right;
      width: 80px;
      white-space: nowrap;
    }
  }
}

.exception_prompt {
  width: 320px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  background: linear-gradient(270deg, #103960 0%, #14518f 50%, #103960 100%);

  .exception_prompt_symbol {
    width: 18px;
    height: 18px;
    background: #e05a5a;
    border-radius: 50%;
    margin-right: 10px;
    color: white;
    line-height: 18px;
    font-size: 10px;
  }
}
</style>
