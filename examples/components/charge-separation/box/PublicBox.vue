<template>
  <div class="public_box">
    <div class="public_box_top">
      <div class="public_box_top_title"><slot name="title"></slot></div>
      <slot name="menu"></slot>
    </div>
    <div  class="public_box_content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublicBox"
}
</script>

<style scoped lang="scss">
@import "@/assets/css/map-base.scss";
.public_box {
  width: 360px;
  display: flex;
  flex-direction: column;
  .public_box_top {
    width: 100%;
    height: 50px;
    line-height: 50px;
    @include background_img_set('../../../assets/images/public_title_box1.png');
    background-size: 100%;
    padding-left: 45px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
    align-items: center;
    .public_box_top_title {
      font-size: 18px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 700;
      background: linear-gradient(360deg, #BCC7EB 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .public_box_content {
    display: flex;
    flex: 1;
    width: 100%;
    @include background_img_set('../../../assets/images/public_content_box.png');
  }
}


</style>
