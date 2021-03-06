<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
// @ts-nocheck
import tdTheme from './theme.json' // 引入默认主题
import resizeMixin from '@/mixins/resizeMixin'

export default {
  name: 'Echart',
  mixins: [resizeMixin],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    option: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    option: {
      handler (option) {
        // 设置true清空echart缓存
        this.chart.setOption(option, true)
      },
      deep: true
    }
  },
  mounted () {
    // 覆盖默认主题
    this.$echarts.registerTheme('tdTheme', tdTheme)
    this.initChart()
  },
  methods: {
    initChart () {
      // 初始化 echart
      this.chart = this.$echarts.init(this.$el, 'tdTheme')
      this.chart.setOption(this.option, true)

      // 默认高光第一选项 并保存数据
      this.chart.dispatchAction({ type: 'highlight', seriesIndex: 1, dataIndex: 0 })
      this.chart.on('mouseover', (e) => {
        this.chart.dispatchAction({ type: 'highlight', seriesIndex: 1, dataIndex: e.dataIndex })
        this.chart.dispatchAction({ type: 'downplay', seriesIndex: 1, dataIndex: 0 })
        if (e.dataIndex !== this.stopIndex) {
          this.chart.dispatchAction({ type: 'downplay', seriesIndex: 1, dataIndex: this.stopIndex })
        }
        if (e.dataIndex === 1 || !this.stopIndex) {
          this.chart.dispatchAction({ type: 'highlight', seriesIndex: 1, dataIndex: e.dataIndex })
        }
      })
      this.chart.on('mouseout', (e) => {
        this.stopIndex = e.dataIndex
        this.chart.dispatchAction({ type: 'highlight', seriesIndex: 1, dataIndex: this.stopIndex })
      })
    }
  }
}
</script>
