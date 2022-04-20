<template>
  <div class="map-viewer">
    <!-- 初始化视图 -->
    <vc-viewer
      :base-layer-picker="false"
      :info-box="false"
      :scene-mode="2"
      :logo="false"
      :map-mode2d="1"
      @ready="ready"
    >
      <!-- 添加导航和缩放控件 -->
      <vc-navigation :options="options" />

      <!-- 天地图矢量标记-->
      <vc-layer-imagery ref="layerText" :sort-order="20" :alpha="alpha" :brightness="brightness" :contrast="contrast">
        <vc-provider-imagery-tianditu
          :map-style="cvaMapStyle"
          :token="tiandituToken"
        />
      </vc-layer-imagery>

      <!-- 天地图矢量地图 -->
      <vc-layer-imagery
        :sort-order="10"
        :alpha="alpha"
        :brightness="brightness"
        :contrast="contrast"
      >
        <vc-provider-imagery-tianditu
          :map-style="vecMapStyle"
          :token="tiandituToken"
        />
      </vc-layer-imagery>

      <!-- Arcgis mapserver 影音底图-->
      <vc-layer-imagery
        v-if="isShow"
        :alpha="alpha"
        :brightness="brightness"
        :contrast="contrast"
        :sort-order="11"
      >
        <vc-provider-imagery-arcgis-mapserver
          :url="acrGisMapServerUrl"
          :maximum-level="18"
        />
      </vc-layer-imagery>
    </vc-viewer>
  </div>
</template>

<script>
import CesiumMix from '@/mixins/cesiumMixin'
import 'vue-cesium/lib/vc-navigation.css'

export default {
  name: 'CesiumMap',
  mixins: [CesiumMix]
}

</script>

<style lang="scss">
  .map-viewer {
    width: 100%;
    height: 100%;
  }
</style>
