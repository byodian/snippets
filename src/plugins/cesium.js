import VueCesium from 'vue-cesium'

export default {
  install (Vue) {
    Vue.use(VueCesium, {
      cesiumPath: 'https://cdn.jsdelivr.net/npm/cesium@latest/Build/Cesium/Cesium.js',
      // 指定Cesium.Ion.defaultAccessToken，使用Cesium ion的数据源需要到https://cesium.com/ion/ 申请一个账户，获取Access Token。
      // 不指定的话可能导致 Cesium 在线影像加载不了
      accessToken: ''
    })
  }
}
