<template>
  <div class="realtime-monitor">
    <MoneySummary />
    <div class="left_box">
      <BasicInformation/>
      <AnomaliesSummary/>
      <WorkOrderStatus />
    </div>
    <TransactionSuccess />
    <DataTransmission />
    <TransactionSuccessDiago v-if="openTransactionSuccessDiago" />

    <WorkOrderStatusDiago v-if="openStatusDiago" />
  </div>
</template>

<script>
import BasicInformation from "./BasicInformation.vue";
import AnomaliesSummary from "./AnomaliesSummary";
import WorkOrderStatus from "./WorkOrderStatus";
import TransactionSuccess from "./TransactionSuccess";
import DataTransmission from "./DataTransmission";
import TransactionSuccessDiago from "./TransactionSuccessDiago";
import WorkOrderStatusDiago from "./WorkOrderStatusDiago";
import MoneySummary from "./MoneySummary";

export default {
  name: "RealtimeMonitor",
  components: {
    MoneySummary,
    WorkOrderStatusDiago,
    TransactionSuccessDiago,
    DataTransmission, TransactionSuccess, WorkOrderStatus, AnomaliesSummary, BasicInformation},
  created() {
  },
  data() {
    return{
      openTransactionSuccessDiago: false,
      openStatusDiago: false
    }
  },
  destroyed() {
    this.$bus.$off('openTransactionSuccessDiago');
    this.$bus.$off('openStatusDiago');
  },
  mounted() {
    this.$nextTick(()=>{
      this.$bus.$on('openTransactionSuccessDiago',flag=>{
        this.openTransactionSuccessDiago = flag;
      })
      this.$bus.$on('openStatusDiago',flag=>{
        this.openStatusDiago = flag;
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.left_box {
  height: calc(100% - 125px);
  overflow-y: auto;
  position: absolute;
  left: 30px;
  top: 95px;
}
</style>
