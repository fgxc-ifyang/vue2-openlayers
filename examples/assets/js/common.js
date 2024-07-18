export const annularEchartsOptions = {
  backgroundColor: 'transparent',
  title: {
    text: '',
    x: 'center',
    y: 'center',
    textStyle: {
      fontFamily: 'Microsoft YaHei, Microsoft YaHei',
      fontSize: 14,
      fontWeight: '400',
    },
    subtextStyle: {
      fontSize: 14,
      align: 'center', // 设置 align 属性为 'center'
    },
  },
  tooltip: {
    // trigger: 'item',
    // formatter: '{a} <br/>{b} : {c} ({d}%)',
    show: false
  },
  series: [
    {
      type: 'pie',
      radius: ['60%', '80%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: false,
          fontSize: '20',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [],
    },
  ],
};

export const orderEchartsOptions = {
  backgroundColor: 'transparent',
  title: {
    text: '',
    // bottomText:'',
    x: 'center',
    y: 'center',
    textStyle: {
      fontFamily: 'Microsoft YaHei, Microsoft YaHei',
      color: '#BCC7EB',
      fontSize: 16,
      fontWeight: '400',
    },
    subtextStyle: {
      fontFamily: 'Microsoft YaHei, Microsoft YaHei',
      fontWeight: 700,
      color:'#FFFFFF',
      fontSize: 22,
      align: 'center', // 设置 align 属性为 'center'
    },
  },
  tooltip: {
    // trigger: 'item',
    // formatter: '{a} <br/>{b} : {c} ({d}%)',
    show: false
  },
  series: [
    {
      type: 'pie',
      radius: ['60%', '80%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: false,
          fontSize: '20',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [],
    },
  ],
};

export const clearAmountBarOptions = {
  backgroundColor: 'transparent',
  color: '', // 设置柱子的颜色
  legend: {
    right: '1%',
    top: '0',
    icon: 'circle'
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    textStyle: {
      fontSize: 14, // 设置 Tooltip 文字的大小
      color: '#BCC7EB' // 设置 Tooltip 文字的颜色
    },
    backgroundColor: 'rgba(0, 0, 0, 0)',
    formatter: function (params) {
      // 自定义 Tooltip 的内容
      const barData = params[0];
      return `<div class="clear_amount_tip">
                        <div class="clear_amount_tip_title">${barData.name}</div>
                        <div style="display: flex;align-items: center;margin-top: 10px">
                        <div class="yuan_box"></div>
                        <div> <span style="color: #BCC7EB;margin-left: 10px">收费清分金额</span>
                        <span style="font-size: 18px;font-weight: 700;color: white;margin-left: 10px">${
          barData.value}</span> 万元</div>
                        </div>
                    </div>`;
    }
  },
  grid: {
    left: '1%', // 设置左边距为0
    right: '1%', // 设置右边距为0
    bottom: 0, // 设置底边距为0
    top: '12%', // 设置顶边距为0
    containLabel: true // 包含刻度标签在内
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLine: {
      show: false,
      lineStyle: {
        type: 'solid', // 设置X轴刻度线为实线
      }
    },
    axisTick: {
      show: false  // 设置为 false，隐藏刻度线
    },
    splitLine: {
      show: true, // 显示X轴网格线
      lineStyle: {
        type: 'solid', // 设置X轴网格线为实线
        // color: 'rgba(70,180,255,0.5)'
        color: '#1B3A59'
      }
    }
  },
  graphic: [
    {
      type: 'text',
      left: '4%',
      top: '1%',
      style: {
        text: '单位：万元',
        fontSize: 12,
        fill: '#BCC7EB'
      }
    }
  ],
  yAxis: {
    type: 'value',
    name: '金额',
    nameTextStyle: {
      color: "#6B7A99",
      fontSize: 12,
      padding: [0, 50, 0, 0]//坐标name的位置
    },
    axisTick: {
      show: false  // 设置为 false，隐藏刻度线
    },
    axisLine: {
      show: false,
      lineStyle: {
        type: 'solid', // 设置X轴刻度线为实线
      }
    },

    splitLine: {
      show: true, // 显示X轴网格线
      lineStyle: {
        type: 'solid', // 设置X轴网格线为实线
        // color: 'rgba(70,180,255,0.5)'
        color: '#1B3A59'
      }
    }
  },
  series: [
    {
      name: '收费清分金额',
      type: 'bar',
      barWidth: 20, // 设置柱子的宽度
      data: []
    }
  ]
}

export const orderStatusLineOptions = {
  backgroundColor: 'transparent',
  legend: {
    right: '1%',
    top: '0',
    icon: 'circle'
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    textStyle: {
      fontSize: 14, // 设置 Tooltip 文字的大小
      color: '#BCC7EB' // 设置 Tooltip 文字的颜色
    },
    backgroundColor: 'rgba(0, 0, 0, 0)',
    formatter: function (params) {
      const barData = params[0];
      let content = `<div class="clear_amount_tip">
                            <div class="clear_amount_tip_title">${barData.name}</div>`
      params.forEach(item => {
        content += `
                <div style="display: flex;align-items: center;margin-top: 10px">
                    <div style="height: 10px;width: 10px;border-radius: 50%;background:${item.color}"></div>
                    <div> <span style="color: #BCC7EB;margin-left: 10px">${item.seriesName}</span>
                       <span style="font-size: 18px;font-weight: 700;color: white;margin-left: 10px">${item.data}</span> 单</div>
                </div>
              `
      })
      let last = `</div>`
      content += last;
      return content;
    }
  },
  grid: {
    left: '1%', // 设置左边距为0
    right: '1%', // 设置右边距为0
    bottom: 0, // 设置底边距为0
    top: '10%', // 设置顶边距为0
    containLabel: true // 包含刻度标签在内
  },
  xAxis: {
    type: 'category',
    // boundaryGap: false,
    data: ["2023-10-25", "2023-10-28", "2023-10-31", "2023-11-06", "2023-11-09", "2023-11-12", "2023-11-15","2023-11-18","2023-11-21"],
    axisLine: {
      show: false,
      lineStyle: {
        type: 'solid', // 设置X轴刻度线为实线
      }
    },

    axisTick: {
      show: false  // 设置为 false，隐藏刻度线
    },

    splitLine: {
      show: true, // 显示X轴网格线
      lineStyle: {
        type: 'solid', // 设置X轴网格线为实线
        // color: 'rgba(70,180,255,0.5)'
        color: '#1B3A59'
      }
    }
  },
  graphic: [
    {
      type: 'text',
      left: '2.5%',
      top: '1%',
      style: {
        text: '单位：单',
        fontSize: 12,
        fill: '#BCC7EB'
      }
    }
  ],
  yAxis: {
    type: 'value',
    nameTextStyle: {
      color: "#6B7A99",
      fontSize: 12,
      padding: [0, 50, 0, 0]//坐标name的位置
    },
    axisTick: {
      show: false  // 设置为 false，隐藏刻度线
    },
    axisLine: {
      show: false,
      lineStyle: {
        type: 'solid', // 设置X轴刻度线为实线
      }
    },

    splitLine: {
      show: true, // 显示X轴网格线
      lineStyle: {
        type: 'solid', // 设置X轴网格线为实线
        // color: 'rgba(70,180,255,0.5)'
        color: '#1B3A59'
      }
    }
  },
  series: [
    {
      name: '工单数量',
      type: 'line',
      data: [],
      lineStyle: {
        width: 1,//外边线宽度
        color: '#33AAFF'//外边线颜色
      },
      itemStyle: {
        normal: {
          color: '#33AAFF', //折线点的颜色
          borderColor: '#ffffff', //拐点边框颜色
          borderWidth: 2, //拐点边框大小
        },
      },
    },
  ]
};

export const faultDetailLineOptions = {
  backgroundColor: 'transparent',
  legend: {
    right: '1%',
    top: '0',
    icon: 'circle'
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    textStyle: {
      fontSize: 14, // 设置 Tooltip 文字的大小
      color: '#BCC7EB' // 设置 Tooltip 文字的颜色
    },
    backgroundColor: 'rgba(0, 0, 0, 0)',
    formatter: function (params) {
      const barData = params[0];
      let content = `<div class="clear_amount_tip">
                            <div class="clear_amount_tip_title">${barData.name}</div>`
      params.forEach(item => {
        content += `
                <div style="display: flex;align-items: center;margin-top: 10px">
                    <div style="height: 10px;width: 10px;border-radius: 50%;background:${item.color}"></div>
                    <div> <span style="color: #BCC7EB;margin-left: 10px">${item.seriesName}</span>
                       <span style="font-size: 18px;font-weight: 700;color: white;margin-left: 10px">${item.data}</span> %</div>
                </div>
              `
      })
      let last = `</div>`
      content += last;
      return content;
    }
  },
  grid: {
    left: '3%', // 设置左边距为0
    right: '3%', // 设置右边距为0
    bottom: "10%", // 设置底边距为0
    top: '10%', // 设置顶边距为0
    containLabel: true,// 包含刻度标签在内
  },
  xAxis: {
    type: 'category',
    // boundaryGap: false,
    data: [],
    axisLine: {
      show: false,
      lineStyle: {
        type: 'solid', // 设置X轴刻度线为实线
      }
    },

    axisTick: {
      show: false  // 设置为 false，隐藏刻度线
    },

    splitLine: {
      show: true, // 显示X轴网格线
      lineStyle: {
        type: 'solid', // 设置X轴网格线为实线
        // color: 'rgba(70,180,255,0.5)'
        color: '#1B3A59'
      }
    }
  },
  graphic: [
    {
      type: 'text',
      left: '4%',
      top: '1%',
      style: {
        text: '单位：百分比',
        fontSize: 14,
        fill: '#BCC7EB',
        fontFamily: 'Microsoft YaHei, Microsoft YaHei',
        fontWeight: 400,
        color: '#FFFFFF',
      }
    }
  ],
  yAxis: {
    type: 'value',
    splitNumber:10,
    min:0,
    max:100,
    nameTextStyle: {
      color: "#6B7A99",
      fontSize: 12,
      padding: [0, 50, 0, 0]//坐标name的位置
    },
    axisTick: {
      show: false  // 设置为 false，隐藏刻度线
    },
    axisLine: {
      show: false,
      lineStyle: {
        type: 'solid', // 设置X轴刻度线为实线
      }
    },
    splitLine: {
      show: true, // 显示X轴网格线
      lineStyle: {
        type: 'solid', // 设置X轴网格线为实线
        // color: 'rgba(70,180,255,0.5)'
        color: '#1B3A59'
      }
    }
  },
  series: [
    {
      name: '故障百分比',
      type: 'line',
      data: [],
      lineStyle: {
        width: 1,//外边线宽度
        color: '#33AAFF',//外边线颜色
      },
      itemStyle: {
        normal: {
          color: '#33AAFF', //折线点的颜色
          borderColor: '#ffffff', //拐点边框颜色
          borderWidth: 2, //拐点边框大小
        },
      },
    },
  ]
};

export const clearAmountLineOptions = {
  backgroundColor: 'transparent',
  legend: {
    right: '1%',
    top: '0',
    icon: 'circle'
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    textStyle: {
      fontSize: 14, // 设置 Tooltip 文字的大小
      color: '#BCC7EB' // 设置 Tooltip 文字的颜色
    },
    backgroundColor: 'rgba(0, 0, 0, 0)',
    formatter: function (params) {
      const barData = params[0];
      let content = `<div class="clear_amount_tip">
                            <div class="clear_amount_tip_title">${barData.name}</div>`
      params.forEach(item => {
        content += `
                <div style="display: flex;align-items: center;margin-top: 10px">
                    <div style="height: 10px;width: 10px;border-radius: 50%;background:${item.color}"></div>
                    <div> <span style="color: #BCC7EB;margin-left: 10px">${item.seriesName}</span>
                       <span style="font-size: 18px;font-weight: 700;color: white;margin-left: 10px">${item.data}</span> 万元</div>
                </div>
              `
      })
      let last = `</div>`
      content += last;
      return content;
    }
  },
  grid: {
    left: '1%', // 设置左边距为0
    right: '1%', // 设置右边距为0
    bottom: 0, // 设置底边距为0
    top: '12%', // 设置顶边距为0
    containLabel: true // 包含刻度标签在内
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
    axisLine: {
      show: false,
      lineStyle: {
        type: 'solid', // 设置X轴刻度线为实线
      }
    },

    axisTick: {
      show: false  // 设置为 false，隐藏刻度线
    },

    splitLine: {
      show: true, // 显示X轴网格线
      lineStyle: {
        type: 'solid', // 设置X轴网格线为实线
        // color: 'rgba(70,180,255,0.5)'
        color: '#1B3A59'
      }
    }
  },
  graphic: [
    {
      type: 'text',
      left: '4%',
      top: '1%',
      style: {
        text: '单位：万元',
        fontSize: 12,
        fill: '#BCC7EB'
      }
    }
  ],
  yAxis: {
    type: 'value',
    name: '金额',
    nameTextStyle: {
      color: "#6B7A99",
      fontSize: 12,
      padding: [0, 50, 0, 0]//坐标name的位置
    },
    axisTick: {
      show: false  // 设置为 false，隐藏刻度线
    },
    axisLine: {
      show: false,
      lineStyle: {
        type: 'solid', // 设置X轴刻度线为实线
      }
    },

    splitLine: {
      show: true, // 显示X轴网格线
      lineStyle: {
        type: 'solid', // 设置X轴网格线为实线
        // color: 'rgba(70,180,255,0.5)'
        color: '#1B3A59'
      }
    }
  },
  series: [
    {
      name: '上周',
      type: 'line',
      data: [],
      lineStyle: {
        width: 1,//外边线宽度
        color: '#33AAFF'//外边线颜色
      },
      itemStyle: {
        normal: {
          color: '#33AAFF', //折线点的颜色
          borderColor: '#ffffff', //拐点边框颜色
          borderWidth: 2, //拐点边框大小
        },
      },
      areaStyle: {//区域填充渐变颜色
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.3, color: 'rgba(25,140,255,0.3)' // 0% 处的颜色
            },
            {
              offset: 1, color: 'transparent' // 100% 处的颜色
            }],
          global: false // 缺省为 false
        }
      }
    },
    {
      name: '本周',
      type: 'line',
      data: [],
      lineStyle: {
        width: 1,//外边线宽度
        color: '#FFDA61'//外边线颜色
      },
      itemStyle: {
        normal: {
          color: '#FFDA61', //折线点的颜色
          borderColor: '#ffffff', //拐点边框颜色
          borderWidth: 2, //拐点边框大小
        },
      },
      areaStyle: {//区域填充渐变颜色
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.3, color: 'rgba(255,218,97,.5)' // 0% 处的颜色
            },
            {
              offset: 1, color: 'transparent' // 100% 处的颜色
            }],
          global: false // 缺省为 false
        }
      }
    },
  ]
};


