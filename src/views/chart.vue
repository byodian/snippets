<template>
  <div class="flex h-full bg-[#2b3440]">
    <div class="w-[800px] h-[300px] m-auto">
      <AppEchart :option="option" />
    </div>
  </div>
</template>

<script>
import AppEchart from '@/components/AppEchart.vue'
import getBarOption from '@/utils/getBarOption'

export default {
  name: 'BarChart',
  components: { AppEchart },
  data () {
    return {
      cdata: {
        title: '图表标题',
        xAxisData: ['2010', '2011', '2013', '2014'],
        yAxisName: 'Y 轴标题',
        seriesData: [10, 20, 30, 41]
      }
    }
  },
  computed: {
    option () {
      return getBarOption(this.cdata)
    }
  }
}
</script>
