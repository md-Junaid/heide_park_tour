<template>
  <l-map class="elevation-2" :style="$vuetify.breakpoint.mdAndUp ? 'height:500px;' : 'height:350px;'" :zoom="zoom" :center="center">
    <l-control-scale position="topright" :imperial="true" :metric="false"></l-control-scale>
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="marker">
      <l-tooltip>Heide Park</l-tooltip>
    </l-marker>
  </l-map>
</template>

<script>
/* eslint-disable no-undef */
import { LMap, LTileLayer, LMarker, LTooltip, LControlScale } from 'vue2-leaflet';

export default {
  name: 'mainMap',

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LControlScale
  },

  data () {
    return {
      zoom: 16,
      center: L.latLng(53.0241, 9.8790), // geo:53.0241,9.8790?z=16
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(53.0241, 9.8790),
      scrollWheelZoom: false
    }
  }
}
</script>
