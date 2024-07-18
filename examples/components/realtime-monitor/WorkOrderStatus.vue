<template>
  <public-box class="work_order_status">
    <template slot="title">实时工单状态</template>
    <div class="amount_menu"
         @click="openStatusDiago"
         slot="menu">详情
      <!-- <svg-icon icon-class="turn-right"></svg-icon> -->
    </div>
    <div class="work_order_status_content dis_flex just_content_space_between" slot="content">
      <div class="work_order_status_item color_qi" v-for="(item,index) in statusData" :key="index">
        <img :src="item.img" alt="">
        <div  class="text-center marg_top10 font_16 work_order_status_div">{{ item.status }}</div>
        <div  class="text-center marg_top10 work_order_status_div">
          <span class="font_weight_700 color_white font_22">{{ item.count }}</span>
          单</div>
      </div>
    </div>
  </public-box>
</template>

<script>
import PublicBox from "../charge-separation/box/PublicBox";

export default {
  name: "WorkOrderStatus",
  components: {PublicBox},
  data() {
    return {
      statusData: [
        {status: '处置中', img: require('../../assets/images/processing.png'), count: 19},
        {status: '今日已完成', img: require('../../assets/images/complete.png'), count: 19}
      ],
    }
  },
  methods: {
    openStatusDiago() {
      this.$bus.$emit('openStatusDiago', true);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/map-base.scss";
.work_order_status_div {
  width: 96px;
}
.work_order_status {
  margin-top: 15px;

  .work_order_status_content {
    padding: 20px 50px 40px;
    box-sizing: border-box;
    width: 100%;

    .work_order_status_item {
      img {
        height: 96px;
        width: 96px;
      }
    }
  }
}

.amount_menu {
  cursor: pointer;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 500;
  color: #E6EBFA;
}

</style>
