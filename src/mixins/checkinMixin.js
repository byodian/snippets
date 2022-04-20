// 打卡
import AMap from 'AMap'
import { Toast } from 'vant'

let map
const CITY = '杭州市'
const CENTERPOINT = [120.766926, 28.002922]
export default {
  data () {
    return {
      chooseMapShow: false,
      activityData: [],
      markerList: [],
      getDataApi: () => {},
      centralPoint: CENTERPOINT,
      currentPosition: null,
      latitude: '',
      longitude: ''
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    async initMap () {
      map = new AMap.Map('container', {
        center: this.centralPoint,
        resizeEnable: true,
        zoom: 18
      })

      // 添加点击事件,传入对象名，事件名，回调函数
      AMap.event.addListener(map, 'click', (e) => {
        console.log(e)
      })

      // 缩放插件
      AMap.plugin(['AMap.Scale'], function () {
        map.addControl(new AMap.Scale())
      })
    },
    // 获取打点信息
    async getData () {
      const toast = Toast.loading()
      try {
        this.activityData = await this.getDataApi()
      } catch (e) {
        this.$toast.fail(e)
      } finally {
        toast.clear()
      }
    },
    // 获取活动地址经纬度
    getActivityAddress (name) {
      const vm = this
      AMap.plugin(['AMap.PlaceSearch'], function () {
        // 设置PlaceSearch属性
        const PlaceSearchOptions = {
          city: CITY, // 城市
          type: '', // 数据类别
          pageSize: 10, // 每页结果数,默认10
          pageIndex: 1, // 请求页码，默认1
          extensions: 'base' // 返回信息详略，默认为 base（基本信息）
        }
        const MSearch = new AMap.PlaceSearch(PlaceSearchOptions) // 构造PlaceSearch类

        AMap.event.addListener(MSearch, 'complete', function (data) {
          const poiArr = data.poiList.pois

          vm.longitude = poiArr[0].location.getLng()
          vm.latitude = poiArr[0].location.getLat()

          vm.addMarker([vm.longitude, vm.latitude])
        })

        MSearch.search(name)// 关键字查询
      })
    },
    // 判断打点距离是否符合要求
    matchClockInPosition () {
      // console.log(123)
      const that = this
      AMap.plugin('AMap.Geolocation', function () {
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认：true
          timeout: 10, // 设置定位超时时间，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20) // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          // noGeoLocation: 1
        })
        // 获取当前位置
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', that.onComplete)
        AMap.event.addListener(geolocation, 'error', that.onError)
      })
    },
    // 地图打点
    addMarker (position) {
      const marker = new AMap.Marker({
        position: position
      })

      map.add(marker)
      map.setFitView(marker)
    },
    // 跳转外部高德导航
    handleGoMap () {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      })

      const that = this
      const MSearch = new AMap.PlaceSearch({
        pageSize: 10,
        pageIndex: 1,
        city: CITY // 城市
      })

      AMap.event.addListener(MSearch, 'complete', function (data) {
        const poiArr = data.poiList.pois
        const address = poiArr[0].name
        const lngX = poiArr[0].location.getLng()
        const latY = poiArr[0].location.getLat()

        // H5 原生获取定位
        if (!navigator.geolocation) {
          return
        }

        function success (position) {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude

          toast.clear()
          window.location.href = `https://uri.amap.com/navigation?from=${longitude},${latitude},我的位置&to=${lngX},${latY},${address}&mode=driving&policy=1&src=mypage&coordinate=gaode&callnative=1`
        }

        function error (e) {
          that.$toast('获取定位失败！')
          toast.clear()
        }

        const geoOptions = {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000
        }

        navigator.geolocation.getCurrentPosition(success, error, geoOptions)

        toast.clear()
      })

      MSearch.search(that.activityData.title) // 关键字查询
    },
    handleGoBack () {
      map.setFitView(this.markerList)
    },
    handleCancel () {
      this.chooseMapShow = false
    },
    handleShowPop () {
      this.chooseMapShow = true
    },
    onComplete (data) {
      this.currentPosition = data.position
      console.log(data)
    },

    onError (data) {
      // 定位出错
      this.$toast(data)
      console.log(data)
    }
  }
}
