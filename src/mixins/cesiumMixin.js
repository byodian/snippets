export default {
  name: 'CesiumMapMix',
  data () {
    return {
      acrGisMapServerUrl:
        'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer', // 测试服务
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
      currentObjectId: '', // 当前地图要素 objectId
      currentCoordinate: null, // 当前地图要素坐标
      currentPosition: null, // 当前地图要素笛卡尔坐标
      cesium: null,
      viewer: null
      // markerImg: require('@/assets/images/feature-resource/land-point.png') // 地图标记图片
    }
  },
  methods: {
    ready (cesiumInstance) {
      this.cesium = cesiumInstance.Cesium
      this.viewer = cesiumInstance.viewer

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

        if (!this.cesium.defined(featurePromise)) {
          this.$message.warning('没有发现任何地块信息')
        } else {
          this.cesium.when(featurePromise, (features) => {
            if (features.length > 0) {
              this.currentObjectId = features[0].properties.OBJECTID
              const layerName = features[0].data.layerName
              this.$message.success(`图层名称 ${layerName}`)
            }
          })
        }
      }, this.cesium.ScreenSpaceEventType.LEFT_CLICK)
    },

    // 添加标记 - 打点
    setMarker (longitude, latitude, height = 20000) {
      // 移除之前的点标记
      this.viewer.entities.removeAll()

      const position = this.cesium.Cartesian3.fromDegrees(
        longitude,
        latitude,
        height
      )

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

    // 定位
    flyTo (longitude, latitude, height = 20000) {
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
