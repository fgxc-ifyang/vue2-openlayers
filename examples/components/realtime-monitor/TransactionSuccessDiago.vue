<template>
  <public-diago @closeDiago="closeDiago" class="transaction_success_diago">
    <template slot="title">实时门架交易成功率</template>
    <div slot="content" style="width: 100%;height: 100%">
      <div class="transaction_stattions">
        <div v-for="(item,index) in buttons" :key="index"
             @click="changeType(index)"
             :class="`transaction_stattion ${active===index?'transaction_active':''}`">{{ item }}
        </div>
      </div>

      <div class="transaction_success_diago_text dis_flex just_content_space_between">
        <div class="transaction_success_diago_text_item dis_flex align_items_center just_content_center color_qi"
             v-for="(item,index) in textList" :key="index">
          <img class="h_50 w_50" :src="item.logo" alt="">
          <div class="marg_left10 font_16">
            <div class="transaction_success_diago_text_item_title">{{ item.title }}</div>
            <div class="transaction_success_diago_text_item_title marg_top5">
              <span class="color_white font_weight_700 font_22 font_family_DIN">{{ item.money }}</span>{{
                units[index]
              }}
            </div>
          </div>
        </div>
      </div>

      <div class="w_100 dis_flex just_content_space_between align_items_center marg_top45">
        <div class="transaction_success_diago_title font_18 color_white font_family_DIN font_weight_700">
          运营公司成功率情况
        </div>
        <div v-if="active!==2" class="transaction_success_diago_sort  font_16" @click="changebrand">
          <img src="../../assets/images/convert.png" alt=""> {{ this.queryData.type == 1 ? "切换品牌" : "切换路公司" }}
        </div>
      </div>

      <div v-loading="loading" element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(19,51,81,.8)"
           class="transaction_success_table w_100">
        <div class="transaction_success_table_title dis_flex just_content_space_between">
          <div class="color_qi w_100p">序号</div>
          <div class="color_qi w_250">{{ this.queryData.type == 1 ? "路公司" : "品牌" }}</div>
          <div class="table_cell color_qi">总量</div>
          <div class="table_cell color_qi">成功总量</div>
          <div class="table_cell color_qi">失败总量</div>
          <div class="table_cell color_qi">成功率</div>
          <div class="table_cell color_qi">同比前一日</div>
          <div class="table_cell color_qi" v-if="queryData.type==1">使用天线品牌</div>
        </div>
        <div v-for="(item,index) in tableData" :key="index"
             class="transaction_success_table_item dis_flex just_content_space_between">
          <div class="color_qi w_100p">{{ index + 1 }}</div>
          <div class="color_white font_break1 w_250">{{ item.unitName }}</div>
          <div class="table_cell color_white">{{ item.total }}</div>
          <div class="table_cell color_white">{{ item.totalSuccess }}</div>
          <div class="table_cell color_white">{{ item.totalError }}</div>
          <div class="table_cell color_white">{{ item.success }}</div>
          <div class="table_cell color_white">
            <span v-if="item.diff>0">+</span>{{ item.diff }}%
            <img class="rise_img" v-if="item.diff>0" src="../../assets/images/rise.png"
                 alt="">
            <img v-if="item.diff<0"
                 class="back_img"
                 src="../../assets/images/back_grenn.png" alt="">
          </div>
          <div class="table_cell color_white" v-if="queryData.type==1">{{ item.brand?item.brand.join("、"):'' }}</div>
        </div>
      </div>
    </div>
  </public-diago>
</template>

<script>
import PublicDiago from "../charge-separation/box/PublicDiago";
// import {getGantryTrading} from "@/api/map";

