<template>
  <public-box class="basic_info">
    <template slot="title">基本信息</template>
    <div class="dis_flex flex-warp basic_info_content" slot="content">
      <div
        class="dis_flex info_item align_items_center"
        v-for="(item, index) in infoData"
        :key="index"
      >
        <img :src="require(`../../assets/images/info${index + 1}.png`)" alt="" />
        <div class="marg_left10">
          <div class="basic_info_title color_qi font_16">{{ item.title }}</div>
          <div class="basic_info_data marg_top5">
            <span class="color_white font_weight_700 font_22 font_family_DIN">{{
              item.count
            }}</span>
            <span class="marg_left10 color_qi">{{ units[index] }}</span>
          </div>
        </div>
      </div>
    </div>
  </public-box>
</template>

<script>
import PublicBox from "../charge-separation/box/PublicBox";
// import { getBasicInformation } from "@/api/map";
// import Cookies from "js-cookie";
export default {
  name: "BasicInformation",
  components: { PublicBox },
  data() {
    return {
      infoData: [
        { title: "收费站", count: "0", key: "tollStation" },
        { title: "门架", count: "0", key: "gantry" },
        { title: "总里程", count: "0", key: "mileTotal" },
        { title: "运营公司", count: "0", key: "company" },
        { title: "路段", count: "0", key: "road" },
        { title: "在班运维人员", count: "0", key: "maintenance" },
      ],
      units: ["个", "个", "KM", "个", "条", "人"],
      // queryData: {
      //   codes: [],
      //   codePath: JSON.parse(Cookies.get("Admin-Indentity")).orgPath,
      // },
    };
  },
  created() {
    // this.queryData.codes = this.$store.state.orgPaths;
    // this.getBasicInformation();
  },
  watch: {
    '$store.state.orgIds'() {
      // this.queryData.codes = this.$store.state.orgPaths;
      // this.getBasicInformation();
    }
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    // getBasicInformation() {
    //   getBasicInformation(this.queryData).then((res) => {
    //     Object.keys(res.data).forEach((key) => {
    //       let index = this.infoData.findIndex((item) => item.key == key);
    //       this.infoData[index].count = res.data[key];
    //     });
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/map-base.scss";

.basic_info {
  .basic_info_content {
    justify-content: space-evenly;
    padding: 20px 30px;
    box-sizing: border-box;
    .info_item {
      width: 150px;
      img {
        height: 50px;
        width: 50px;
      }
      .basic_info_title {
        white-space: nowrap;
      }
      .basic_info_data {
        white-space: nowrap;
      }
    }
    .info_item:nth-child(n + 3) {
      margin-top: 20px;
    }
  }
}
</style>