const richCommonBarXOption = {
  lineHeight: 20,
  align: 'center',
  color: '#FFFFFF',
  fontSize: 10,
  fontWeight: 'bold',
  height: 20,
  width: 40,
};

export const realFeeBarXOption = {
  backgroundColor: 'transparent',
  color: '',
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    textStyle: {
      fontSize: 14, // 设置 Tooltip 文字的大小
      color: '#BCC7EB' // 设置 Tooltip 文字的颜色
    },
    backgroundColor: 'rgba(0, 0, 0, 0)',
    formatter: function (params) {
      // 自定义 Tooltip 的内容
      const barData = params[0];
      return `<div class="clear_amount_tip">
                        <div class="clear_amount_tip_title">${barData.name}</div>
                        <div style="display: flex;align-items: center;margin-top: 10px">
                        <div style="height: 10px; width: 10px;border-radius: 50%;background: #33AAFF;"></div>
                        <div>
                        <span style="font-size: 18px;font-weight: 700;color: white;margin-left: 10px">${
          barData.value}</span> 万元</div>
                        </div>
                    </div>`;
    }
  },
  grid: {
    left: '1%', // 设置左边距为0
    right: '1%', // 设置右边距为0
    bottom: 0, // 设置底边距为0
    top: '1%', // 设置顶边距为0
    containLabel: true // 包含刻度标签在内
  },
  xAxis: {
    type: 'value',
    axisTick: {
      show: false  // 设置为 false，隐藏刻度线
    },
    axisLine: {
      show: false,
      lineStyle: {
        type: 'solid', // 设置X轴刻度线为实线
      }
    },
    splitLine: {
      show: true, // 显示X轴网格线
      lineStyle: {
        type: 'solid', // 设置X轴网格线为实线
        color: '#1B3A59'
      }
    }
  },
  yAxis: {
    type: 'category',
    axisLine: {
      show: false,
      lineStyle: {
        type: 'solid', // 设置X轴刻度线为实线
      }
    },
    axisLabel: {
      show: false,
    },
    axisTick: {
      show: false  // 设置为 false，隐藏刻度线
    },
    splitLine: {
      show: true, // 显示X轴网格线
      lineStyle: {
        type: 'solid', // 设置X轴网格线为实线
        color: '#1B3A59'
      }
    },
    data: ['NO10', 'NO9', 'NO8', 'NO7', 'NO6', 'NO5', 'NO4', 'NO3', 'NO2', 'NO1'],
  },

  series: [
    {
      type: 'bar',
      barWidth: '30%',
      data: [],
      label: {
        show: true,
        position: 'insideLeft',
        formatter: function (params) {
          switch (params.name) {
            case 'NO1':
              return `{top1|${params.name}} {b|${params.data.label}}`;
            case 'NO2':
              return `{top2|${params.name}} {b|${params.data.label}}`;
            case 'NO3':
              return `{top3|${params.name}} {b|${params.data.label}}`;
            default:
              return `{a|${params.name}} {b|${params.data.label}}`;
          }
        },
        rich: {
          top1: {
            backgroundColor: {
              image: require('@/assets/images/top1.png')
            },
            ...richCommonBarXOption
          },
          top2: {
            backgroundColor: {
              image: require('@/assets/images/top2.png')
            },
            ...richCommonBarXOption
          },
          top3: {
            backgroundColor: {
              image: require('@/assets/images/top3.png')
            },
            ...richCommonBarXOption
          },
          a: {
            color: '#FFFFFF',
            fontSize: 10,
            fontWeight: 'bold'
          },
          b: {
            color: '#FFFFFF',
            fontSize: 12
          }
        }
      },
      itemStyle: {
        color: 'rgba(0, 0, 0, 0)'  // 设置为透明色
      }
    },
    {
      type: 'bar',
      barWidth: '30%',
      data: [],
      label: {
        show: true,
        position: 'right',
        formatter: function (params) {
          return `{a|${params.data.value}} 万元`;
        },
        rich: {
          a: {
            color: '#FFFFFF',
            fontSize: 10,
          },
          b: {
            color: '#FFFFFF',
            fontSize: 12
          }
        }
      }
    },
  ]
};