export default {
  name: "TransactionSuccessDiago",
  components: {PublicDiago},
  created() {
    // this.getGantryTrading();
  },
  data() {
    return {
      loading: false,
      buttons: ['OBU', 'CPC', '牌识'],
      units: ['万笔', '万笔', '万笔', '%'],
      active: 0,
      table: {
        obu: [],
        cpc: [],
        brand: []
      },
      queryData: {
        codes: [],
        type: 1 // 1公司 2品牌
      },
      gantryTrading: {
        totalObu: 0,
        totalObuSuccess: 0,
        totalObuError: 0,
        obu: 0,
        totalCpc: 0,
        totalCpcSuccess: 0,
        totalCpcError: 0,
        cpc: 0,
        totalBrand: 0,
        totalBrandSuccess: 0,
        totalBrandError: 0,
        brand: 0
      },
    }
  },
  methods: {
    closeDiago(val) {
      this.$bus.$emit('openTransactionSuccessDiago', val)
    },
    changeType(index) {
      this.active = index;
      this.queryData.type = 1;
      // this.getGantryTrading();
    },
    changebrand() {
      this.queryData.type = this.queryData.type == 1 ? 2 : 1
      // this.getGantryTrading();
    },
    // getGantryTrading() {
    //   if (this.loading) return;
    //   this.loading = true;
    //   getGantryTrading(this.queryData).then(res => {

    //     this.gantryTrading = res.data.gantryTrading;
    //     let currentDate = this.parseTime(new Date(), '{y}-{m}-{d}');
    //     let yesDate = this.parseTime(new Date(new Date().getTime() - (1000 * 60 * 60 * 24)), '{y}-{m}-{d}');
    //     let yesObuData = res.data.obu.filter(item => item.eventDate == yesDate);
    //     let yesCpcData = res.data.cpc.filter(item => item.eventDate == yesDate);
    //     let yesBrandData = res.data.brand.filter(item => item.eventDate == yesDate);

    //     this.table.obu = res.data.obu.filter(item => item.eventDate == currentDate).map((item, index) => {
    //       item.diff = (item.success - yesObuData[index].success).toFixed(2)
    //       return item;
    //     });
    //     this.table.cpc = res.data.cpc.filter(item => item.eventDate == currentDate).map((item, index) => {
    //       item.diff = (item.success - yesCpcData[index].success).toFixed(2)
    //       return item;
    //     });
    //     this.table.brand = res.data.brand.filter(item => item.eventDate == currentDate).map((item, index) => {
    //       item.diff = (item.success - yesBrandData[index].success).toFixed(2)
    //       return item;
    //     });

    //     this.loading = false;

    //   }).catch(() => this.loading = false);
    // }
  },

  computed: {
    tableData() {
      const key = Object.keys(this.table);
      return this.table[key[this.active]];
    },
    textList() {
      return [
        {
          logo: require('../../assets/images/success1.png'),
          title: '总量',
          money: ((this.active == 0 ? this.gantryTrading.totalObu :
              this.active == 1 ? this.gantryTrading.totalCpc :
                  this.gantryTrading.totalBrand) / 1000000).toFixed(2),
        },
        {
          logo: require('../../assets/images/success2.png'),
          title: '成功总量',
          money: ((this.active == 0 ? this.gantryTrading.totalObuSuccess :
              this.active == 1 ? this.gantryTrading.totalCpcSuccess :
                  this.gantryTrading.totalBrandSuccess) / 1000000).toFixed(2),
        },
        {
          logo: require('../../assets/images/success3.png'),
          title: '失败总量',
          money: ((this.active == 0 ? this.gantryTrading.totalObuError :
              this.active == 1 ? this.gantryTrading.totalCpcError :
                  this.gantryTrading.totalBrandError) / 1000000).toFixed(2),
        },
        {
          logo: require('../../assets/images/success4.png'),
          title: '成功率',
          money: this.active == 0 ? this.gantryTrading.obu :
              this.active == 1 ? this.gantryTrading.cpc :
                  this.gantryTrading.brand,
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/map-base.scss";

.w_250 {
  width: 250px;
}

.rise_img {
  width: 10px;
  height: 14px;
  margin-left: 5px
}

.back_img {
  height: 14px;
  width: 10px;
  transform: rotateY(180deg);
  margin-left: 5px
}

.transaction_success_table {
  margin-top: 30px;
  height: calc(100% - 270px);
  overflow-y: auto;

  .transaction_success_table_title {
    background: rgba(28, 64, 100, .6);
    height: 60px;
    line-height: 60px;
    padding-left: 10px;
    box-sizing: border-box;
    border-radius: 4px;
  }

  .transaction_success_table_item {
    background: #1A446C;
    height: 60px;
    line-height: 60px;
    padding-left: 10px;
    box-sizing: border-box;
    border-radius: 4px;
    margin-top: 10px;
  }

  .table_cell {
    flex: 1;
    text-align: left
  }
}

.transaction_success_diago_sort {
  width: 130px;
  height: 40px;
  border-radius: 50px;
  border: #198CFF solid 1px;
  color: white;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 16px;
    margin-right: 5px;
    height: 16px;
  }
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

.transaction_success_diago_text {
  margin-top: 20px;

  .transaction_success_diago_text_item {
    flex: 1;
    height: 95px;
    @include background_img_set('../../assets/images/diago_text_box.png');

  }

  .transaction_success_diago_text_item {
    margin-right: 10px;
  }

  .transaction_success_diago_text_item:not(:first-child) {
    margin-left: 10px;
  }
}

.transaction_success_diago_title {
  @include background_img_set('../../assets/images/operating_fee.png');
  width: 252px;
  height: 32px;
  line-height: 32px;
}


</style>
