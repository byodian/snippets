<template>
  <div ref="myCharts" class="myCharts" />
</template>

<script>
export default {
  name: 'Pie',
  props: {
    data: {
      type: Object,
      default: () => null
    },
    xTitle: {
      type: String,
      default: ''
    },
    yTitle: {
      type: String,
      default: ''
    },
    yTwoTitle: {
      type: String,
      default: ''
    },
    isIntroduce: {
      type: Boolean,
      default: false
    },
    type: Number,
    isOneColor: Boolean,
    barColor: {
      type: String,
      default: '#1492FFFF'
    },
    repaint: {
      // 是否重绘
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      myChart: null
    }
  },
  watch: {
    data: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    },
    repaint (bol) {
      if (bol !== null) {
        this.onResize()
      }
    }
  },
  mounted () {
    this.init()
    window.addEventListener('resize', this.onResize)
  },
  // 注销window.onresize事件
  destroyed () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize () {
      this.setOptions(this.data)
      this.myChart.resize()
    },
    init () {
      let chartDom = this.$refs.myCharts
      this.myChart = this.$echarts.init(chartDom, 'zlplw', {
        devicePixelRatio: 2
      })

      this.setOptions(this.data)
    },
    // type - 图表类型
    getOption (type, data) {
      let options
      switch (type) {
        case 2:
          options = {
            grid: {
              left: this.isIntroduce ? '13.5%' : '12%',
              right: '5%',
              bottom: '20%',
              top: '20%'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            xAxis: {
              name: this.xTitle,
              nameTextStyle: {
                color: '#333'
              },
              type: 'category',
              data: data ? data.xAxis : [],
              axisTick: {
                // x轴刻度相关设置
                alignWithLabel: true,
                lineStyle: {
                  color: '#aaa'
                }
              },
              axisLabel: {
                textStyle: {
                  fontSize: this.isIntroduce
                    ? window.innerWidth * 0.01
                    : window.innerHeight * 0.015
                }
              },
              axisLine: {
                // y轴
                alignWithLabel: false,
                lineStyle: {
                  color: '#D9D9D9'
                }
              }
            },
            yAxis: {
              type: 'value',
              name: this.yTitle,

              nameTextStyle: {
                color: '#333',
                fontSize: this.isIntroduce
                  ? window.innerWidth * 0.01
                  : window.innerHeight * 0.015
              },
              axisLine: {
                // y轴
                show: false
              },
              axisTick: {
                show: false
              }
            },
            series: [
              {
                data: data ? data.yAxis : [],
                type: 'bar',
                barWidth: '30%',
                itemStyle: {
                  normal: {
                    // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: (params) => {
                      const colorList = [
                        '#1492ff',
                        '#4fddb9',
                        '#ffa326',
                        '#8191ae',
                        '#f0d737',
                        '#fd7d60',
                        '#a676e9',
                        '#22bf89',
                        '#FD459B',
                        '#B0E90F',
                        '#DCFC00',
                        '#D9D9D9'
                      ]
                      if (this.isOneColor) {
                        return '#1492ff'
                      } else {
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                }
              }
            ]
          }
          break
        case 3:
          options = {
            grid: {
              left: '50rem',
              right: '90rem',
              bottom: '10%',
              top: '20%'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            xAxis: {
              name: this.xTitle,
              nameTextStyle: {
                color: '#333'
              },
              type: 'category',
              data: data ? data.xAxis : [],
              axisTick: {
                // x轴刻度相关设置
                alignWithLabel: true,
                lineStyle: {
                  color: '#aaa'
                }
              },
              axisLine: {
                // y轴
                alignWithLabel: false,
                lineStyle: {
                  color: '#D9D9D9'
                }
              },
              axisLabel: {
                show: true,
                fontSize: '0.233rem' // x轴字体大小
              }
            },
            yAxis: {
              type: 'value',
              name: `${this.yTitle}`,
              nameTextStyle: {
                color: 'rgba(0, 0, 0, 0.65)',
                fontSize: '0.233rem'
              },
              axisLine: {
                // y轴
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: '#E8E8E8',
                  type: 'dashed'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                fontSize: '0.233rem' // y轴字体大小
              }
            },
            series: [
              {
                label: {
                  show: true,
                  position: 'top'
                },
                data: data ? data.yAxis : [],
                type: 'bar',
                barWidth: 30,
                itemStyle: {
                  normal: {
                    // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: (params) => {
                      const colorList = [
                        '#1492ff',
                        '#4fddb9',
                        '#ffa326',
                        '#8191ae',
                        '#f0d737',
                        '#fd7d60',
                        '#a676e9',
                        '#22bf89',
                        '#FD459B',
                        '#B0E90F',
                        '#DCFC00',
                        '#D9D9D9'
                      ]
                      if (this.isOneColor) {
                        return '#1492ff'
                      } else {
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                }
              }
            ]
          }
          break
        case 4:
          options = {
            grid: {
              left: '50rem',
              right: '100rem',
              bottom: '8%',
              top: '12%'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            xAxis: {
              name: this.xTitle,
              nameTextStyle: {
                color: '#333'
              },
              type: 'category',
              data: data ? data.xAxis : [],
              axisTick: {
                // x轴刻度相关设置
                alignWithLabel: true,
                lineStyle: {
                  color: '#aaa'
                }
              },
              axisLine: {
                // y轴
                alignWithLabel: false,
                lineStyle: {
                  color: '#D9D9D9'
                }
              },
              axisLabel: {
                show: true,
                interval: 0,
                fontSize: '0.233rem' // x轴字体大小
              }
            },
            yAxis: {
              type: 'value',
              name: `${this.yTitle}`,
              nameTextStyle: {
                color: 'rgba(0, 0, 0, 0.65)',
                fontSize: '0.233rem'
              },
              axisLine: {
                // y轴
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: '#E8E8E8',
                  type: 'dashed'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                fontSize: '0.233rem' // y轴字体大小
              }
            },
            series: [
              {
                label: {
                  show: true,
                  position: 'top'
                },
                data: data ? data.yAxis : [],
                type: 'bar',
                barWidth: 30,
                itemStyle: {
                  normal: {
                    // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: (params) => {
                      const colorList = [
                        '#1492ff',
                        '#4fddb9',
                        '#ffa326',
                        '#8191ae',
                        '#f0d737',
                        '#fd7d60',
                        '#a676e9',
                        '#22bf89',
                        '#FD459B',
                        '#B0E90F',
                        '#DCFC00',
                        '#D9D9D9'
                      ]
                      if (this.isOneColor) {
                        return '#1492ff'
                      } else {
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                }
              }
            ]
          }
          break
        case 5:
          options = {
            grid: {
              left: '80rem',
              right: '90rem',
              bottom: '8%',
              top: '12%'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            xAxis: {
              name: this.xTitle,
              nameTextStyle: {
                color: '#333'
              },
              type: 'category',
              data: data ? data.xAxis : [],
              axisTick: {
                // x轴刻度相关设置
                alignWithLabel: true,
                lineStyle: {
                  color: '#aaa'
                }
              },
              axisLine: {
                // y轴
                alignWithLabel: false,
                lineStyle: {
                  color: '#D9D9D9'
                }
              },
              axisLabel: {
                show: true,
                interval: 0,
                fontSize: '0.233rem' // x轴字体大小
              }
            },
            yAxis: [
              {
                type: 'value',
                name: `${this.yTitle}`,
                nameTextStyle: {
                  color: 'rgba(0, 0, 0, 0.65)',
                  fontSize: '0.233rem'
                },
                axisLine: {
                  // y轴
                  show: true
                },
                splitLine: {
                  lineStyle: {
                    color: '#E8E8E8',
                    type: 'dashed'
                  }
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: true,
                  fontSize: '0.233rem' // y轴字体大小
                }
              },
              {
                type: 'value',
                name: `${this.yTwoTitle}`,
                nameTextStyle: {
                  color: 'rgba(0, 0, 0, 0.65)',
                  fontSize: '0.233rem'
                },
                axisLine: {
                  // y轴
                  show: true
                },
                splitLine: {
                  lineStyle: {
                    color: '#E8E8E8',
                    type: 'dashed'
                  }
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: true,
                  fontSize: '0.233rem' // y轴字体大小
                }
              }
            ],
            series: [
              {
                label: {
                  show: true,
                  position: 'top'
                },
                data: data ? data.yAxis[0]['data'] : [],
                type: 'bar',
                barWidth: 30,
                itemStyle: {
                  // 通常情况下：
                  normal: {
                    // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: (params) => {
                      const colorList = [
                        '#1492ff',
                        '#4fddb9',
                        '#ffa326',
                        '#8191ae',
                        '#f0d737',
                        '#fd7d60',
                        '#a676e9',
                        '#22bf89',
                        '#FD459B',
                        '#B0E90F',
                        '#DCFC00',
                        '#D9D9D9'
                      ]
                      if (this.isOneColor) {
                        return '#FEC22C'
                      } else {
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                }
              },
              {
                label: {
                  show: true,
                  position: 'top'
                },
                data: data ? data.yAxis[1]['data'] : [],
                yAxisIndex: 1,
                type: 'bar',
                barWidth: 30,
                itemStyle: {
                  normal: {
                    // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: (params) => {
                      const colorList = [
                        '#1492ff',
                        '#4fddb9',
                        '#ffa326',
                        '#8191ae',
                        '#f0d737',
                        '#fd7d60',
                        '#a676e9',
                        '#22bf89',
                        '#FD459B',
                        '#B0E90F',
                        '#DCFC00',
                        '#D9D9D9'
                      ]
                      if (this.isOneColor) {
                        return '#1492ff'
                      } else {
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                }
              }
            ]
          }
          break
        case 6:
          options = {
            grid: {
              left: '100',
              right: '60',
              bottom: '8%',
              top: '0'
            },
            tooltip: {
              trigger: 'axis'
            },
            yAxis: {
              data: data ? data.xAxis : [],
              axisLabel: {
                overflow: 'truncate',
                width: 94,
                z: 10
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              }
            },
            xAxis: {
              name: this.xTitle,
              nameLocation: 'start',
              nameTextStyle: {
                color: '#0064C0FF',
                // FIXME: 未生效
                padding: [10, 0, 0, 0]
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                color: '#999'
              }
            },
            dataZoom: [
              {
                type: 'inside'
              }
            ],
            series: [
              {
                type: 'bar',
                showBackground: true,
                barWidth: 10,
                label: {
                  show: true,
                  position: 'outside',
                  valueAnimation: true
                },
                itemStyle: {
                  color: this.barColor
                },
                data: data ? data.yAxis : [],
                barCategoryGap: 10
              }
            ]
          }
          break
        default:
          options = {
            grid: {
              left: '80rem',
              right: '30rem',
              bottom: '8%',
              top: '12%'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            xAxis: {
              name: this.xTitle,
              nameTextStyle: {
                color: '#333'
              },
              type: 'category',
              data: data ? data.xAxis : [],
              axisTick: {
                // x轴刻度相关设置
                alignWithLabel: true,
                lineStyle: {
                  color: '#aaa'
                }
              },
              axisLine: {
                // y轴
                alignWithLabel: false,
                lineStyle: {
                  color: '#D9D9D9'
                }
              },
              axisLabel: {
                show: true,
                fontSize: '0.233rem' // x轴字体大小
              }
            },
            yAxis: {
              type: 'value',
              name: `${this.yTitle}`,
              nameTextStyle: {
                color: 'rgba(0, 0, 0, 0.65)',
                fontSize: '0.233rem'
              },
              axisLine: {
                // y轴
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: '#E8E8E8',
                  type: 'dashed'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                fontSize: '0.233rem' // y轴字体大小
              }
            },
            series: [
              {
                label: {
                  show: true,
                  position: 'top'
                },
                data: data ? data.yAxis : [],
                type: 'bar',
                barWidth: 30,
                itemStyle: {
                  // 通常情况下：
                  normal: {
                    // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: (params) => {
                      const colorList = [
                        '#1492ff',
                        '#4fddb9',
                        '#ffa326',
                        '#8191ae',
                        '#f0d737',
                        '#fd7d60',
                        '#a676e9',
                        '#22bf89',
                        '#FD459B',
                        '#B0E90F',
                        '#DCFC00',
                        '#D9D9D9'
                      ]
                      if (this.isOneColor) {
                        return '#1492ff'
                      } else {
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                }
              }
            ]
          }
      }
      return options
    },
    setOptions (data) {
      this.myChart.setOption(this.getOption(this.type, data))
    }
  }
}
</script>

<style lang="scss" scoped>
.myCharts {
  height: 100%;
}
</style>
