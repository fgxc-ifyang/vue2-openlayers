<template>
  <div class="money_summary">
    <div
      v-for="(item, index) in summaryData"
      :key="index"
      class="money_summary_item dis_flex just_content_center align_items_center"
    >
      <img class="money_summary_img" :src="item.logo" alt="" />
      <div class="money_summary_item_content marg_left10 text-center color_qi">
        <div class="font_12">
          <span class="color_white font_weight_700 font_28 font_family_DIN">{{
            item.money
          }}</span
          >{{ unitls[index] }}
        </div>
        <img class="guang_img" src="../../assets/images/bottom_guang.png" alt="" />
        <div class="font_16">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getYesterdayRealTimeMoney } from "@/api/map";

// const numeral = require("numeral");

export default {
  name: "MoneySummary",
  data() {
    return {
      summaryData: [
        {
          name: "昨日清分金额",
          money: 0,
          logo: require("../../assets/images/money1.png"),
          key: "totalClearMoney",
        },
        {
          name: "实时收费金额",
          money: 0,
          logo: require("../../assets/images/money2.png"),
          key: "totalMoney",
        },
        {
          name: "实时出站车流量",
          money: 0,
          logo: require("../../assets/images/car1.png"),
          key: "totalVcnt",
        },
      ],
      unitls: ["万元", "万元", "万辆"],
      queryData: {
        codes: [],
      },
    };
  },
  created() {
    // this.getYesterdayRealTimeMoney();
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    // getYesterdayRealTimeMoney() {
    //   getYesterdayRealTimeMoney(this.queryData).then((res) => {
    //     Object.keys(res.data).forEach((key) => {
    //       let index = this.summaryData.findIndex((item) => item.key == key);
    //       if (index !== -1) {
    //         this.summaryData[index].money = Math.round(res.data[key] / 10000);
    //       }
    //     });
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/map-base.scss";

.guang_img {
  width: 100%;
  height: 11px;
}

.money_summary {
  position: absolute;
  z-index: 100;
  left: 46%;
  top: 18%;
  transform: translate(-50%, -50%);
  display: flex;

  .money_summary_item {
    background: rgba(18, 54, 89, 0.92);
    border-radius: 10px 10px 10px 10px;
    width: 212px;
    height: 95px;
    margin-right: 25px;
    span {
      margin-right: 5px;
    }
    .money_summary_img {
      height: 50px;
      width: 50px;
    }
  }
  .money_summary_item:last-child {
    margin-right: 0;
  }
}
</style>