export const realDroomOption = {
  backgroundColor: 'transparent',
  color: '',
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    textStyle: {
      fontSize: 14, // 设置 Tooltip 文字的大小
      color: '#BCC7EB' // 设置 Tooltip 文字的颜色
    },
    backgroundColor: 'rgba(0, 0, 0, 0)',
    formatter: function (params) {
      // 自定义 Tooltip 的内容
      const barData = params[0];
      return `<div class="clear_amount_tip">
                        <div class="clear_amount_tip_title">${barData.name}</div>
                        <div style="display: flex;align-items: center;margin-top: 10px">
                        <div style="height: 10px; width: 10px;border-radius: 50%;background: #33AAFF;"></div>
                        <div>
                        <span style="font-size: 18px;font-weight: 700;color: white;margin-left: 10px">${
          barData.value}</span> 万辆</div>
                        </div>
                    </div>`;
    }
  },
  grid: {
    left: '1%', // 设置左边距为0
    right: '1%', // 设置右边距为0
    bottom: 0, // 设置底边距为0
    top: '1%', // 设置顶边距为0
    containLabel: true // 包含刻度标签在内
  },
  xAxis: {
    type: 'value',
    axisTick: {
      show: false  // 设置为 false，隐藏刻度线
    },
    axisLine: {
      show: false,
      lineStyle: {
        type: 'solid', // 设置X轴刻度线为实线
      }
    },
    splitLine: {
      show: true, // 显示X轴网格线
      lineStyle: {
        type: 'solid', // 设置X轴网格线为实线
        color: '#1B3A59'
      }
    }
  },
  yAxis: {
    type: 'category',
    axisLine: {
      show: false,
      lineStyle: {
        type: 'solid', // 设置X轴刻度线为实线
      }
    },
    axisLabel: {
      show: false,
    },
    axisTick: {
      show: false  // 设置为 false，隐藏刻度线
    },
    splitLine: {
      show: true, // 显示X轴网格线
      lineStyle: {
        type: 'solid', // 设置X轴网格线为实线
        color: '#1B3A59'
      }
    },
    data: ['NO10', 'NO9', 'NO8', 'NO7', 'NO6', 'NO5', 'NO4', 'NO3', 'NO2', 'NO1'],
  },

  series: [
    {
      type: 'bar',
      barWidth: '30%',
      data: [],
      label: {
        show: true,
        position: 'insideLeft',
        formatter: function (params) {
          switch (params.name) {
            case 'NO1':
              return `{top1|${params.name}} {b|${params.data.label}}`;
            case 'NO2':
              return `{top2|${params.name}} {b|${params.data.label}}`;
            case 'NO3':
              return `{top3|${params.name}} {b|${params.data.label}}`;
            default:
              return `{a|${params.name}} {b|${params.data.label}}`;
          }
        },
        rich: {
          top1: {
            backgroundColor: {
              image: require('@/assets/images/top1.png')
            },
            ...richCommonBarXOption
          },
          top2: {
            backgroundColor: {
              image: require('@/assets/images/top2.png')
            },
            ...richCommonBarXOption
          },
          top3: {
            backgroundColor: {
              image: require('@/assets/images/top3.png')
            },
            ...richCommonBarXOption
          },
          a: {
            color: '#FFFFFF',
            fontSize: 10,
            fontWeight: 'bold'
          },
          b: {
            color: '#FFFFFF',
            fontSize: 12
          }
        }
      },
      itemStyle: {
        color: 'rgba(0, 0, 0, 0)'  // 设置为透明色
      }
    },
    {
      type: 'bar',
      barWidth: '30%',
      data: [],
      label: {
        show: true,
        position: 'right',
        formatter: function (params) {
          return `{a|${params.data.value}} 万辆`;
        },
        rich: {
          a: {
            color: '#FFFFFF',
            fontSize: 10,
          },
          b: {
            color: '#FFFFFF',
            fontSize: 12
          }
        }
      }
    },
  ]
};

