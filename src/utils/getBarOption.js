// Bar chart options
/*
 * @params {Object} data
 * @params {String} data.title title of the chart
 * @params {Array} data.xAxisData xAxis data of the chart
 * @params {String} data.yAxisName name of the yAxis
 * @params {Array} data.seriesData data of the series
 **/
const getBarOption = (data) => {
  return {
    title: {
      text: data.title,
      left: 'center'
    },
    grid: {
      show: false,
      bottom: 20,
      left: 30,
      right: 30
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          show: true
        }
      }
    },
    xAxis: {
      type: 'category',
      data: data.xAxisData,
      minInterval: 1,
      axisLine: {
        lineStyle: {
          opacity: 1,
          type: 'solid'
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          opacity: 0.6
        },
        // 刻度线和标签对齐
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      name: data.yAxisName,
      nameTextStyle: {
        lineHeight: 20
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        fontSize: 12
      },
      splitLine: {
        show: true,
        lineStyle: {
          opacity: 0.6,
          type: 'dashed'
        }
      }
    },
    series: [
      {
        type: 'bar',
        lineStyle: {
          color: '#5BCD60'
        },
        barWidth: '30%',
        emphasis: {
          focus: 'series'
        },
        data: data.seriesData
      }
    ]
  }
}

export default getBarOption
