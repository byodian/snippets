import { toPercentage } from '@/utils/common'
export default {
  data () {
    return {
      // 数据项
      cdata: {},
      // echart配置项,
      options: {},
      // Api
      getDetailApi: () => {},
      colors: {
        blue: { top: '#3360BB', botton: '#17EEF0' },
        yellow: { top: '#FD9936', botton: '#FFC24D' },
        green: { top: 'rgba(91, 205, 96, 0%)', botton: 'rgba(91, 205, 96, 100%)' }
      }
    }
  },
  mounted () {
    // this.getDetail()
  },
  watch: {
    $route (to, from) {
      this.renderAgain()
    }
  },
  methods: {
    async getDetail () {
      this.cdata = await this.getDetailApi()
    },
    /**
     *
     * @param {Object} params
     */
    getGradientColor (params) {
      // 坐标对象
      let coord
      if (params.position === 'y') {
        coord = {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1
        }
      } else {
        coord = {
          x: 1,
          y: 0,
          x2: 0,
          y2: 0
        }
      }

      return {
        ...coord,
        type: params.type,
        colorStops: [
          {
            // 0 处的颜色
            offset: 0,
            color: this.colors[params.color].botton
          },
          {
            // 100% 处的颜色
            offset: 1,
            color: this.colors[params.color].top
          }
        ]
      }
    },
    // * 问题描述：
    // ApppMain 组件所在路径：@layouts/components/AppMain.vue
    // AppMain 组件图表区域使用 keep-alive，跳转路由后，避免图表重复渲染.
    // 但跳转路由之前，如果窗口尺寸发生变化，下一个路由页面的轮播图表尺寸会出现宽度为 0 的 bug
    // * 原因分析：
    // 如果 dataV 轮播组件的父容器宽高发生了变化，而组件没有侦知这一变化，
    // 组件就无法自适应父容器宽高。
    // * 解决办法有两种：
    // 1. 给轮播组件绑定key值，在父容器宽高发生变化且完成渲染后(使用 $nextTick)更改key值，
    // 强制销毁边框组件实例并重新渲染，重新获取宽高。(缺点：组件同样被销毁重新渲染，这会带来额外的性能消耗，并导致组件状态丢失)
    // 2. 调用组件内置的initWH方法去重置组件的宽高以避免销毁实例重新渲染带来的非预期副作用。
    // initWh 方法路径：/node_modules/@jiaminghi/data-view/lib/mixin/autoResize.js
    // * 参考链接
    // http://datav.jiaminghi.com/guide/borderBox.html - 重置宽高部分
    // http://datav.jiaminghi.com/guide 用前必看部分
    renderAgain () {
      this.$nextTick(() => {
        if (this.$refs.scrollBoard) {
          this.$refs.scrollBoard.initWH()
        }
      })
    },
    toPercentage
  }
}
