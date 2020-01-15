<template>
  <l-map
    class="elevation-2"
    :style="$vuetify.breakpoint.mdAndUp ? 'height:500px;' : 'height:350px;'"
    :options="{scrollWheelZoom:false, zoomControl: false}"
    :zoom="zoom"
    :center="center"
  >
    <l-control-scale position="bottomleft" :imperial="true" :metric="false"></l-control-scale>
    <l-control-zoom position="topright"  ></l-control-zoom>
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-geo-json
        v-if="show"
        :geojson="geojson"
      />
    <div v-if="filterdItems.length === 0">
      <l-marker
        v-for="(elem, index) in geojson"
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
    </div>
    <div v-else>
      <l-marker
        v-for="(elem, index) in filteredMarkers"
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
    </div>
    <l-control position="topleft" >
      <v-combobox
        v-model="filterdItems"
        :items="items"
        chips
        clearable
        label="Apply Filters"
        multiple
        hide-selected
        solo
        :disabled="filterDisable"
        style="max-width: 550px;"
      >
        <template v-slot:selection="{ attrs, item, select, selected }">
          <v-chip
            v-bind="attrs"
            :input-value="selected"
            close
            @click="select"
            @click:close="remove(item)"
          >
            <strong>{{ item }}</strong>&nbsp;
          </v-chip>
        </template>
      </v-combobox>
    </l-control>
    <v-skeleton-loader
      type="image"
    ></v-skeleton-loader>
  </l-map>
</template>

<script>
/* eslint-disable no-undef */
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LControlScale,
  LGeoJson,
  LPopup,
  LControlZoom,
  LControl
} from 'vue2-leaflet';
import axios from "axios";

export default {
  name: 'mainMap',

  created () {
    axios.get(
      "https://overpass-api.de/api/interpreter?data=%2F*%0AThis%20is%20an%20example%20Overpass%20query.%0ATry%20it%20out%20by%20pressing%20the%20Run%20button%20above%21%0AYou%20can%20find%20more%20examples%20with%20the%20Load%20tool.%0A*%2F%0A%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%0A%2F%2F%20gather%20results%0A%28%20%0A%20%20node%5B%22tourism%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22tourism%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22tourism%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22highway%22%3D%22pedestrian%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22highway%22%3D%22pedestrian%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22highway%22%3D%22pedestrian%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22amenity%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22amenity%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22amenity%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22shop%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22shop%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22shop%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22artwork_type%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22artwork_type%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22artwork_type%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22attraction%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22attraction%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22attraction%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20node%5B%22leisure%22%3D%22playground%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20way%5B%22leisure%22%3D%22playground%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%20%20relation%5B%22leisure%22%3D%22playground%22%5D%2853.01927999512696%2C9.86945629119873%2C53.03094244686363%2C9.885592460632324%29%3B%0A%29%3B%0A%2F%2F%20print%20results%0Aout%20body%3B%0A%3E%3B%0Aout%20skel%20qt%3B%2F*fixed%20by%20auto%20repair*%2F"
    )
      .then(response => {
        let res = response.data.elements;
        res.forEach(elem => {
          if (elem.type === "node" && elem.tags) {
            this.geojson.push(elem);
          }
          // else if (elem.tags.name === "Parkplatz Heide Park Soltau") {
          //   this.geojson.push(elem);
          // }
        });
        this.filterDisable = false;
      });
  },

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LControlScale,
    LGeoJson,
    LPopup,
    LControlZoom,
    LControl
  },

  data () {
    return {
      geojson: [],
      show: true,
      zoom: 16,
      center: L.latLng(53.0241, 9.8790), // geo:53.0241,9.8790?z=16
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(53.0241, 9.8790),
      filterdItems: [],
      filterDisable: true,
      filteredMarkers: [],
      items: [
        'Roller Coasters',
        'Theaters',
        'Tourist Attractions',
        'Fast Food Restaurants',
        'Drinking Water',
        'Cafe',
        'Doctors',
        'Atm',
        'Toilets',
        'Biergarten Rafting',
        'Shops',
        'Bench',
        'Vending Machines',
        'Car charging Station',
        'Fountain'
      ]
    }
  },

  methods: {
    computeLatLng (lat, lon) {
      return L.latLng(lat, lon);
    },

    remove (item) {
      this.filterdItems.splice(this.filterdItems.indexOf(item), 1)
      this.filterdItems = [...this.filterdItems]
    },

    applyFilter (item) {
      switch (item) {
        case "Roller Coasters":
          this.geojson.forEach(elem => {
            if (elem.tags.attraction === "roller_coaster") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Theaters":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "theatre") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Tourist Attractions":
          this.geojson.forEach(elem => {
            if (elem.tags.tourism) {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Fast Food Restaurants":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "fast_food") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Drinking Water":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "drinking_water") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Doctors":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "doctors") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Atm":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "atm") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Toilets":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "toilets") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Biergarten Rafting":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "biergarten") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Shops":
          this.geojson.forEach(elem => {
            if (elem.tags.shop) {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Bench":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "bench") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Vending Machines":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "vending_machine") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Car charging Station":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "charging_station") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Fountain":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "fountain") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        case "Cafe":
          this.geojson.forEach(elem => {
            if (elem.tags.amenity === "cafe") {
              this.filteredMarkers.push(elem);
            }
          });
          break;
        default:
          console.log("Couldn't find place");
      }
    }
  },

  watch: {
    filterdItems: {
      immediate: true,
      handler (value) {
        this.filteredMarkers = [];
        value.forEach(item => {
          this.applyFilter(item)
        })
      }
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
