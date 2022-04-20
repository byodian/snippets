// Basic Line chart option
/*
* @params {Object} data
* @params {String} data.yAxisName name of the yAxis
* @params {Array} data.xAxisData data of the xAxis
* @params {Array} data.seriesData data of the series
* @params {Object} data.areaStyleColor color of the area
**/
const getLineOption = data => {
  return {
    grid: {
      // left: '15%',
      // right: '6%',
      top: '21%',
      height: '65%'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        color: '#5BCD60'
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.xAxisData
    },
    yAxis: {
      type: 'value',
      name: data.yAxisName,
      nameTextStyle: {
        color: '#B1C4E5',
        lineHeight: 20
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#B1C4E5',
          opacity: 0.25,
          type: 'dashed'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#B1C4E5',
          fontSize: 12
        }
      }
    },
    series: [
      {
        type: 'line',
        stack: 'Total',
        areaStyle: {
          color: data.areaStyleColor
        },
        lineStyle: {
          color: '#5BCD60'
        },
        emphasis: {
          focus: 'series'
        },
        smooth: false,
        data: data.seriesData
      }
    ]

  }
}

export default getLineOption