export const realDataTransOption = {
  grid: {
    left: '1%',
    right: '1%',
    bottom: 0,
    top: '18%',
    containLabel: true
  },
  xAxis: [
    {
      data: [],
      axisLine: {
        show: false, //隐藏x坐标轴
      },
      axisTick: {
        show: false,//隐藏x刻度线
      },
      splitLine: {
        show: false,//隐藏x网格线
      },
      axisLabel: {
        fontFamily: 'Microsoft YaHei, Microsoft YaHei',
        fontWeight: 400,
        fontSize: 10.5,
        color: '#FFFFFF',
        lineHeight: 12,
      },
    }
  ],
  yAxis: [
    {
      name: "单位: 个",
      nameTextStyle: {
        color: "#dbe2e5",
        fontSize: 11,
        // padding: [ 0, 5, 0, 0]//y坐标name的位置
      },
      type: "value",
      axisLine: {
        show: false,//隐藏y坐标轴
      },
      axisTick: {
        show: false,//隐藏y刻度线
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dotted',//y网格线type
          color: 'rgba(51,189,255,0.3)',//y网格线颜色
        }
      },
      axisLabel: {
        textStyle: {//y轴字体颜色和大小
          color: "#ffffff",
          fontSize: 11
        },
      }
    }
  ],
  series: [
    {
      type: 'bar',
      data: [],
      barWidth: '10%',
      itemStyle: {
        normal: { //设置柱子渐变
        },
        opacity: 0.7,//设置柱子透明的
      },
      label: {
        normal: { //柱状图顶部显示值
          show: true,
          position: 'top',
          textStyle: {
            fontSize: 11.5,
            fontWeight: 700,
            color: '#fff'
          }
        }
      }

    }
  ]
};


//原生深拷贝方法
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const arrCopy = [];
    for (let i = 0; i < obj.length; i++) {
      arrCopy[i] = deepClone(obj[i]);
    }
    return arrCopy;
  }

  const objCopy = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      objCopy[key] = deepClone(obj[key]);
    }
  }

  return objCopy;
}
