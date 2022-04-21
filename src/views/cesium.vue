<template>
  <div class="map-viewer h-full">
    <!-- 初始化视图 -->
    <vc-viewer
      :base-layer-picker="false"
      :info-box="false"
      :scene-mode="3"
      @ready="ready"
    >
      <!-- Arcgis mapserver 影音底图-->
      <vc-layer-imagery
        :alpha="alpha"
        :brightness="brightness"
        :contrast="contrast"
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

export default {
  name: 'CesiumMap',
  mixins: [CesiumMix]
}
</script>
