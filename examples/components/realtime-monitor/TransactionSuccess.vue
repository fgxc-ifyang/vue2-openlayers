<template>
  <PublicBox class="transaction_success">
    <template slot="title">实时交易成功率</template>
    <div class="amount_menu" @click="openTransSuccessDiago" slot="menu">
      详情
      <!-- <svg-icon icon-class="turn-right"></svg-icon> -->
    </div>
    <div
      class="transaction_success_content dis_flex just_content_center" style="flex:1"
      slot="content"
    >
      <div
        class="transaction_success_item color_qi" style="flex: 1"
        :key="index"
        v-for="(item, index) in transactionData"
      >
        <CircularProgress
          ref="custom"
          :height="100"
          :width="100"
          :title-custom="true"
          :value-color="item.valueColor"
          :graphic="item.graphic"
          :name="item.title"
          :value="item.value"
          :res-value-color="item.resValueColor"
        />
        <div class="w_100 text-center color_qi font_16">{{ item.title }}</div>
        <div
          style="font-size: 0.2rem"
          class="w_100 text-center color_white marg_top5 font_weight_700 font_family_DIN"
        >
          {{ item.value.toFixed(2) }}%
        </div>
      </div>
    </div>
  </PublicBox>
</template>

<script>
import PublicBox from "../charge-separation/box/PublicBox";
import CircularProgress from "../charge-separation/progess/CircularProgress";
// import { getRateSuccess } from "@/api/map";

export default {
  name: "TransactionSuccess",
  components: { CircularProgress, PublicBox },
  data() {
    return {
      transactionData: [],
      queryData: {
        codes: [],
      },
    };
  },
  watch: {
    // "$store.state.orgIds"(val) {
    //   this.queryData.codes = val;
    //   // this.getRateSuccess();
    // },
  },
  mounted() {
    this.transactionData = [{
      title: "OBU",
      refName: "obuRate",
      valueColor: "#3498db",
      resValueColor: "rgba(70,180,255,0.5)",
      value: 0,
      key: "obuRate",
      graphic: [
        {
          type: "image",
          style: {
            image: require(`../../assets/images/etc_success.png`),
            width: 36,
            height: 28,
          },
          left: "center",
          top: "center",
        },
      ],
    },
    {
      title: "CPC",
      refName: "cpcRate",
      valueColor: "#51C7BB",
      resValueColor: "rgba(81,199,187,0.5)",
      value: 0,
      key: "cpcRate",
      graphic: [
        {
          type: "image",
          style: {
            image: require(`../../assets/images/cpc_success.png`),
            width: 36,
            height: 28,
          },
          left: "center",
          top: "center",
        },
      ],
    },
    {
      title: "牌识",
      refName: "plateRate",
      valueColor: "#1966FF",
      resValueColor: "rgba(25,102,255,0.5)",
      value: 0,
      key: "plateRate",
      graphic: [
        {
          type: "image",
          style: {
            image: require(`../../assets/images/vip_success.png`),
            width: 36,
            height: 28,
          },
          left: "center",
          top: "center",
        },
      ],
    },]
  },
  destroyed() {},
  created() {
  },
  methods: {
    openTransSuccessDiago() {
      this.$bus.$emit("openTransactionSuccessDiago", true);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/css/map-base.scss";

.transaction_success {
  position: absolute;
  z-index: 100;
  right: 30px;
  top: 95px;
  height: 300px;

  .transaction_success_content {
    padding: 40px 0px;
    box-sizing: border-box;
    display: flex;
  }
}

.amount_menu {
  cursor: pointer;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 500;
  color: #e6ebfa;
}

</style>
