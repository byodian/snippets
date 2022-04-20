// Basic Pie chart option
/*
 * @params {Object} data
 * @params {Array} data.seriesData data of the series
 * @params {Array} data.colorData color of the pie chart - color: ['#3196FA', '#EF4864']
 *
 **/
const getPieOption = data => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      icon: 'circle',
      top: 'center',
      right: '0%',
      itemGap: 40,
      formatter: name => {
        let tarValue
        for (let i = 0; i < data.seriesData.length; i++) {
          if (data.seriesData[i].name === name) {
            tarValue = data.seriesData[i].value
          }
        }
        return `${name} ${tarValue}%`
      }
    },
    color: data.colorData,
    series: [
      {
        type: 'pie',
        radius: ['60%', '80%'],
        center: ['20%', '50%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: a => {
              return `{a|产权\n\n占比}`
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 16,
                  color: '#fff',
                  margin: 20,
                  fontWeight: 'bold'
                }
              }
            }
          }
        },
        labelLine: {
          show: false
        },
        data: data.seriesData
      }
    ]
  }
}

export default getPieOption
