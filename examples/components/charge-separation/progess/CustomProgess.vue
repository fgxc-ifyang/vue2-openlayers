<template>
  <div class="scrollbar-container" :style="{'width':`${wt/100}rem`,'height':`${ht/100}rem`}">
    <div :style="{'background':activeColor,'width':`${activeValue}%`}" class="progress-bar"></div>
  </div>
</template>

<script>
export default {
  name: "Progess",
  props: {
    activeColor: {
      type: String,
      default() {
        return '#4CAF50';
      }
    },
    activeValue: {
      type: Number,
      default() {
        return 0;
      }
    },
    ht: {
      type: Number,
      default() {
        return 20;
      }
    },
    wt: {
      type: Number,
      default() {
        return 300;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.scrollbar-container {
  background-color: #294766; /* 设置底色为灰色 */
  position: relative;
}

/* 进度条，表示当前的滚动进度 */
.progress-bar {
  height: 100%; /* 进度条高度与滚动条容器一致 */
  transition: all .5s;
}
</style>
