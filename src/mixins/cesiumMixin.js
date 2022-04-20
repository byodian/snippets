import axios from 'axios'

export default {
  name: 'CesiumMapMix',
  data () {
    return {
      tiandituToken: '48ddca7c90a85cd46b82f3c411189228', // 天地图token
      acrGisMapServerUrl: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer', // 测试服务
      // https://zouyaoji.top/vue-cesium-v2/#/zh/imageryLayer/vc-provider-imagery-tianditu
      vecMapStyle: 'vec_c', // 天地图矢量地图
      cvaMapStyle: 'cva_c', // 天地图矢量标记
      alpha: 1,
      brightness: 1,
      contrast: 1,
      options: {
        enableZoomControl: true, // 是否显示缩放控件
        enableLocationBar: false, // 是否显示定位控件
        enableCompass: false, // 是否启用罗盘部件
        enableCompassOuterRing: false, // 罗盘部件是否可见
        enablePrintView: false, // 是否显示打印视图控件
        enableDistanceLegend: false // 是否显示距离图例
      },
      currentId: '', // 当前地块id
      currentObjectId: '', // 当前地图要素 objectId
      currentCoordinate: null, // 当前地图要素坐标
      currentPosition: null, // 当前地图要素笛卡尔坐标
      isSuccess: false,
      cesium: null,
      viewer: null,
      isShow: false // 是否显示规划地图
      // markerImg: require('@/assets/images/feature-resource/land-point.png') // 地图标记图片
    }
  },
  methods: {
    ready (cesiumInstance) {
      this.cesium = cesiumInstance.Cesium
      this.viewer = cesiumInstance.viewer

      this.flyTo(120.79965900000002, 27.90493460463857)

      const handler = new this.cesium.ScreenSpaceEventHandler(
        this.viewer.canvas
      )
      handler.setInputAction((event) => {
        this.currentPosition = event.position

        // getPickRay - Create a ray from the camera position
        // https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#getPickRay
        const pickRay = this.viewer.camera.getPickRay(event.position)
        // https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayerCollection.html#pickImageryLayerFeatures
        const featurePromise =
          this.viewer.imageryLayers.pickImageryLayerFeatures(
            pickRay,
            this.viewer.scene
          )

        if (!this.cesium.defined(featurePromise) && this.isShow) {
          this.$message.warning('没有发现任何地块信息')
        } else {
          this.cesium.when(featurePromise, (features) => {
            if (features.length > 0) {
              this.currentObjectId = features[0].properties.OBJECTID
              // this.$message.success(`已选择编号为 ${this.currentObjectId} 的地块`)
            }
          })
        }
      }, this.cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    setMarker (longitude, latitude, height = 20000) {
      if (!longitude || !latitude) return

      // 移除之前的标记
      this.viewer.entities.removeAll()

      const position = this.cesium.Cartesian3.fromDegrees(
        longitude,
        latitude,
        height
      )

      // 添加标记 - 打点
      // https://cesium.com/learn/cesiumjs-learn/cesiumjs-creating-entities/#points-billboards-and-labels
      this.viewer.entities.add({
        position,
        billboard: {
          image: this.markerImg,
          scale: 0.8
          // height: 64,
          // width: 64
        }
        // point: {
        //   pixelSize: 10,
        //   color: this.cesium.Color.RED,
        //   outlineColor: this.cesium.Color.WHITE,
        //   outlineWidth: 2,
        // },
      })

      this.flyTo(longitude, latitude)
    },
    flyTo (longitude, latitude, height = 20000) {
      if (!longitude || !latitude) return
      const destination = this.cesium.Cartesian3.fromDegrees(
        longitude,
        latitude,
        height
      )
      // 地图为二维视图，即组件初始化选项 scenemode = 2 时, orientation.pitch, orientation.roll 可能无效
      // https://cesium.com/learn/cesiumjs/ref-doc/Camera.html?classFilter=camera#flyTo
      this.viewer.camera.flyTo({
        destination,
        orientation: {
          heading: this.cesium.Math.toRadians(0),
          pitch: this.cesium.Math.toRadians(-90),
          roll: 0
        },
        duration: 0
      })
    }
  }
}
