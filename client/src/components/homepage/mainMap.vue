<template>
  <l-map
    class="elevation-2"
    :style="$vuetify.breakpoint.mdAndUp ? 'height:500px;' : 'height:350px;'"
    :options="{scrollWheelZoom:false}"
    :zoom="zoom"
    :center="center"
  >
    <l-control-scale position="bottomleft" :imperial="true" :metric="false"></l-control-scale>
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-geo-json
        v-if="show"
        :geojson="geojson"
        :options="options"
        :options-style="styleFunction"
      />
    <l-marker
      v-for="(elem, index) in onlyNodesGeoJson"
      :key="index"
      :lat-lng="computeLatLng(elem.lat, elem.lon)"
    >
      <l-popup
        v-if="!elem.tags.name"
        class="subtitle-1 text-capitalize"
      >
        {{ elem.tags.amenity }}
        {{ elem.tags.tourism }}
      </l-popup>
      <l-popup v-else>
        <p class="subtitle-1 text-capitalize font-weight-bold mb-1">{{ elem.tags.name }}</p>
        <table>
          <tr v-for="(value, key) in elem.tags" :key="key" class="subtitle-2">
            <td class="px-1">{{ key }}</td>
            <td class="px-1">{{ value }}</td>
          </tr>
        </table>
      </l-popup>
    </l-marker>
    <v-skeleton-loader
      type="image"
    ></v-skeleton-loader>
  </l-map>
</template>

<script>
/* eslint-disable no-undef */
import { LMap, LTileLayer, LMarker, LTooltip, LControlScale, LGeoJson, LPopup } from 'vue2-leaflet';
import axios from "axios";

export default {
  name: 'mainMap',

  created () {
    this.loading = true;
    axios.get(
      "https://overpass-api.de/api/interpreter?data=%2F*%0AThis%20is%20an%20example%20Overpass%20query.%0ATry%20it%20out%20by%20pressing%20the%20Run%20button%20above%21%0AYou%20can%20find%20more%20examples%20with%20the%20Load%20tool.%0A*%2F%0A%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%0A%2F%2F%20gather%20results%0A%28%20%0A%20%20node%5B%22tourism%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22tourism%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22tourism%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22highway%22%3D%22pedestrian%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22highway%22%3D%22pedestrian%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22highway%22%3D%22pedestrian%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22amenity%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22amenity%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22amenity%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22shop%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22shop%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22shop%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22artwork_type%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22artwork_type%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22artwork_type%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22attraction%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22attraction%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22attraction%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22leisure%22%3D%22playground%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22leisure%22%3D%22playground%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22leisure%22%3D%22playground%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%29%3B%0A%2F%2F%20print%20results%0Aout%20body%3B%0A%3E%3B%0Aout%20skel%20qt%3B%2F*fixed%20by%20auto%20repair*%2F"
    )
      .then(response => {
        // console.log("I got data back: ", response.data)
        this.geojson = response.data.elements;
        this.filterNodes();
        this.loading = false;
      });
  },

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LControlScale,
    LGeoJson,
    LPopup
  },

  data () {
    return {
      loading: false,
      geojson: null,
      enableTooltip: true,
      fillColor: "#e4ce7f",
      show: true,
      zoom: 16,
      center: L.latLng(53.0241, 9.8790), // geo:53.0241,9.8790?z=16
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(53.0241, 9.8790),
      scrollWheelZoom: false,
      onlyNodesGeoJson: []
    }
  },

  computed: {
    options () {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
    styleFunction () {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: "#ECEFF1",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1
        };
      };
    },
    onEachFeatureFunction () {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>code:" +
            feature.properties.code +
            "</div><div>nom: " +
            feature.properties.nom +
            "</div>",
          { permanent: false, sticky: true }
        );
      };
    }
  },

  methods: {
    computeLatLng (lat, lon) {
      return L.latLng(lat, lon);
    },

    filterNodes () {
      this.geojson.forEach(elem => {
        if (elem.type === "node" && elem.tags) {
          this.onlyNodesGeoJson.push(elem);
        }
      });
      console.log("Only nodes: ", this.onlyNodesGeoJson);
    }
  }
}
</script>

<style>
td {
  max-width: 150px;
}

table {
  border-collapse: collapse;
}

table, td, th {
  border: 1px solid black;
}
</style>
