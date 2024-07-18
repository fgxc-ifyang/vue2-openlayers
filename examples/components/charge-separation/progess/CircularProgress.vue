<template>
  <div>
    <div class="progressChart" :style="{'height':`${height/100}rem`,'width':`${width/100}rem`}" ref="progressChart"></div>
  </div>
</template>

<script>
export default {
  name: 'CircularProgress',
  props: {
    height: {
      type: Number,
      default() {
        return 100;
      }
    },
    width: {
      type: Number,
      default() {
        return 100;
      }
    },
    value: {
      type: Number,
      default() {
        return 0;
      }
    },
    valueColor: {
      type: String,
      default() {
        return '#3498db';
      }
    },
    resValueColor: {
      type: String(),
      default() {
        return 'rgba(70,180,255,0.5)';
      }
    },
    name: {
      type: String,
      default() {
        return '';
      }
    },
    titleCustom: {
      type: Boolean,
      default() {
        return false;
      }
    },
    graphic: {
      type: Array,
      default() {
        return [];
      }
    }

  },
  data() {
    return {
      progressChart: null
    };
  },
  methods: {
    initProgess() {
      if (this.$refs.progressChart) {
        this.$refs.progressChart.removeAttribute('_echarts_instance_');
      }
      // 在组件挂载后初始化 ECharts 实例
      this.progressChart = this.$echarts.init(this.$refs.progressChart, 'dark');
      const title = !this.titleCustom ? {
        text: this.value.toFixed(2) + '%',
        subtext: this.name,
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: 14,
          fontWeight: '700'
        },
        subtextStyle: {
          fontSize: 10,
          color: 'white',
          align: 'center', // 设置 align 属性为 'center'
        },
      } : {};
      const graphic = this.titleCustom ? this.graphic : [];
      // 配置项
      const option = {
        backgroundColor: 'transparent',
        title,
        series: [
          {
            type: 'pie',
            radius: ['70%', '80%'],
            avoidLabelOverlap: false,
            startAngle: 0,
            // hoverAnimation: false,
            // legendHoverLink: false,
            itemStyle: {
              normal: {
                borderColor: this.valueColor,
                borderWidth: 4
              }
            },
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: false
              }
            },
            data: [
              {
                value: this.value,
                itemStyle: {
                  color: this.valueColor,
                }
              },
              {
                value: 100 - this.value,
                hoverAnimation: false,
                legendHoverLink: false,
                itemStyle: {
                  color: this.resValueColor,
                  borderColor: 'transparent'
                }
              }
            ]
          }
        ],
        graphic
      };
      // 使用配置项初始化图表
      this.progressChart.setOption(option);
      window.addEventListener('resize',()=>{
        this.progressChart.resize()
      })
    }
  },
  mounted() {
    setTimeout(() => {
      this.initProgess();
    }, 300)
  },
  beforeDestroy() {
    // 在组件销毁前销毁 ECharts 实例，防止内存泄漏
    if (this.progressChart) {
      this.progressChart.dispose();
    }
  }
};
</script>

<style scoped>
/* 可以在这里添加组件的样式 */
</style>
