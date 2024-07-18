<template>
  <div class="public_diago">
    <div class="public_diago_box">
      <div class="public_diago_box_title dis_flex just_content_space_between align_items_center">
        <div class="color_white font_family_DIN font_weight_700 marg_left15">
          <slot name="title">昨日清分金额</slot>
        </div>
        <img
            class="close_diago"
            @click="closeDiago"
            src="../../../assets/images/close_diago.png"/>
      </div>
      <div class="public_diago_box_content">
        <slot name="content"></slot>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "PublicDiago",
  methods: {
    closeDiago() {
      this.$emit('closeDiago', false);
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/css/map-base.scss";

.public_diago {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 1000;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: opacity_show .3s;

  @keyframes opacity_show {

    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .public_diago_box {
    width: 85%;
    height: 90%;
    position: relative;
    @include background_img_set('../../../assets/images/diago_content.png');

    .public_diago_box_title {
      @include background_img_set('../../../assets/images/diago_title.png');
      height: 60px;
      line-height: 60px;
      left: 0;
      margin: 20px 40px 0;
      font-size: 20px;
    }

    .public_diago_box_content {
      width: calc(100% - 160px);
      margin: 30px 80px 0;
      //height: calc(100% - 110px);
      height: calc(100% - 130px);
      overflow-y: auto;
      overflow-x: hidden;
    }

  }
}

.close_diago {
  height: 28px;
  width: 28px;
  margin-right: 20px;
  cursor: pointer
}
</style>
